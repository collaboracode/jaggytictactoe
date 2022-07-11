import React, { useState, useEffect } from "react"
export default function ShiftButtons(props) {
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("#d00")

  const style = {
    shiftDiv: {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      bottom: "10px"
    },
    shiftButton: {
      padding: "1rem",

    },
    shiftReset: {
      color: "white",
      backgroundColor: resetButtonBackgroundColor
    }
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
        setResetButtonBackgroundColor("#d00")
        break
      default:
        break
    }
  }
  const handleMouseClickStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("#d00")
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
    <div style={style.shiftDiv}>
      <button
        style={style.shiftButton}
        onClick={
          () => {
            props.handleShift("-1")
          }
        }>shift left
      </button>
      <button
        style={{ ...style.shiftButton, ...style.shiftReset }}
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
        style={style.shiftButton}
        onClick={
          () => {
            props.handleShift("1")
          }
        }>shift right
      </button>
    </div>
  )
}