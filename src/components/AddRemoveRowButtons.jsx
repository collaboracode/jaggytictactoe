import React, { useState, useEffect } from "react"
export default function AddRemoveRowButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    const setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  const style = {
    gameInProgress: {
      opacity: gameInProgressStyle,
    },
    rowAddRemoveButtons: {
      height: "40px",
      width: "75px",
      fontSize: "1rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      margin: "0",
      padding: "0",
      height: "100px",
    }
  }

  return (
    <div style={style.buttonContainer}>
      <button
        style={{ ...style.rowAddRemoveButtons, ...style.gameInProgress }}
        onClick={props.handleRows}
        data-function={"row"}
        value={"-1"}>remove row
      </button>
      <button
        style={style.rowAddRemoveButtons}
        onClick={props.handleRows}
        data-function={"row"}
        value={"1"}>add row
      </button>
    </div>
  )
}