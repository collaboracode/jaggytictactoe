import OffsetTool from "./OffsetRowColTool"
import React, { useState, useEffect } from "react"
import GameOverModal from "./GameOverModal"
import WinningLength from "./winLineLength"
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
  return (
    <>
      <h1 style={{textAlign: "center", marginBottom: "4rem"}}>Tic-Tac-Toe: Jaggy Edition </h1>
      <WinningLength winLength={props.winLength} handleWinLength={props.handleWinLength}/>
      <OffsetTool offset={props.offset} handleOffset={props.handleOffset} handleRows={props.handleRows} board={props.board} />
      <h2
        style={{
          width: "100%",
          marginTop: "-1rem",
          textAlign: "center"
        }}>currently {props.curPlayerX ? "X" : "O"}'s turn
      </h2>
      <div style={styleBoardContainer} id="gameboard">
        {/* add modal here */}
        <GameOverModal
          message={props.message}
          gameover={props.gameover}
          resetGame={props.resetGame}
        />
        <div style={styleBoard}>
          {props.board.map((row, i) => {
            return (
              <ul
                id={`row${i}`}
                className="row"
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  listStyle: "none",
                  padding: "0px 100px",
                  position: "relative",
                  left: `${110 * (boardShift / 2)}px`,
                  marginLeft: `${110 * props.offset[i]}px`,
                }} >
                {row && row.map((col, j) => {
                  return col && <li
                    style={styleCol}
                    onClick={props.handleClick}
                    className="col" key={`second${j}`}
                    data-row={i}
                    data-col={j}>
                    <p key={`second${j}`}
                      style={styleP}

                    >{`${props.board[i][j]}`}</p>
                  </li>
                })}
              </ul>
            )
          })}
        </div>
      </div>
    </>
  )
}