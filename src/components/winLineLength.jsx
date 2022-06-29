import React, { useState, useEffect } from "react"
export default function WinningLength(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState ("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])
  
  let styleGameInProgress = {
    opacity: gameInProgressStyle
  }
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
      <button style={{...styleButton, ...styleGameInProgress}} onClick={props.handleWinLength} value={-1}>-</button>
      <button style={{...styleButton, ...styleGameInProgress}} onClick={props.handleWinLength} value={1}>+</button>

    </div>
  )
}