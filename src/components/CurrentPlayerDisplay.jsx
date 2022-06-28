export default function CurrentPlayerDisplay(props) {
  let styleDisplay = {
    width: "100%",
    marginTop: "-1rem",
    textAlign: "center"
  }
  return (
    <h2
        style={styleDisplay}>currently {props.curPlayerX ? "X" : "O"}'s turn
      </h2>
  )
}