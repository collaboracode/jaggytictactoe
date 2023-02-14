import initialState from "../statics/initialState"
import { CheckForWinOrDraw, removeColumn, changeOffset, addSpace, claimSpace } from "./helpers"
// import getLongestLine from "./longest_line";
/**
* @param {{
* board: string[][], 
* offset: number[],
* message: string,
* gameover: boolean,
* curPlayerX: boolean
* gameInProgress: boolean,
* winLength: number,
* boardShift: number,
* tileSize: number,
* playerOne: string
* playerTwo: string
* }} state
* @param {{
* type: string
* value?: string | number
* direction?: string
* row?: number
* col?: number
* }} action
@returns {state}
*/
export default function reducer(state, action) {
  const row = Number(action.row)
  const col = Number(action.col)
  let temp = state?.board ? [...state.board] : [[]]
  let tempOffset = state?.offset ? [...state.offset] : []
  let message = state.message
  let gameover = state.gameover
  let curPlayerBool = state.curPlayerX
  let gameInProgress = state.gameInProgress

  switch (action.type) {
    case "window":
      return { ...state, tileSize: action.value }

    case "game":
      if (action.value === "reset") {
        return { ...initialState }
      }
      else {
        return { ...state }
      }

    case "gameInProgress":
      return { ...state, gameInProgress: action.value }

    case "tileSize":
      return { ...state, tileSize: action.value }

    case "curPlayerX":
      return { ...state, curPlayerX: action.value }

    case "gameover":
      return { ...state, gameover: action.value }

    case "message":
      return { ...state, message: action.value }

    case "board":
      switch (action.value) {
        case "reset":
          if (state?.gameInProgress === false) {
            const offsetArr = [...state.offset.slice(0, 3)]
            while (offsetArr.length < 3) {
              offsetArr.push(0)
            }
            temp = [...initialState.board]
            tempOffset = [...offsetArr]
          }
          break

        case "clear":
          temp.forEach((row, i) => {
            row.forEach((col, j) => {
              if (temp[i][j] !== 'blank')
                temp[i] = [...temp[i].slice(0, j), " ", ...temp[i].slice(j + 1)]
            })
          })
          gameInProgress = false
          gameover = false
          curPlayerBool = true
          break

        case "play":
          if (state?.gameover === false && temp?.[row]?.[col] === " ") {
            temp = [...claimSpace(temp, row, col, curPlayerBool, state.playerOne, state.playerTwo)]
            gameInProgress = true
            curPlayerBool = !state.curPlayerX
          }
          break

        default:
          break
      }
      break
    case "boardShift":
      switch (action.value) {
        case "increment":
          return { ...state, boardShift: state.boardShift + 1 }
        case "decrement":
          return { ...state, boardShift: state.boardShift - 1 }
        case "reset":
          return { ...state, boardShift: 0 }
        default:
          throw new Error()
      }

    case "winLength":
      if (state?.gameInProgress === false) {
        switch (action.value) {
          case "increment":
            if (state.winLength + 1 <= 15) {
              return { ...state, winLength: state.winLength + 1 }
            } else return {...state}

          case "decrement":
            if (state.winLength - 1 > 1) {
              return { ...state, winLength: state.winLength - 1 }
            } else return {...state}
            
          default:
            return { ...state }
        }
      }
      return { ...state }

    case "offset":
      tempOffset = [...changeOffset(temp, tempOffset, row, action.value)]
      if (state?.gameInProgress === true) curPlayerBool = !state.curPlayerX
      break

    case "remove":
      const obj = removeColumn(temp, tempOffset, row, col)
      temp = [...obj.board]
      tempOffset = [...obj.offset]
      if (state?.gameInProgress === true) curPlayerBool = !state.curPlayerX
      break

    case "add":
      if (temp && tempOffset && row !== undefined && col !== undefined && action?.direction !== undefined) {
        const obj = addSpace(temp, tempOffset, row, col, action.direction)
        temp = [...obj.board]
        tempOffset = [...obj.offset]
        if (state?.gameInProgress === true) {
          curPlayerBool = !state.curPlayerX
        }
      }
      break

    default:
      return { ...state }
  }

  const obj = CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo, state.winLength)
  if (obj.gameover === true && obj.message.length > 0) {
    gameover = obj.gameover
    message = obj.message
  }
  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: curPlayerBool, message: message, gameover: gameover, gameInProgress: gameInProgress }
}