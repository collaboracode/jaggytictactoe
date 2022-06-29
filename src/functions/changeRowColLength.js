  /**
   * returns Array[]
   * @param { {object} } event - the event object
   * @param { number[][] | string[][] } board
   * @param { boolean } gameInProgress
   */
export default function ChangeRowColLength(event, board, gameInProgress) {
  let dataRow = Number(event.target.dataset.row)
  let boardMutatorVariable = board
  switch (event.target.value) {
    case "1":
      if (boardMutatorVariable[dataRow].length < 15) {
        boardMutatorVariable[dataRow].push(" ")
        return [...boardMutatorVariable]
      }
      break
    case "-1":
      if (!gameInProgress) {
        let boardRow = boardMutatorVariable[dataRow]
        if (boardRow.slice(0, -1).length > 0) {
          boardMutatorVariable[dataRow].pop()
        }
        return [...boardMutatorVariable]
      }
      break
    default:
      break
  }
}