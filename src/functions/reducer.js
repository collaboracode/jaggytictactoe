// I will admit that going down on increased row numbers was probaby a mistake due to how unintuitive it is.
import initialState from "../statics/initialState"
import getLongestLine from "./longest_line";
const reducer = (state, action) => {
  // todo refactor to have the vars for all these here
  const row = Number(action.row)
  const col = Number(action.col)
  let temp = state?.board ? [...state.board] : [[]]
  let tempOffset = state?.offset ? [...state.offset] : []

  let message = state.message
  let gameover = state.gameover
  let tileSize

  if (window.innerWidth > 800) {
    tileSize = 100
  }
  else if (window.innerWidth > 600) {
    tileSize = 75
  }
  else if (window.innerWidth > 400) {
    tileSize = 60
  }
  else {
    tileSize = 50
  }

  function CheckForWinOrDraw(board, offset, playerOne, playerTwo) {
    let playerOneRecord = 0
    let playerTwoRecord = 0
    let isFull = true
    board.forEach((boardRow, i) => {
      boardRow.forEach((col, j) => {
        if (col === " ") {
          isFull = false
        }
        playerOneRecord = Math.max(
          getLongestLine(board, playerOne, Number(i), Number(j), offset),
          playerOneRecord
        )
        playerTwoRecord = Math.max(
          getLongestLine(board, playerTwo, Number(i), Number(j), offset),
          playerTwoRecord
        )
      })
    })
    if (playerOneRecord >= state.winLength && playerTwoRecord >= state.winLength) {
      message = "Draw"
      gameover = true
    } else if (playerOneRecord >= state.winLength) {
      message = `${state.playerOne} wins`
      gameover = true
    } else if (playerTwoRecord >= state.winLength) {
      message = `${state.playerTwo} wins`
      gameover = true
    } else if (isFull) {
      message = "Draw"
      gameover = true
    }
  }

  function clearBoard() {
    temp.forEach((row, i) => {
      row.forEach((col, j) => {
        if (temp[i][j] !== 'blank')
          temp[i] = [...temp[i].slice(0, j), " ", ...temp[i].slice(j + 1)]
      })
    })
    return { ...state, board: [...temp], curPlayerX: true, gameInProgress: false, gameover: false }

  }
 
  switch (action.type) {
    case "window":
      return { ...state, tileSize: tileSize }

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
          tileSize: tileSize,
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
      switch (action.value) {
        case "reset":
          if (state?.gameInProgress === false) {
            // I would like to use initialState, but for some reason it changes
            const offsetArr = [...state.offset.slice(0, 3)]
            while (offsetArr.length < 3) {
              offsetArr.push(0)
            }
            return {
              ...state, board: [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]
              ], offset: offsetArr
            }
          } else return state
        case "clear":
          return clearBoard()
        case "play":
          const row = Number(action.row)
          const col = Number(action.col)
          let playerX = state.curPlayerX
          if (state?.gameover === false
            && temp?.[row]?.[col] === " ") {
            playerX = !state.curPlayerX
            const player = state.curPlayerX ? `${state.playerOne}` : `${state.playerTwo}`
            temp[row] = [...temp[row].slice(0, col), `${player}`, ...temp[row].slice(col + 1)]
          }
          CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
          return { ...state, board: [...temp], curPlayerX: playerX, gameInProgress: true, message: message, gameover: gameover }
        default:
          return { ...state }
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
      if (state?.gameInProgress === false) {
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

      if (state?.gameover === false) {
        switch (action.value) {
          case "increment":
            tempOffset[Number(action.row)] = (Number(tempOffset[Number(action.row)]) + 1)
            if (state?.gameInProgress === true) {
              CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
              return { ...state, offset: tempOffset, curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
            }
            else if (state?.gameInProgress === false) {
              return { ...state, offset: tempOffset }
            }
            else return { ...state }
          case "decrement":
            tempOffset[Number(action.row)] = (Number(tempOffset[Number(action.row)]) - 1)
            if (state?.gameInProgress === true) {
              CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)

              return { ...state, offset: tempOffset, curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
            }
            else if (state?.gameInProgress === false) {
              return { ...state, offset: tempOffset }
            }
            else {
              return { ...state }
            }

          case "reset":
            if (state?.gameInProgress === false) {
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

    case "remove":
      // todo improve 
      if (state.board) {

        //? not rure if I want it to collapse inside or not if yes maybe make it collapse vertically too
        // if (temp[row].filter((el) => el !== "blank").length > 1) {
        //   temp[row] = [...temp[row].slice(0, col), 'blank', ...temp[row].slice(col + 1)]
        // } else if (temp[row].filter((el) => el !== "blank").length === 1) {
        //   temp = [...temp.slice(0, row), ...temp.slice(row + 1)]
        //   tempOffset = [...tempOffset.slice(0, row), ...tempOffset.slice(row + 1)]
        // }
        if (temp[row].filter((el) => el !== "blank").length > 1) {                                                      //* the row has more non blanks
          temp[row] = [...temp[row].slice(0, col), 'blank', ...temp[row].slice(col + 1)]                                //* turns space into a blank
        } else if (temp[row].filter((el) => el !== "blank").length === 1) {                                             //* target is the only non blank in the row

          if (row === 0 || row === temp.length - 1) {                                                                   //* target is on the first or the last row
            temp = [...temp.slice(0, row), ...temp.slice(row + 1)]                                                      //* removes the row
            tempOffset = [...tempOffset.slice(0, row), ...tempOffset.slice(row + 1)]                                    //* removes the offset for that row

            for (let i = 0; i < temp.length; i++) {                                                                     //* trims blank rows from the top
              if (temp[0].filter((el) => el !== "blank").length > 0) break                                              //* stops at first non all blank row
              temp = [...temp.slice(1)]
              tempOffset = [...tempOffset.slice(1)]
            }
            for (let i = temp.length; i > 0; i--) {                                                                     //* trims blank rows from the bottom
              if (temp[temp.length - 1].filter((el) => el !== "blank").length > 0) break                                //* stops at first non all blank row
              temp = [...temp.slice(0, temp.length - 1)]
              tempOffset = [...tempOffset.slice(0, tempOffset.length - 1)]
            }
          }
          else {
            temp[row] = [...temp[row].slice(0, col), 'blank', ...temp[row].slice(col + 1)]                              //* replaces space with blank
          }
        }
        if (state?.gameInProgress === true) {
          CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
          return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
        } else {
          return { ...state, board: [...temp], offset: [...tempOffset] }
        }
      }
      break

    case "add":
      switch (action.direction) {
        case "right":
          if (temp && tempOffset && action.row !== undefined && action.col !== undefined) {                             //* has required vars
            if (col === state.board[row].length - 1) {                                                                  //* col is the last element in the row
              temp[row] = [...temp[row].slice(0), ' ']                                                                  //*inserts space at the end of the row
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp[row][col + 1] === "blank") {                                                                //* target location is a blank
              temp[row] = [...temp[row].slice(0, col + 1), ' ', ...temp[row].slice(col + 2)]                            //* replaces blank with space
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
          }
          else {
            return { ...state }
          }
          return { ...state }
        case "left":
          if (temp && tempOffset && action.row !== undefined && action.col !== undefined) {                             //* has required vars
            if (col === 0) {                                                                                            //* col is the first element in the row
              temp[row] = [' ', ...temp[row].slice(0)]                                                                  //* inserts space at the start of the row
              tempOffset[row] -= 1                                                                                      //* increases offset for the row below to maintain positions
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp[row][col - 1] === "blank") {                                                                //* target location is a blank
              temp[row] = [...temp[row].slice(0, col - 1), ' ', ...temp[row].slice(col)]                                //* replaces blank with space
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            return { ...state }
          }
          return { ...state }
        case "up":
          if (temp && action.row !== undefined && action.col !== undefined && tempOffset) {

            if (temp[row - 1] === undefined) {                                                                          //* there is not a row above
              temp = [[' '], ...temp.slice(0)]                                                                          //* adds row with a space
              tempOffset = [col + tempOffset[row], ...tempOffset.slice(0, tempOffset.length)]                           //* offsets the row to line up with the col that added it
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            else if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === "blank") {                      //* if target is a blank
              temp[row - 1] = [                                                                                         //* repaces blank with space
                ...temp[row - 1].slice(0, col + tempOffset[row] - tempOffset[row - 1]),
                ' ',
                ...temp[row - 1].slice(col + tempOffset[row] - tempOffset[row - 1] + 1)
              ]
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            else if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                    //* there is a row above but not the column to match
              if (
                col + tempOffset[row] > temp[row - 1].length - 1 + tempOffset[row - 1]                                  //* col is after the row above
                && state.board?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined                  //* the target location is undefined
              ) {
                while (
                  col + tempOffset[row] > temp[row - 1].length + tempOffset[row - 1]                                    //* more than one space from target location
                  && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                    //* target location is undefined
                  temp[row - 1] = [...temp[row - 1].slice(0), 'blank']                                                  //* inserts blank to the end of the row
                }
                if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                     //* target location is undefined
                  temp[row - 1] = [...temp[row - 1].slice(0), ' ']                                                      //* //* inserts space to end of the row above
                }
                if (state?.gameInProgress === true) {
                  CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
                } else {
                  return { ...state, board: [...temp], offset: [...tempOffset] }
                }
              }
              else if (
                col + tempOffset[row] < tempOffset[row - 1]
                && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                      //* col is before the row above

                while (col + tempOffset[row] < tempOffset[row - 1] - 1                                                  //* inserts blanks until it reaches target col
                  && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {
                  temp[row - 1] = ['blank', ...temp[row - 1].slice(0, temp[row - 1].length)]
                  tempOffset[row - 1] -= 1
                }
                if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                     //* col above is undefined
                  temp[row - 1] = [' ', ...temp[row - 1].slice(0)]
                  tempOffset[row - 1] -= 1
                }
                if (state?.gameInProgress === true) {
                  CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
                } else {
                  return { ...state, board: [...temp], offset: [...tempOffset] }
                }
              }
            }
            return { ...state }
          }
          return { ...state }
        case "down":
          if (temp && action.row !== undefined && action.col !== undefined && tempOffset) {
            if (temp[row + 1] === undefined) {                                                                          //* there is not a row above
              temp = [...temp.slice(0), [' ']]                                                                          //* adds row with a space
              tempOffset = [...tempOffset.slice(0, tempOffset.length), col + tempOffset[row]]                           //* offsets the row to line up with the col that added it
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === "blank") {                    //* if col below is a blank
              temp[row + 1] = [                                                                                         //* replaces blank with space
                ...temp[row + 1].slice(0, col + tempOffset[row] - tempOffset[row + 1]),
                ' ',
                ...temp[row + 1].slice(col + tempOffset[row] - tempOffset[row + 1] + 1)
              ]
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                  //* there is a row below but not the column to match
              if (
                col + tempOffset[row] > temp[row + 1].length - 1 + tempOffset[row + 1]                                  //* more than one space from the target location
                && state.board?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {               //* target location is undefined

                while (
                  col + tempOffset[row] > temp[row + 1].length + tempOffset[row + 1]                                    //* more than one space from the target location
                  && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                    //* target location is still undefined
                  temp[row + 1] = [...temp[row + 1].slice(0), 'blank']                                                  //* inserts blank at the end of the row
                }
                if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                     //* target location is undefined
                  temp[row + 1] = [...temp[row + 1].slice(0), ' ']                                                      //* inserts space to target location
                }
                if (state?.gameInProgress === true) {
                  CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
                } else {
                  return { ...state, board: [...temp], offset: [...tempOffset] }
                }
              } else if (col + tempOffset[row] < tempOffset[row + 1]                                                    //* more than one space from the target location
                && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                      //* target location is undefined

                while (
                  col + tempOffset[row] < tempOffset[row + 1] - 1                                                       //* more than one space from the target location
                  && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                    //* target location is undefined
                  temp[row + 1] = ['blank', ...temp[row + 1].slice(0)]                                                  //* inserts blank to start of the row below
                  tempOffset[row + 1] -= 1                                                                              //* increases offset for the row below to maintain positions
                }
                if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                     //* target location is undefined
                  temp[row + 1] = [' ', ...temp[row + 1].slice(0, temp[row + 1].length)]                                //* inserts space to start of the row below
                  tempOffset[row + 1] -= 1                                                                              //* increases offset for the row below to maintain positions
                }
              }
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            return { ...state }
          }
          break

        default:
          return { ...state }
      }
      break

    case "row":
      if (!state.gameover) {
        let boardMutatorVariable = [...state.board]
        let offsetMutatorVariable = [...state.offset]
        switch (action.value) {
          case "increment":
            if (boardMutatorVariable.length < 15) {
              boardMutatorVariable.push([" "])
              offsetMutatorVariable.push(Number(0))
              if (state?.gameInProgress === true) {
                CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable], curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
              } else {
                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
              }

            } else return { ...state }
          case "decrement":
            if (state?.gameInProgress === false) {
              boardMutatorVariable = boardMutatorVariable.slice(0, -1)
              offsetMutatorVariable = offsetMutatorVariable.slice(0, boardMutatorVariable.length)
              return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
            } else {
              return { ...state }
            }
          default:
            return { ...state }
        }
      } else return { ...state }
    case "col":
      const boardVariable = [...state.board]
      let boardMutatorVariable = boardVariable.slice()
      switch (action.value) {
        case "increment":
          if (boardMutatorVariable[action.row]?.length < 15) {
            let boardMutatorVariable2 = [...boardMutatorVariable[action.row], " "]
            boardMutatorVariable[action.row] = [...boardMutatorVariable2]
          }
          if (state?.gameInProgress === true) {
            CheckForWinOrDraw(temp, tempOffset, state.playerOne, state.playerTwo)
            return { ...state, board: boardMutatorVariable, curPlayerX: !state.curPlayerX, message: message, gameover: gameover }
          } else {
            return { ...state, board: boardMutatorVariable }
          }
        case "decrement":
          if (state?.gameInProgress === false) {
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
  return { ...state }
}
export default reducer