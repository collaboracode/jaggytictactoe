import getLongestLine from "./longest_line"
  /**
   * returns string (draw | player1 | player2)
   * @param { number[][] | string[][] } board - the game board
   * @param { number | string } player1 - the number or string representing the first player
   * @param { number | string } player2 - the number or string representing the second player
   * @param { number } goalLength - the line length required to win
   * @param { integer[] } offset **optional** offset array
   */
export default function CheckForWinOrDraw(board, player1, player2, goalLength, offset = null) {
  let playerOneRecord = 0
  let playerTwoRecord = 0
  let isFull = true
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === " ") {
        isFull = false
      }
      playerOneRecord = Math.max(getLongestLine(board, player1, Number(i), Number(j), offset), playerOneRecord)
      playerTwoRecord = Math.max(getLongestLine(board, player2, Number(i), Number(j), offset), playerTwoRecord)
    })
  })
  if (playerOneRecord >= goalLength && playerTwoRecord >= goalLength) {
    return "draw"
  } else if (playerOneRecord >= goalLength) {
    return "player1"
  } else if (playerTwoRecord >= goalLength) {
    return "player2"
  } else if (isFull) {
    return "draw"
  }else return
}