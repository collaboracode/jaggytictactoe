export default function CurrentPlayerDisplay(props) {
  let styleDisplay = {
    width: "100%",
    marginTop: "-1rem",
    textAlign: "center"
  }
  return (
    <h2
      style={styleDisplay}
      >currently {props.curPlayerX ? props.playerOne : props.playerTwo}'s turn
    </h2>
  )
}