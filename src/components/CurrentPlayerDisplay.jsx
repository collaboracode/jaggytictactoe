export default function CurrentPlayerDisplay(props) {
  const style = {
    display: {
      width: "100%",
      marginTop: "-1rem",
      textAlign: "center"
    }
  }
  return (
    <h2
      style={style.display}
    >currently {props.curPlayerX ? props.playerOne : props.playerTwo}'s turn
    </h2>
  )
}