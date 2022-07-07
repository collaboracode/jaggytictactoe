import React, { useState, useEffect } from "react"
export default function ShiftButtons(props) {
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("red")
  const styleShiftDiv = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: "10px"
  }
  const styleShiftButton = {
    padding: "1rem",
    
  }
  const styleShiftReset = {
    ...styleShiftButton,
    color: "white",
    backgroundColor: resetButtonBackgroundColor
  }

  const handleMouseEnterStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("darkRed")
        break
      default:
        break
    }
  }
  const handleMouseLeaveStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("red")
        break
      default:
        break
    }
  }
  const handleMouseClickStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("red")
        let timer = setTimeout(() => {
          setResetButtonBackgroundColor("darkRed")
          clearTimeout(timer)
        }, 100)
        break
      default:
        break
    }
  }
  const handleKeys = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        props.handleShift("-1")
        break
      case "ArrowRight":
        props.handleShift("1")
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
    }
  })
  
  return (
    <div style={styleShiftDiv}>
      <button
        style={styleShiftButton}
        onClick={
          () => {
            props.handleShift("-1")
          }
        }>shift left
      </button>
      <button
        style={styleShiftReset}
        data-element_type={"resetButton"}
        onMouseEnter={handleMouseEnterStyle}
        onMouseLeave={handleMouseLeaveStyle}
        onClick={(e) => {
            props.handleShift("reset")
            handleMouseClickStyle(e)
          }
        }>reset
      </button>
      <button
        style={styleShiftButton}
        onClick={
          () => {
            props.handleShift("1")
          }
        }>shift right
      </button>
    </div>
  )
}