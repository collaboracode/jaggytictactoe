import React, { useState } from "react"
export default function GameOverModal(props) {
  const [resetButtonColor, setResetButtonColor] = useState("white")
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("#b00")
  const handleMouseEnterStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        // setResetButtonBackgroundColor("#e00")
        setResetButtonBackgroundColor("darkRed")

        break
    }
  }
  const handleMouseLeaveStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("#b00")
        break
    }
  }
  let styleModal = {
    position: "fixed",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    top: "45%",
    width: "250px",
    height: "170px",
    background: "dimgrey",
    color: "white",
    zIndex: "10",
    borderRadius: "16px",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
    opacity: "1",

  }
  let styleModalBackground = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top:"0",
    background: "grey",
    color: "white",
    zIndex: "8",
    opacity: ".6",
  }
  let styleResetButton = {
    height: "60px",
    width: "100px",
    margin: "0",
    padding: "0",
    backgroundColor: `${resetButtonBackgroundColor}`,
    color: `${resetButtonColor}`,
    fontSize: "1rem",
  }
  return (
    props.gameover === true &&
    <>
    <div style={styleModalBackground}>
    </div>

      <div style={styleModal}>
        <p style={{width: "100%", textAlign: "center"}}>{props.message}</p>
        <button
          onClick={props.resetGame}
          style={styleResetButton}
          data-element_type={"resetButton"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >reset game</button>
      </div>
    </>
  )
}