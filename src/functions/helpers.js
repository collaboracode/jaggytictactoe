import getLongestLine from "./longest_line"
/**
 * 
 * @param {string[][]} board 
 * @param {number[]} offset 
 * @param {string} playerOne 
 * @param {string} playerTwo 
 * @returns {{message: string, gameover: boolean}} if gameover === false message is empty string
 */
export function CheckForWinOrDraw(board, offset, playerOne, playerTwo, winLength) {
  let playerOneRecord = 0
  let playerTwoRecord = 0
  let isFull = true
  let message = ""
  let gameover = false
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
  if (playerOneRecord >= winLength && playerTwoRecord >= winLength) {
    message = "Draw"
    gameover = true

  } else if (playerOneRecord >= winLength) {
    message = `${playerOne} wins`
    gameover = true
  } else if (playerTwoRecord >= winLength) {
    message = `${playerTwo} wins`
    gameover = true
  } else if (isFull) {
    message = "Draw"
    gameover = true
  }
  return { message: message, gameover: gameover }
}

/**
 * 
 * @param {string[][]} board 
 * @param {number[]} offset 
 * @param {number} row 
 * @param {number} col 
 * @returns {{board: board, offset: offset}}
 */
export function removeColumn(board, offset, row, col) {
  let boardArr = [...board]
  let offsetArr = [...offset]
  
  //? not rure if I want it to collapse inside or not if yes maybe make it collapse vertically too
  // if (temp[row].filter((el) => el !== "blank").length > 1) {
  //   temp[row] = [...temp[row].slice(0, col), 'blank', ...temp[row].slice(col + 1)]
  // } else if (temp[row].filter((el) => el !== "blank").length === 1) {
  //   temp = [...temp.slice(0, row), ...temp.slice(row + 1)]
  //   tempOffset = [...tempOffset.slice(0, row), ...tempOffset.slice(row + 1)]
  // }
  if (boardArr[row].filter((el) => el !== "blank").length > 1) {                                                        //* the row has more non blanks
    boardArr[row] = [...boardArr[row].slice(0, col), 'blank', ...boardArr[row].slice(col + 1)]                          //* turns space into a blank
  } else if (boardArr[row].filter((el) => el !== "blank").length === 1) {                                               //* target is the only non blank in the row

    if (row === 0 || row === boardArr.length - 1) {                                                                     //* target is on the first or the last row
      boardArr = [...boardArr.slice(0, row), ...boardArr.slice(row + 1)]                                                          //* removes the row
      offsetArr = [...offsetArr.slice(0, row), ...offsetArr.slice(row + 1)]                                             //* removes the offset for that row

      for (let i = 0; i < boardArr.length; i++) {                                                                       //* trims blank rows from the top
        if (boardArr[0].filter((el) => el !== "blank").length > 0) break                                                //* stops at first non all blank row
        boardArr = [...boardArr.slice(1)]
        offsetArr = [...offsetArr.slice(1)]
      }
      for (let i = boardArr.length; i > 0; i--) {                                                                       //* trims blank rows from the bottom
        if (boardArr[boardArr.length - 1].filter((el) => el !== "blank").length > 0) break                              //* stops at first non all blank row
        boardArr = [...boardArr.slice(0, boardArr.length - 1)]
        offsetArr = [...offsetArr.slice(0, offsetArr.length - 1)]
      }
    }
    else {
      boardArr[row] = [...boardArr[row].slice(0, col), 'blank', ...boardArr[row].slice(col + 1)]                        //* replaces space with blank
    }
  }
  return {
    board: boardArr,
    offset: offsetArr
  }
}

/**
 * 
 * @param {string[][]} board 
 * @param {number[]} offset 
 * @param {number} row
 * @param {"increment" | "decrement" | "reset"} value 
 * @returns { offset }}
 */
export function changeOffset(board, offset, row, value) {
  let offsetArr = [...offset]
  let offsetArrReset = []
  switch (value) {
    case "increment":
    //! eslint-disable-next-line no-fallthrough
    case "decrement":
      offsetArr[Number(row)] = (Number(offsetArr[Number(row)]) + (value === "increment" ? 1 : -1))
      return [...offsetArr]
    case "reset":
      board.forEach(arr => offsetArrReset.push(Number(0)))
      return [...offsetArrReset]
    default:
      return [...offset]
  }
}

/**
 * 
 * @param {string[][]} board 
 * @param {number} row 
 * @param {number} col 
 * @param {boolean} curPlayerX 
 * @param {string} playerOne 
 * @param {string} playerTwo
 * @returns {board}
 */
export function claimSpace(board, row, col, curPlayerX, playerOne, playerTwo) {
  let temp = [...board]
  const player = curPlayerX ? `${playerOne}` : `${playerTwo}`
  temp[row] = [...temp[row].slice(0, col), `${player}`, ...temp[row].slice(col + 1)]
  return [...temp]
}

/**
 * 
 * @param {string[][]} board 
 * @param {number[]} offset 
 * @param {numebr} row 
 * @param {number} col 
 * @param {"left" | "right" | "up" | "down"} direction 
 * @returns 
 */
export function addSpace(board, offset, row, col, direction) {
  let temp = [...board]
  let tempOffset = [...offset]
  switch (direction) {
    case "right":
      if (col === temp[row].length - 1) {                                                                               //* col is the last element in the row
        temp[row] = [...temp[row].slice(0), ' ']                                                                        //*inserts space at the end of the row
      }
      else if (temp[row][col + 1] === "blank") {                                                                        //* target location is a blank
        temp[row] = [...temp[row].slice(0, col + 1), ' ', ...temp[row].slice(col + 2)]                                  //* replaces blank with space
      }
      break
    case "left":
      if (col === 0) {                                                                                                  //* col is the first element in the row
        temp[row] = [' ', ...temp[row].slice(0)]                                                                        //* inserts space at the start of the row
        tempOffset[row] -= 1                                                                                            //* increases offset for the row below to maintain positions
      }
      else if (temp[row][col - 1] === "blank") {                                                                        //* target location is a blank
        temp[row] = [...temp[row].slice(0, col - 1), ' ', ...temp[row].slice(col)]                                      //* replaces blank with space
      }
      break
    case "up":
      if (temp[row - 1] === undefined) {                                                                                //* there is not a row above
        temp = [[' '], ...temp.slice(0)]                                                                                //* adds row with a space
        tempOffset = [col + tempOffset[row], ...tempOffset.slice(0, tempOffset.length)]                                 //* offsets the row to line up with the col that added it
      }
      else if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === "blank") {                            //* if target is a blank
        temp[row - 1] = [                                                                                               //* repaces blank with space
          ...temp[row - 1].slice(0, col + tempOffset[row] - tempOffset[row - 1]),
          ' ',
          ...temp[row - 1].slice(col + tempOffset[row] - tempOffset[row - 1] + 1)
        ]
      }
      else if (temp?.[row - 1]?.[col + tempOffset[row] - tempOffset[row - 1]] === undefined) {                          //* there is a row above but not the column to match
        if (col + tempOffset[row] > temp[row - 1].length - 1 + tempOffset[row - 1]) {                                   //* target is past the end of the row above
          while (col + tempOffset[row] > temp[row - 1].length + tempOffset[row - 1]) {                                  //* more than one space from target location
            temp[row - 1] = [...temp[row - 1].slice(0), 'blank']                                                        //* inserts blank to the end of the row
          }
          temp[row - 1] = [...temp[row - 1].slice(0), ' ']                                                              //* inserts space to end of the row above
        }
        else if (
          col + tempOffset[row] < tempOffset[row - 1]) {                                                                //* col is before the row above
          while (col + tempOffset[row] < tempOffset[row - 1] - 1) {                                                     //* inserts blanks until it reaches target col
            temp[row - 1] = ['blank', ...temp[row - 1].slice(0, temp[row - 1].length)]
            tempOffset[row - 1] -= 1
          }
          temp[row - 1] = [' ', ...temp[row - 1].slice(0)]
          tempOffset[row - 1] -= 1
        }
      }
      break
    case "down":
      if (temp[row + 1] === undefined) {                                                                                //* there is not a row above
        temp = [...temp.slice(0), [' ']]                                                                                //* adds row with a space
        tempOffset = [...tempOffset.slice(0, tempOffset.length), col + tempOffset[row]]                                 //* offsets the row to line up with the col that added it
      }
      else if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === "blank") {                            //* if col below is a blank
        temp[row + 1] = [                                                                                               //* replaces blank with space
          ...temp[row + 1].slice(0, col + tempOffset[row] - tempOffset[row + 1]),
          ' ',
          ...temp[row + 1].slice(col + tempOffset[row] - tempOffset[row + 1] + 1)
        ]
      }
      else if (temp?.[row + 1]?.[col + tempOffset[row] - tempOffset[row + 1]] === undefined) {                          //* there is a row below but not the column to match
        if (col + tempOffset[row] > temp[row + 1].length - 1 + tempOffset[row + 1]) {                                   //* at least one space from the target location
          while (
            col + tempOffset[row] > temp[row + 1].length + tempOffset[row + 1]) {                                       //* more than one space from the target location
            temp[row + 1] = [...temp[row + 1].slice(0), 'blank']                                                        //* inserts blank at the end of the row
          }
          temp[row + 1] = [...temp[row + 1].slice(0), ' ']                                                              //* inserts space to target location
        }
        else if (col + tempOffset[row] < tempOffset[row + 1]) {                                                         //* more than one space from the target location
          while (
            col + tempOffset[row] < tempOffset[row + 1] - 1) {                                                          //* more than one space from the target location
            temp[row + 1] = ['blank', ...temp[row + 1].slice(0)]                                                        //* inserts blank to start of the row below
            tempOffset[row + 1] -= 1                                                                                    //* increases offset for the row below to maintain positions
          }
          temp[row + 1] = [' ', ...temp[row + 1].slice(0, temp[row + 1].length)]                                        //* inserts space to start of the row below
          tempOffset[row + 1] -= 1                                                                                      //* increases offset for the row below to maintain positions
        }
      }
      break
    default:
      return { board: [...board], offset: [...offset] }
  }

  return { board: [...temp], offset: [...tempOffset] }

}