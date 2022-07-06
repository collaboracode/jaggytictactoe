import React, { useState, useEffect } from "react"
import TestButtons from "./TestButtons"
/**
 * todo make mobile friendly
 * todo make tile sizes relative to screen size using variables insted of being hard coded,
 * todo also make the offset shift dynamic using the variables 
 * todo fix rows leaving bounds on left side
*/
export default function Gameboard(props) {
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("red")
  const [boardShift, setBoardShift] = useState(0)
  const styleCol = {
    height: "100px",
    width: "100px",
    backgroundColor: "lightGrey",
    textAlign: "center",
    boxShadow: "5px 5px 5px grey",

  }
  const styleP = {
    pointerEvents: "none",
    position: "relative",
    top: "20%",
    fontSize: "5rem",
    margin: "0",
    lineHeight: ".5",
  }
  const styleBoardContainer = {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  }
  const styleBoard = {
    position: "absolute",
    marginLeft: "200",
  }
  const styleUl = {
    display: "flex",
    gap: "10px",
    listStyle: "none",
    padding: "0px 100px",
    position: "relative",
    left: `${110 * (boardShift)}px`,
  }






  const styleShiftDiv = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: "90%",
  }
  const styleShiftButton = {
    padding: "1rem"
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
        }, 50)
        clearTimeout(timer)
        break
      default:
        break
    }
  }

  const handleKeys = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setBoardShift(boardShift - 1)
        break
      case "ArrowRight":
        setBoardShift(boardShift + 1)
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
    <>
      <div style={styleBoardContainer} id="gameboard">
        <div style={styleBoard}>
          {props.board.map((row, i) => {
            return (
              <ul
                id={`row${i}`}
                className="row"
                key={`row${i}`}
                style={{ ...styleUl, marginLeft: `${110 * props.offset[i]}px`, }}>
                {row && row.map((col, j) => {
                  return (
                    col && <li
                      style={styleCol}
                      onClick={props.handleClick}
                      className="col"
                      key={`second${j}`}
                      data-row={i}
                      data-col={j}>
                      <p key={`third${j}`}
                        style={styleP}

                      >{`${props.board[i][j]}`}</p>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
        <div style={styleShiftDiv}>
          <button
            style={styleShiftButton}
            onClick={
              () => {
                setBoardShift(boardShift - 1)
              }
            }>shift left
          </button>
          <button
            style={styleShiftReset}
            data-element_type={"resetButton"}
            onMouseEnter={handleMouseEnterStyle}
            onMouseLeave={handleMouseLeaveStyle}
            onClick={
              () => {
                setBoardShift(0)
                handleMouseClickStyle()
              }
            }>reset
        </button>
        <button
          style={styleShiftButton}
          onClick={
            () => {
              setBoardShift(boardShift + 1)
            }
          }>shift right
        </button>
      </div>
    </div>

    </>
  )
}