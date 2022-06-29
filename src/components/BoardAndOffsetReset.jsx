import React, { useState, useEffect } from "react"

export default function ResetButtons(props) {
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("red")
  const [resetButtonBackgroundColorTwo, setResetButtonBackgroundColorTwo] = useState("red")
  const [resetButtonBackgroundColorThree, setResetButtonBackgroundColorThree] = useState("red")
  const [gameInProgressStyle, setGameInProgressStyle] = useState ("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle
  }
  let styleButtonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "1rem",
    padding: "0",
    height: "100px",
  }
  let styleResetButton = {
    height: "40px",
    width: "50px",
    margin: "0",
    padding: "0",
    color: "white",
    backgroundColor: `${resetButtonBackgroundColor}`,
  }
  let styleResetButtonTwo = {
    ...styleResetButton,
    backgroundColor: `${resetButtonBackgroundColorTwo}`,
  }
  let styleResetButtonThree = {
    ...styleResetButton,
    backgroundColor: `${resetButtonBackgroundColorThree}`,
  }

  const handleMouseEnterStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("darkRed")
        break
      case "resetButtonTwo":
        setResetButtonBackgroundColorTwo("darkRed")
        break
      case "resetButtonThree":
        setResetButtonBackgroundColorThree("darkRed")
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
      case "resetButtonTwo":
        setResetButtonBackgroundColorTwo("red")
        break
      case "resetButtonThree":
        setResetButtonBackgroundColorThree("red")
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
        }, 50)
        clearTimeout(timer)
        break
      case "resetButtonTwo":
        setResetButtonBackgroundColorTwo("red")
        let timer2 = setTimeout(() => {
          setResetButtonBackgroundColorTwo("darkRed")
        }, 50)
        clearTimeout(timer2)
        break
      default:
        break
    }
  }

  return (
    <>
      <div style={styleButtonContainer}>
        <button
          style={{...styleResetButton, ...styleGameInProgress}}
          onClick={(e) => {
            props.handleOffset(e)
            handleMouseClickStyle(e)
          }}
          data-element_type={"resetButton"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
          value={"reset"}
        >reset offset</button>
        <button
          onClick={props.handleRows}
          data-function={"row"}
          value={"reset"}
          style={{...styleResetButtonTwo, ...styleGameInProgress}}
          data-element_type={"resetButtonTwo"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >reset board</button>
        <button
          onClick={props.handleRows}
          data-function={"col"}
          value={"clear"}
          style={styleResetButtonThree}
          data-element_type={"resetButtonThree"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >clear board</button>
      </div>
    </>
  )
}