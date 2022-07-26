import React, { useState, useEffect } from "react"
export default function ResetAndClear(props) {
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("#d00")
  const [resetButtonBackgroundColorTwo, setResetButtonBackgroundColorTwo] = useState("#d00")
  const [resetButtonBackgroundColorThree, setResetButtonBackgroundColorThree] = useState("#d00")
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  const style = {
    gameInProgress: {
      opacity: gameInProgressStyle
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "0",
      padding: "0",
      height: "40px",
    },
    resetButton: {
      height: "40px",
      width: "50px",
      margin: "0",
      padding: "0",
      color: "white",
    },
    resetBgOne: {
      backgroundColor: `${resetButtonBackgroundColor}`,
    },
    resetBgtwo: {
      backgroundColor: `${resetButtonBackgroundColorTwo}`,
    },
    resetBgThree: {
      backgroundColor: `${resetButtonBackgroundColorThree}`,
    }
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
        setResetButtonBackgroundColor("#d00")
        break
      case "resetButtonTwo":
        setResetButtonBackgroundColorTwo("#d00")
        break
      case "resetButtonThree":
        setResetButtonBackgroundColorThree("#d00")
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
      case "resetButtonTwo":
        setResetButtonBackgroundColorTwo("#d00")
        let timer2 = setTimeout(() => {
          setResetButtonBackgroundColorTwo("darkRed")
          clearTimeout(timer2)
        }, 100)
        break
      case "resetButtonThree":
        setResetButtonBackgroundColorThree("#d00")
        let timer3 = setTimeout(() => {
          setResetButtonBackgroundColorThree("darkRed")
          clearTimeout(timer3)
        }, 100)
        break
      default:
        break
    }
  }

  return (
    <>
      <div style={style.buttonContainer}>
        <button
          style={{ ...style.resetButton, ...style.resetBgOne, ...style.gameInProgress }}
          onClick={(e) => {
            props.dispatch({ type: "offset", value: "reset" })
            handleMouseClickStyle(e)
          }}
          data-element_type={"resetButton"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >reset offset</button>
        <button
          onClick={(e) => {
            props.dispatch({ type: "board", value: "reset" })
            handleMouseClickStyle(e)
          }}
          style={{ ...style.resetButton, ...style.resetBgtwo, ...style.gameInProgress }}
          data-element_type={"resetButtonTwo"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >reset board</button>
        <button
          onClick={(e) => {
            props.dispatch({ type: "board", value: "clear" })
            handleMouseClickStyle(e)
          }}
          style={{ ...style.resetButton, ...style.resetBgThree }}
          data-element_type={"resetButtonThree"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >clear board</button>
      </div>
    </>
  )
}