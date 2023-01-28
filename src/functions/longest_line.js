/**
 * this returns the length of the longest line, which could be from 0 to the max
 * of the height or the width of the array
 * @param {number[][] | string[][]} twoDimensionalArray - 2d array of game "board"
 * @param {number | string} player - the target element to find like elements in the arrays
 * @param {integer} inputRow - index of a subarray of twoDimensionalArray
 * @param {integer} inputCol - the element of the row array
 * @param {integer[]} offset - **optional** an integer array where each number offsets
 *  the corresponding row,
 *  and the numbers can be negative, and can completely separate them
 * 
 * * visialisation of the  offset for rows of the board
 * *     [0, 1, -1] = [
 * *           ["o", "o", "x"],
 * *                ["o", "x", "o"],
 * *      ["x", "o", "o"]
 * * ]
 */
export default function getLongestLine(twoDimensionalArray, player, inputRow, inputCol, offset = null) {
  // Making sure these are definitely numbers, to prevent type errors
  const row = Number(inputRow)
  const col = Number(inputCol)

  // line length records for each function, which get returned by their respective functions
  let verticalRecord = 0
  let horizontalRecord = 0
  let diagonal1Record = 0
  let diagonal2Record = 0

  // Checked nodes for each function to prevent infinite loops
  let checkedVerticalNodes = []
  let checkedHorizontalNodes = []
  let checkedDiagonal1Nodes = []
  let checkedDiagonal2Nodes = []
  /**
   * This gets the length of the vertical line
   * - this gets the player parameter player from the parent function
   * @param {number[][] | string[][]} twoDimensionalArray - 2d array of game "board"
   * @param {integer} row - index of a subarray of twoDimensionalArray
   * @param {integer} col - the element of the row array
   * @param {integer[]} offset - **optional** an integer array where each number offsets
   *  the corresponding row, and the numbers can be negative, and can completely separate them
   * * visialisation of the  offset for rows of the board
   * *     [0, 1, -1] = [
   * *           ["o", "o", "x"],
   * *                ["o", "x", "o"],
   * *      ["x", "o", "o"]
   * * ]
   */
  function checkVertical(twoDimensionalArray, row, col, offset = null) {
    // readability variables
    const rowUp = row - 1
    const rowDown = row + 1
    const currentPosString = `[${row}][${col}]`
    const prevRowString = `[${rowUp}][${offset ? col + offset[row] - offset[rowUp] : col}]`
    const nextRowString = `[${rowDown}][${offset ? col + offset[row] - offset[rowDown] : col}]`
    
    if (twoDimensionalArray?.[row]?.[col] === player
      && !checkedVerticalNodes
        .includes(currentPosString)) {
      verticalRecord++
      checkedVerticalNodes.push(currentPosString)

      if (twoDimensionalArray?.[rowUp]?.[
        offset
          ? col + offset?.[row] - offset?.[rowUp]
          : col] === player
        && !checkedVerticalNodes.includes(prevRowString)) {
        checkVertical(twoDimensionalArray, rowUp,
          offset
            ? col + offset[row] - offset[rowUp]
            : col,
          offset) // if there is an offset it is passed, else it will null by default
      }

      if (twoDimensionalArray?.[rowDown]?.[
        offset
          ? col + offset[row] - offset[rowDown]
          : col] === player
        && !checkedVerticalNodes.includes(nextRowString)) {
        checkVertical(twoDimensionalArray, rowDown,
          offset
            ? col + offset[row] - offset[rowDown]
            : col,
          offset) // if there is an offset it is passed, else it will null by default
      }
      return verticalRecord
    } else return
  }

  /**
   * This gets the length of the horizontal line,
   * and is not affected by an offset,
   * so it does not take one as a parameter
   * - this gets the player parameter player from the parent function
   * @param {number[][] | string[][]} twoDimensionalArray - 2d array of game "board"
   * @param {integer} row - index of a subarray of twoDimensionalArray
   * @param {integer} col - the element of the corresponding row
   */
  function checkHorizontal(twoDimensionalArray, row, col) {
    // readability variables
    const left = Number(col) - 1
    const right = Number(col) + 1
    const currentPosString = `[${row}][${col}]`
    const prevColString = `[${row}][${left}]`
    const nextColString = `[${row}][${right}]`

    if (twoDimensionalArray?.[row]?.[col] === player
      && !checkedHorizontalNodes.includes(currentPosString)) {
      horizontalRecord++
      checkedHorizontalNodes.push(currentPosString)

      if (twoDimensionalArray?.[row]?.[left] === player
        && !checkedHorizontalNodes.includes(prevColString)) {
        checkHorizontal(twoDimensionalArray, row, left)
      }

      if (twoDimensionalArray?.[row]?.[right] === player
        && !checkedHorizontalNodes.includes(nextColString)) {
        checkHorizontal(twoDimensionalArray, row, right)
      }
      return horizontalRecord
    } else return null
  }

  /**
   * This gets the length of the diagonal line, up to the left,
   * and down to the right
   * - this gets the player parameter player from the parent function
   * @param {number[][] | string[][]} twoDimensionalArray - 2d array of game "board"
   * @param {integer} row - index of a subarray of twoDimensionalArray
   * @param {integer} col - the element of the row array
   * @param {integer[]} offset - **optional** an integer array where each number offsets
   *  the corresponding row,
   *  and the numbers can be negative, and can completely separate them
   * * visialisation of the  offset for rows of the board
   * *     [0, 1, -1] = [
   * *           ["o", "o", "x"],
   * *                ["o", "x", "o"],
   * *      ["x", "o", "o"]
   * * ]
   */
  function checkDiagonal1(twoDimensionalArray, row, col, offset = null) {
    // readability variables
    const rowUp = Number(row) - 1
    const rowDown = Number(row) + 1
    const left = Number(col) - 1
    const right = Number(col) + 1
    const currentPosString = `[${row}][${col}]`
    const prevRowString = `[${rowUp}][${offset ? left + offset[row] - offset[rowUp] : left}]`
    const nextRowString = `[${rowDown}][${offset ? right + offset[row] - offset[rowDown] : right}]`

    if (twoDimensionalArray?.[row]?.[col] === player
      && !checkedDiagonal1Nodes.includes(currentPosString)) {
      diagonal1Record++
      checkedDiagonal1Nodes.push(currentPosString)

      if (twoDimensionalArray?.[rowUp]?.[
        offset
          ? left + offset[row] - offset[rowUp]
          : left] === player
        && !checkedDiagonal1Nodes.includes(prevRowString)) {
        checkDiagonal1(twoDimensionalArray, rowUp,
          offset
            ? left + offset[row] - offset[rowUp]
            : left,
          offset) // if there is an offset it is passed, else it will null by default
      }

      if (twoDimensionalArray?.[rowDown]?.[
        offset
          ? right + offset[row] - offset[rowDown]
          : right] === player
        && !checkedDiagonal1Nodes.includes(nextRowString)) {
        checkDiagonal1(twoDimensionalArray, rowDown,
          offset
            ? right + offset[row] - offset[rowDown]
            : right,
          offset) // if there is an offset it is passed, else it will null by default
      }
      return diagonal1Record
    } else return null
  }

  /**
   * This gets the length of the diagonal line, up to the right,
   * and down to the left
   * - this gets the player parameter player from the parent function
   * @param {number[][] | string[][]} twoDimensionalArray - 2d array of game "board"
   * @param {integer} row - index of a subarray of twoDimensionalArray
   * @param {integer} col - the element of the row array
   * @param {integer[]} offset - **optional** an integer array where each number offsets
   *  the corresponding row,
   *  and the numbers can be negative, and can completely separate them
   * * visialisation of the  offset for rows of the board
   * *     [0, 1, -1] = [
   * *           ["o", "o", "x"],
   * *                ["o", "x", "o"],
   * *      ["x", "o", "o"]
   * * ]
   */
  function checkDiagonal2(twoDimensionalArray, row, col, offset = null) {
    // readability variables
    const rowUp = Number(row) - 1
    const rowDown = Number(row) + 1
    const left = Number(col) - 1
    const right = Number(col) + 1
    const currentPosString = `[${row}][${col}]`
    const prevElementString = `[${rowUp}][${offset ? right + offset[row] - offset[rowUp] : 0}]`
    const nextElementString = `[${rowDown}][${offset ? left + offset[row] - offset[rowDown] : left}]`

    if (twoDimensionalArray?.[row]?.[col] === player
      && !checkedDiagonal2Nodes.includes(currentPosString)) {
      diagonal2Record++
      checkedDiagonal2Nodes.push(currentPosString)

      if (twoDimensionalArray?.[rowUp]?.[
        offset
          ? right + offset?.[row] - offset?.[rowUp]
          : right] === player
        && !checkedDiagonal2Nodes.includes(prevElementString)) {
        checkDiagonal2(twoDimensionalArray, rowUp,
          offset
            ? right + offset[row] - offset[rowUp]
            : right,
          offset) // if there is an offset it is passed, else it will null by default
      }

      if (twoDimensionalArray?.[rowDown]?.[
        offset
          ? left + offset?.[row] - offset?.[rowDown]
          : left] === player
        && !checkedDiagonal2Nodes.includes(nextElementString)) {
        checkDiagonal2(twoDimensionalArray, rowDown,
          offset
            ? left + offset[row] - offset[rowDown]
            : left,
          offset) // if there is an offset it is passed, else it will null by default
      }
      return diagonal2Record
    } else return null
  }
  let longestLine = Math.max(
    checkVertical(twoDimensionalArray, row, col, offset),
    checkHorizontal(twoDimensionalArray, row, col), // does not need offset, because it only look left and right
    checkDiagonal1(twoDimensionalArray, row, col, offset),
    checkDiagonal2(twoDimensionalArray, row, col, offset)
  )
  return longestLine ? longestLine : null
}