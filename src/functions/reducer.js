import initialState from "../statics/initialState"
const Reducer = (state, action) => {
  function clearBoard() {
    let boardMutalator = [...state.board]
    boardMutalator.forEach((row, i) => {
      row.forEach((col, j) => {
        boardMutalator[i][j] = " "
      })
    })
    return { ...state, board: boardMutalator, curPlayerX: true, gameInProgress: false, gameover: false }

  }
  const resize = () => {
    const sizeOne = 100
    const sizeTwo = 75
    const sizeThree = 60
    const sizeFour = 50
    if (window.innerWidth > 800) {
      return sizeOne
    } else if (window.innerWidth > 600) {
      return sizeTwo
    } else if (window.innerWidth > 400) {
      return sizeThree 
    } else {
      return sizeFour
    }
  }
  switch (action.type) {
    case "window":
      return {...state, tileSize: resize()}

    case "game": {
      if (action.value === "reset") {
        // ! should fix this and make it dry
        return {
          board: [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
          ],
          message: "",
          offset: [0, 0, 0],
          gameover: false,
          curPlayerX: true,
          gameInProgress: false,
          winLength: 3,
          boardShift: 0,
          rightHanded: false,
          tileSize: resize(),
          offsetRange: 6,
          playerOne: "X",
          playerTwo: "O"
        }
      } else if (action.value === "clear") {
        return clearBoard()
      } else {
        return { ...state, board: action.value }
      }
    }
    case "rightHanded":
      return { ...state, rightHanded: !state.rightHanded }

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
      if (action.value === "reset" && !state.gameInProgress) {
        return { ...state, board: initialState.board }
      } else if (action.value === "clear") {
        return clearBoard()
      } else {
        return {...state, board: action.value}
      }

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
      if (!state.gameInProgress) {
        switch (action.value) {
          case "increment":
            if (state.winLength + 1 <= 15) {
              return { ...state, winLength: state.winLength + 1 }
            } else return state
          case "decrement":
            if (state.winLength - 1 > 1) {
              return { ...state, winLength: state.winLength - 1 }
            } else return state
          default:
            return { ...state }
        }
      }
      return state

    case "offset":
      function ChangeOffset(val) {
        let offsetMutatorVariable = [...state.offset]
        let index = Number(action.offsetIndex)
        offsetMutatorVariable[Number(index)] += Number(val)
        if (offsetMutatorVariable[Number(index)] > Number(state.offsetRange)) {
          offsetMutatorVariable[Number(index)] = Number(state.offsetRange)
        }
        else if (offsetMutatorVariable[Number(index)] < 0 - Number(state.offsetRange)) {
          offsetMutatorVariable[Number(index)] = 0 - Number(state.offsetRange)
        }
        return [...offsetMutatorVariable]
      }

      if (!state.gameover) {
        switch (action.value) {
          case "increment":
            return { ...state, offset: ChangeOffset(1) }
          case "decrement":
            return { ...state, offset: ChangeOffset(-1) }

          case "reset":
            if (!state.gameInProgress) {
              let offsetArr = []
              state.board.forEach(arr => offsetArr.push(Number(0)))
              return { ...state, offset: offsetArr }
            }
            break
          default:
            return { ...state }
        }
      }
      return { ...state }
    case "row":
      if (!state.gameover) {
        let boardMutatorVariable = [...state.board]
        let offsetMutatorVariable = [...state.offset]
        switch (action.value) {
          case "increment":
            if (boardMutatorVariable.length < 15) {
              boardMutatorVariable.push([" "])
              offsetMutatorVariable.push(Number(0))
              if (state.gameInProgress) {

                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
              }

            }
            break
          case "decrement":
            if (!state.gameInProgress) {
              boardMutatorVariable = boardMutatorVariable.slice(0, -1)
              offsetMutatorVariable = offsetMutatorVariable.slice(0, boardMutatorVariable.length)
              return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
            } else {
              return { ...state }
            }
          default:
            return { ...state }
        }
      }
      break

    case "col":
      const boardVariable = [...state.board]
      let boardMutatorVariable = boardVariable.slice()
      switch (action.value) {
        case "increment":
          if (boardMutatorVariable[action.row]?.length < 15) {
            let boardMutatorVariable2 = [...boardMutatorVariable[action.row], " "]
            boardMutatorVariable[action.row] = [...boardMutatorVariable2]
          }
          return { ...state, board: boardMutatorVariable, curPlayerX: !state.curPlayerX }
        case "decrement":
          if (!state.gameInProgress) {
            if (boardVariable[action.row].slice(0, -1)?.length > 0) {
              boardMutatorVariable[action.row] = boardVariable[action.row].slice(0, -1)
            }
          }
          return { ...state, board: boardMutatorVariable }

        case "reset":
          return { ...state, board: initialState.board }

        case "clear":
          clearBoard()
          break

        default:
          return { ...state }
      }
      break

    default:
      return { ...state }
  }
}
export default Reducer