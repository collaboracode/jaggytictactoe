  /**
   * returns Array[]
   * @param { {object} } event the event object
   * @param { integer[] } offset the offset array
   * @param { number } offsetRange the max value for the offset as offsetRange and -offsetRange
   */
export default function ChangeOffset(event, offset, offsetRange) {
  let offsetMutatorVariable = offset
  let index = Number(event.target.dataset.offsetindex)
  offsetMutatorVariable[Number(index)] += Number(event.target.value)
  if (offsetMutatorVariable[Number(index)] > Number(offsetRange)) {
    offsetMutatorVariable[Number(index)] = Number(offsetRange)
  }
  else if (offsetMutatorVariable[Number(index)] < 0 - Number(offsetRange)) {
    offsetMutatorVariable[Number(index)] = 0 - Number(offsetRange)
  }
  return [...offsetMutatorVariable]
}