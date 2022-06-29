  /**
   * returns Array[]
   * @param { {object} } event the event object
   * @param { integer[] } offset the offset array
   * @param { number } offsetRange the max value for the offset as offsetRange and -offsetRange
   */
export default function ChangeOffset(event, offset, offsetRange) {
  let offsetMutatorVariable = offset
  let index = Number(event.target.dataset.offsetindex)
  offsetMutatorVariable[index] += Number(event.target.value)
  if (offsetMutatorVariable[index] > Number(offsetRange)) {
    offsetMutatorVariable[index] = Number(offsetRange)
  }
  else if (offsetMutatorVariable[index] < 0 - Number(offsetRange)) {
    offsetMutatorVariable[index] = 0 - Number(offsetRange)
  }
  return offsetMutatorVariable
}