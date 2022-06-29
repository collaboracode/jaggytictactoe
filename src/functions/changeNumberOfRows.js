  /**
   * returns Array[]
   * @param { {object} } event - the event object
   * @param { number[][] | string[][] } board
   * @param { integer[] } offset the offset array
   * @param { boolean } gameInProgress
   */
export default function ChangeNumberOfRows(event, board, offset, gameInProgress,) {
  let boardMutatorVariable = board
  let offsetMutatorVariable = offset
  switch (event.target.value) {
    case "1":
      if (boardMutatorVariable.length < 15) {
        boardMutatorVariable.push([" "])
        offsetMutatorVariable.push(Number(0))
        return { board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
      }
      break
    case "-1":
      if (!gameInProgress) {
        boardMutatorVariable = boardMutatorVariable.slice(0, -1)
        offsetMutatorVariable = offsetMutatorVariable.slice(0, boardMutatorVariable.length)
        return { board: [...boardMutatorVariable], offset: [...offsetMutatorVariable] }
      }
      break
    default:
      break
  }
}