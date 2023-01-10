// I will admit that going down on increased row numbers was probaby a mistake due to how unintuitive it is.
import initialState from "../statics/initialState"
// ! todo figure out why player swap only works sometimes 
const reducer = (state, action) => {
  // todo refactor to have the vars for all these here
  const row = Number(action.row)
  const col = Number(action.col)
  let temp = [...state.board]
  let tempOffset = [...state.offset]
  function clearBoard() {
    let boardMutalator = [...state.board]
    boardMutalator.forEach((row, i) => {
      row.forEach((col, j) => {
        if (boardMutalator[i][j] !== 'blank')
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
      return { ...state, tileSize: resize() }

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
      switch (action.value) {
        case "reset":
          if (!state.gameInProgress) {
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
        default:
          return { ...state, board: action.value }
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
        return [...offsetMutatorVariable]
      }

      if (!state.gameover) {
        switch (action.value) {
          case "increment":
            if (state.gameInProgress) {
              return { ...state, offset: ChangeOffset(1), curPlayerX: !state.curPlayerX }
            } else {
              return { ...state, offset: ChangeOffset(1) }
            }
          case "decrement":
            if (state.gameInProgress) {
              return { ...state, offset: ChangeOffset(-1), curPlayerX: !state.curPlayerX }
            } else {
              return { ...state, offset: ChangeOffset(-1) }
            }

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

    case "remove":
      // todo improve 
      if (state.board) {


        if (temp[row].filter((el) => el !== "blank").length > 1) {
          temp[row] = [...temp[row].slice(0, col), 'blank', ...temp[row].slice(col + 1)]
        } else if (temp[row].filter((el) => el !== "blank").length === 1) {
          temp = [...temp.slice(0, row), ...temp.slice(row + 1)]
          tempOffset = [...tempOffset.slice(0, row), ...tempOffset.slice(row + 1)]
        }
        // setBoard([...temp])
        // setOffset([...tempOffset])
        if (state.gameInProgress) {
          return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
        } else {
          return { ...state, board: [...temp], offset: [...tempOffset] }
        }
      }

      // if (state.board) {
      //   let temp = [...state.board]
      //   let tempOffset = [...state.offset]
      //   const row = action.row

      //   if (temp[row].filter((el) => el !== "blank").length > 1) {
      //     temp[row].shift()
      //     tempOffset[row] += 1
      //   } else if (temp[row].filter((el) => el !== "blank").length === 1) {
      //     temp = [...temp.slice(0, row), ...temp.slice(row + 1)]
      //     tempOffset = [...tempOffset.slice(0, row), ...tempOffset.slice(row + 1)]
      //   }
      //   // setBoard([...temp])
      //   // setOffset([...tempOffset])
      //   return { ...state, board: [...temp], offset: [...tempOffset] }
      // }
      break

    case "add":
      switch (action.direction) {
        case "right":
          if (temp && action.row !== undefined && action.col !== undefined && tempOffset) {

            if (col === state.board[row].length - 1) {
              // temp[row].push(' ')
              temp[row] = [...temp[row].slice(0), ' ']
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp[row][col + 1] === "blank") {
              // temp[row].splice(col + 1, 1, ' ')
              temp[row] = [...temp[row].slice(0, col + 1), ' ', ...temp[row].slice(col + 2)]
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
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
          if (temp && action.row !== undefined && action.col !== undefined && tempOffset) {

            if (col === 0) {
              // ! why doesn't temp[row].unshift(' ') work here ?!?!?!
              temp[row] = [' ', ...temp[row].slice(0)]
              tempOffset[row] -= 1
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp[row][col - 1] === "blank") {
              // temp[row].splice(col - 1, 1, ' ')
              temp[row] = [...temp[row].slice(0, col - 1), ' ', ...temp[row].slice(col)]
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            return { ...state }
          }
          return { ...state }
        case "up":
          if (temp && action.row !== undefined && action.col !== undefined && tempOffset) {

            if (temp[row - 1] === undefined) { //* there is not a row above
              // ! why does temp.unshift([' ']) work here ?!?!?!
              // temp.unshift([' '])
              temp = [[' '], ...temp.slice(0)]
              tempOffset = [col + tempOffset[row], ...tempOffset.slice(0, tempOffset.length)]
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            else if (temp?.[row - 1]?.[col + state.offset[row] - state.offset[row - 1]] === "blank") {                  //* if col above is a blank
              // temp[row - 1][col + tempOffset[row] - tempOffset[row - 1]] = ' '
              temp[row - 1] = [
                ...temp[row - 1].slice(0, col + tempOffset[row] - tempOffset[row - 1]),
                ' ',
                ...temp[row - 1].slice(col + tempOffset[row] - tempOffset[row - 1] + 1)
              ]
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            }
            else if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                    //* there is a row above but not the column to match
              if (
                col + tempOffset[row] > temp[row - 1].length - 1 + tempOffset[row - 1]                                  //* col is after the row above
                && state.board?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined
              ) {
                while (col + tempOffset[row] > temp[row - 1].length + tempOffset[row - 1]                               //* while for inserting blanks to the right
                  && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {
                  // temp[row - 1].push("blank")
                  temp[row - 1] = [...temp[row - 1].slice(0), 'blank']
                }
                if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {
                  // temp[row - 1].push(' ')
                  temp[row - 1] = [...temp[row - 1].slice(0), ' ']
                }
                if (state.gameInProgress) {
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
                } else {
                  return { ...state, board: [...temp], offset: [...tempOffset] }
                }
              }
              else if (
                col + tempOffset[row] < tempOffset[row - 1]
                && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                      //* col is before the row above
                while (col + tempOffset[row] < tempOffset[row - 1] - 1
                  && temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {
                  // ! why doesn't temp[row - 1].unshift('blank') work here ?!?!?!
                  temp[row - 1] = ['blank', ...temp[row - 1].slice(0, temp[row - 1].length)]
                  tempOffset[row - 1] -= 1
                }
                if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                     //* col above is undefined
                  // ! why doesn't temp[row - 1].unshift(' ') work here ?!?!?!
                  temp[row - 1] = [' ', ...temp[row - 1].slice(0)]
                  tempOffset[row - 1] -= 1
                }
                if (state.gameInProgress) {
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
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
            if (temp[row + 1] === undefined) { //* there is not a row above
              // temp.push([' '])
              temp = [...temp.slice(0), [' ']]
              tempOffset = [...tempOffset.slice(0, tempOffset.length), col + tempOffset[row]]

              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp?.[row + 1]?.[col + state.offset[row] - state.offset[row + 1]] === "blank") {                //* if col below is a blank
              temp[row + 1] = [
                ...temp[row + 1].slice(0, col + tempOffset[row] - tempOffset[row + 1]),
                ' ',
                ...temp[row + 1].slice(col + tempOffset[row] - tempOffset[row + 1] + 1)
              ]
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...temp], offset: [...tempOffset] }
              }
            } else if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                  //* there is a row below but not the column to match
              if (
                col + tempOffset[row] > temp[row + 1].length - 1 + tempOffset[row + 1]
                && state.board?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {               //* col is after the row below
                while (
                  col + tempOffset[row] > temp[row + 1].length + tempOffset[row + 1]                                    //*
                  && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                    //* col below is undefined
                  // temp[row + 1].push("blank")
                  temp[row + 1] = [...temp[row + 1].slice(0), 'blank']
                }
                if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                     //*
                  // temp[row + 1].push(' ')
                  temp[row + 1] = [...temp[row + 1].slice(0), ' ']
                }
                if (state.gameInProgress) {
                  return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
                } else {
                  return { ...state, board: [...temp], offset: [...tempOffset] }
                }
              } else if (
                col + tempOffset[row] < tempOffset[row + 1]
                && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                      //* col is before the row below

                while (
                  col + tempOffset[row] < tempOffset[row + 1] - 1
                  && temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                    //* while for inserting blanks above and to the left
                  temp[row + 1] = ['blank', ...temp[row + 1].slice(0)]
                  tempOffset[row + 1] -= 1
                }
                if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {
                  temp[row + 1] = [' ', ...temp[row + 1].slice(0, temp[row + 1].length)]
                  tempOffset[row + 1] -= 1
                }
              }
              if (state.gameInProgress) {
                return { ...state, board: [...temp], offset: [...tempOffset], curPlayerX: !state.curPlayerX }
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
              if (state.gameInProgress) {

                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable], curPlayerX: !state.curPlayerX }
              } else {
                return { ...state, board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
              }

            } else return { ...state }
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
          if (state.gameInProgress) {
            return { ...state, board: boardMutatorVariable, curPlayerX: !state.curPlayerX }
          } else {
            return { ...state, board: boardMutatorVariable }
          }
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
  return { ...state }
}
export default reducer