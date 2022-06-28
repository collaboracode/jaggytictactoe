import React, { useState, useEffect } from "react"

export default function Gameboard(props) {
  const [boardShift, setBoardShift] = useState(0)

  useEffect(() => {
    let maxValue = 0
    for (let i = 0; i < props.board.length; i++) {
      if (props.board[i].length > 9) {

        maxValue = Math.max(maxValue, props.board[i].length - 9)
      }
    }
    setBoardShift(maxValue)
  }, [props.board])
  let styleCol = {
    height: "100px",
    width: "100px",
    backgroundColor: "lightGrey",
    textAlign: "center",

  }
  let styleP = {
    pointerEvents: "none",
    position: "relative",
    top: "20%",
    fontSize: "5rem",
    margin: "0",
    lineHeight: ".5"
  }
  let styleBoardContainer = {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "auto",
  }
  let styleBoard = {
    position: "absolute",

  }
  let styleUl = {
    display: "flex",
    gap: "10px",
    listStyle: "none",
    padding: "0px 100px",
    position: "relative",
    left: `${110 * (boardShift / 2)}px`,
  }
  return (
    <>

      <div style={styleBoardContainer} id="gameboard">
        <div style={styleBoard}>
          {props.board.map((row, i) => {
            return (
              <ul
                id={`row${i}`}
                className="row"
                key={i}
                style={{ ...styleUl, marginLeft: `${110 * props.offset[i]}px`, }}>
                {row && row.map((col, j) => {
                  return (
                    col && <li
                      style={styleCol}
                      onClick={props.handleClick}
                      className="col" key={`second${j}`}
                      data-row={i}
                      data-col={j}>
                      <p key={`second${j}`}
                        style={styleP}

                      >{`${props.board[i][j]}`}</p>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>
    </>
  )
}