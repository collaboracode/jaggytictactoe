import React, { useState } from "react"
export default function GameOverModal(props) {

  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("#b00")
  const [clearButtonBackgroundColor, setclearButtonBackgroundColor] = useState("#b00")

  const handleMouseEnterStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("darkRed")
        break
      case "clearButton":
        setclearButtonBackgroundColor("darkRed")
        break
      default:
        break
    }
  }

  const handleMouseLeaveStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("#b00")
        break
      case "clearButton":
        setclearButtonBackgroundColor("#b00")
        break
      default:
        break
    }
  }

  let styleP = {
    width: "100%",
    textAlign: "center",
    fontSize: "3rem",
    marginBottom: "1rem",
    lineHeight: "0px",
  }
  let styleModal = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "250px",
    height: "170px",
    background: "dimgrey",
    color: "white",
    zIndex: "10",
    borderRadius: "16px",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
    opacity: "1",

  }
  let styleModalContainer = {
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    top: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "10",
  }
  let styleModalBackground = {
    position: "fixed",
    display: "flex",
    width: "100vw",
    height: "100vh",
    top: "0",
    background: "grey",
    color: "white",
    zIndex: "10",
    opacity: ".6",
  }
  let styleResetButton = {
    height: "60px",
    width: "100px",
    margin: "0",
    padding: "0",
    backgroundColor: `${resetButtonBackgroundColor}`,
    color: "white",
    fontSize: "1rem",
  }
  let styleClearButton = {
    height: "60px",
    width: "100px",
    margin: "0",
    padding: "0",
    color: "white",
    fontSize: "1rem",
    backgroundColor: `${clearButtonBackgroundColor}`,
  }

  return (
    props.gameover === true &&
    <>
      <div style={styleModalBackground}>
      </div>
      <div style={styleModalContainer}>
        <div style={styleModal}>
          <p style={styleP}>{props.message}</p>
          <button
            onClick={props.resetGame}
            style={styleResetButton}
            data-element_type={"resetButton"}
            onMouseEnter={handleMouseEnterStyle}
            onMouseLeave={handleMouseLeaveStyle}
          >reset game</button>
          <button
            onClick={props.clearBoard}
            style={styleClearButton}
            data-element_type={"clearButton"}
            onMouseEnter={handleMouseEnterStyle}
            onMouseLeave={handleMouseLeaveStyle}
          >clear board</button>
        </div>
      </div>

    </>
  )
}