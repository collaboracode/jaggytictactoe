import React, { useState, useEffect } from "react"
export default function WinningLength(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  const style = {
    gameInProgress: {
      opacity: gameInProgressStyle
    },
    div: {
      display: "flex",
      justifyContent: "center",
      flexDirection: `${props.tileSize < 100 ? "column" : "row"}`,
    },
    button: {
      margin: ".5rem .25rem",
      padding: "0",
      height: "40px",
      width: "40px",
      fontSize: "2rem",
      marginTop: "0",
    },
    p: {
      textAlign: "center",
      width: "100%",
      margin: ".5rem",
      padding: "0",
      fontSize: "2rem",
      marginTop: "0",
      marginBottom: `${props.tileSize < 100 ? "1rem" : "0"}`
    }
  }

  return (
    <div style={style.div}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ ...style.button, ...style.gameInProgress }}
          onClick={props.handleWinLength}
          value={-1}
        >-
        </button>
        <button
          style={{ ...style.button, ...style.gameInProgress }}
          onClick={props.handleWinLength}
          value={1}
        >+
        </button>
      </div>
      <p style={style.p}>{props.winLength} to win</p>

    </div>
  )
}