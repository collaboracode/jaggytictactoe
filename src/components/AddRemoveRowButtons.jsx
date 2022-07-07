import React, { useState, useEffect } from "react"
export default function AddRemoveRowButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle,
  }
  let styleRowAddRmoveButtons = {
    height: "40px",
    width: "75px",
    fontSize: "1rem",
  }
  let styleButtonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "0",
    padding: "0",
    height: "100px",
  }

  return (
    <div style={styleButtonContainer}>
      <button
        style={{ ...styleRowAddRmoveButtons, ...styleGameInProgress }}
        onClick={props.handleRows}
        data-function={"row"}
        value={"-1"}>remove row
      </button>
      <button
        style={styleRowAddRmoveButtons}
        onClick={props.handleRows}
        data-function={"row"}
        value={"1"}>add row
      </button>
    </div>
  )
}