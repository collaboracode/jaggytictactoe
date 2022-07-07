import React, { useState, useEffect } from "react"
/**
 * todo make mobile friendly
 * todo make tile sizes relative to screen size using variables insted of being hard coded,
 * todo also make the offset shift dynamic using the variables 
 * todo fix rows leaving bounds on left side
*/
export default function Gameboard(props) {
  
  const styleCol = {
    height: `${props.tileSize}px`,
    width: `${props.tileSize}px`,
    backgroundColor: "lightGrey",
    textAlign: "center",
    boxShadow: "5px 5px 5px grey",

  }
  const styleP = {
    pointerEvents: "none",
    position: "relative",
    top: "20%",
    fontSize: `${props.tileSize}px`,
    margin: "0",
    lineHeight: ".5",
  }
  const styleBoardContainer = {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",    
    overflow: "hidden"
   
  }
  const styleBoard = {
    marginLeft: "auto",
    marginRight: "auto",
  }
  const styleUl = {
    display: "flex",
    gap: "10px",
    listStyle: "none",
    padding: "0px 100px",
    position: "relative",
    left: `${(props.tileSize + 10) * props.boardShift}px`,
  }

  // const handleShift = (input) => {
  //   switch (input) {
  //     case "-1":
  //       setBoardShift(boardShift - 1)
  //       break
  //     case "1":
  //       setBoardShift(boardShift + 1)
  //       break
  //     case "reset":
  //       setBoardShift(0)
  //       break
  //     default:
  //       break
  //   }
  // }

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
                style={{
                  ...styleUl,
                  marginLeft: `${(props.tileSize + 10) * props.offset[i]}px`,
                  // applies margin to the last row of the board
                  marginBottom: `${i + 1 === props.board.length ? "8rem" : "0"}`
                }}>
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
      </div>
      {/* <ShiftButtons handleShift={handleShift} />*/}
    </>
  )
}