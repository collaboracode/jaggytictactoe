import React, { useState, useEffect } from "react"
import TestButtons from "./TestButtons"
/**
 * todo make mobile friendly
 * todo make tile sizes relative to screen size using variables insted of being hard coded,
 * todo also make the offset shift dynamic using the variables 
 * todo fix rows leaving bounds on left side
*/
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
    marginLeft: "200"

  }
  let styleUl = {
    display: "flex",
    gap: "10px",
    listStyle: "none",
    padding: "0px 100px",
    position: "relative",
    left: `${110 * (boardShift / 2)}px`,
  }
  let styleButtonUl = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyle: "none",
    padding: "0px 25px",
    position: "absolute",
    zIndex: "6"
  }
  return (
    <>
    {/* <ul style={styleButtonUl}> */}
      {/* <TestButtons
        board={props.board}
        offset={props.offset} handleOffset={props.handleOffset}
        handleRows={props.handleRows}
        gameInProgress={props.gameInProgress}
      /> */}
    {/* </ul> */}

      <div style={styleBoardContainer} id="gameboard">
        <div style={styleBoard}>
          {props.board.map((row, i) => {
            return (
              <>
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
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}