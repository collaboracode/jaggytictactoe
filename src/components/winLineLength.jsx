export default function WinningLength(props) {
  let styleDiv = {
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }
  let styleButton = {
    margin: ".5rem",
    padding: "0",
    height: "40px",
    width: "40px",
    fontSize: "2rem",
  }
  let styleP = {
    textAlign: "center",
    width: "100%",
    margin: ".5rem",
    padding: "0",
    fontSize: "2rem",
  }
  return (
    <div style={styleDiv}>
      <p style={styleP}>winning length: {props.winLength}</p>
      <button style={styleButton} onClick={props.handleWinLength} value={-1}>-</button>
      <button style={styleButton} onClick={props.handleWinLength} value={1}>+</button>

    </div>
  )
}