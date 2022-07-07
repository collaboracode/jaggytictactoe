import React, { useState, useEffect } from "react"
export default function WinningLength(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle
  }
  let styleDiv = {
    display: "flex",
    justifyContent: "center",
    flexDirection: `${props.tileSize > 50 ? "row" : "column"}`,
  }
  let styleButton = {
    margin: ".5rem",
    padding: "0",
    height: "40px",
    width: "40px",
    fontSize: "2rem",
    marginTop: "0",
  }
  let styleP = {
    textAlign: "center",
    width: "100%",
    margin: ".5rem",
    padding: "0",
    fontSize: "2rem",
    marginTop: "0",
    marginBottom: `${props.tileSize > 50 ? "0" : "1rem"}`
  }
  return (
    <div style={styleDiv}>
      <div style={{display: "flex", justifyContent: "center"}}>
      <button
        style={{ ...styleButton, ...styleGameInProgress }}
        onClick={props.handleWinLength}
        value={-1}
      >-</button>
      <button
        style={{ ...styleButton, ...styleGameInProgress }}
        onClick={props.handleWinLength}
        value={1}
      >+</button>
      </div>
      <p style={styleP}>{props.winLength} to win</p>

    </div>
  )
}