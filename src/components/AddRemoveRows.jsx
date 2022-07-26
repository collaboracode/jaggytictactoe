import React, { useState, useEffect } from "react"
export default function AddRemoveRows(props) {
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
      zIndex: "8",
      display: "flex",
      position: "sticky",
      top: "10px",
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
        onClick={() => {
          props.dispatch({type: "row", value: "decrement"})
        }}
        data-function={"row"}
        value={"-1"}>remove row
      </button>
      <button
        style={style.rowAddRemoveButtons}
        onClick={() => {
          props.dispatch({type: "row", value: "increment"})
        }}
        data-function={"row"}
        value={"1"}>add row
      </button>
    </div>
  )
}