import React, { useState } from "react"
import Gameboard from "./BoardDisplay"
import getLongestLine from "../functions/longest_line"
import WinningLength from "./winLineLength"
import ResetButtons from "./BoardAndOffsetReset"
import CurrentPlayerDisplay from "./CurrentPlayerDisplay"
import BoardAdjustmentTool from "./BoardAdjustmentTool"
import GameOverModal from "./GameOverModal"
// import Gameboard from "./board"
export default function GameState() {
  // setup
  const startingWinLength = 3
  const startingOffset = [0, 0, 0]
  const offsetRange = 6
  // board can be changed, and getLongestLine will adapt
  const startingBoard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]

  // state
  let [board, setBoard] = useState(startingBoard)
  const [message, setMessage] = useState(``)
  const [offset, setOffset] = useState(startingOffset)
  const [gameover, setGameover] = useState(false)
  const [curPlayerX, setCurPlayerX] = useState(true)
  const [winLength, setWinLength] = useState(startingWinLength)
  function resetGame() {
    setMessage(``)
    setCurPlayerX(true)
    setBoard(startingBoard)
    setOffset(startingOffset)
    setGameover(false)
    setWinLength(startingWinLength)
  }
  let handleOffset = (e) => {
    if (gameover === false) {
      let offsetMutatorVariable = offset
      switch (e.target.value) {
        case "1":
          offsetMutatorVariable[Number(e.target.dataset.offsetindex)] += Number(e.target.value)
          if (offsetMutatorVariable[Number(e.target.dataset.offsetindex)] > Number(offsetRange)) {
            offsetMutatorVariable[Number(e.target.dataset.offsetindex)] = Number(offsetRange)
          }
          setOffset([...offsetMutatorVariable])
          break
        case "-1":
          offsetMutatorVariable[Number(e.target.dataset.offsetindex)] += Number(e.target.value)
          if (offsetMutatorVariable[Number(e.target.dataset.offsetindex)] < 0 - Number(offsetRange)) {
            offsetMutatorVariable[Number(e.target.dataset.offsetindex)] = 0 - Number(offsetRange)
          }
          setOffset([...offsetMutatorVariable])
          break
        case "reset":
          let offsetArr = []
          board.forEach(arr => offsetArr.push(Number(0)))
          setOffset(offsetArr)
          break
        default:
          break
      }
    }
  }
  let handleRows = (e) => {
    if (gameover === false) {
      let boardMutatorVariable = board
      let offsetMutatorVariable = offset
      switch (e.target.dataset.function) {
        case "row":
          switch (e.target.value) {
            case "1":
              if (boardMutatorVariable.length < 15) {
                boardMutatorVariable.push([" "])
                offsetMutatorVariable.push(Number(0))
                setBoard([...boardMutatorVariable])
                setOffset([...offsetMutatorVariable])
              }
              break
            case "-1":
              boardMutatorVariable = boardMutatorVariable.slice(0, -1)
              offsetMutatorVariable = offsetMutatorVariable.slice(0, boardMutatorVariable.length)
              setBoard(boardMutatorVariable)
              setOffset(offsetMutatorVariable)
              break
            case "reset":
              setBoard(startingBoard)
              offsetMutatorVariable = offsetMutatorVariable.slice(0, startingBoard.length)
              setOffset(offsetMutatorVariable)
              setCurPlayerX(true)
              break
            default:
              break
          }
          break
        case "col":
          switch (e.target.value) {
            case "1":
              if (boardMutatorVariable[Number(e.target.dataset.row)].length < 15) {
                boardMutatorVariable[Number(e.target.dataset.row)].push(" ")
                setBoard([...boardMutatorVariable])
              }
              break
            case "-1":
              let row = boardMutatorVariable[Number(e.target.dataset.row)]
              if (row.slice(0, -1).length > 0) {
                boardMutatorVariable[Number(e.target.dataset.row)].pop()
              }
              setBoard([...boardMutatorVariable])
              break
            case "reset":
              setBoard(startingBoard)
              setCurPlayerX(true)
              break
            default:
              break
          }
          break
        default:
          break
      }
    }
  }
  let handleWinLength = (e) => {
    switch (e.target.value) {
      case "1":
        if (winLength + 1 <= 15) {
          setWinLength(winLength + 1)
        }
        break
      case "-1":
        if (winLength - 1 > 1) {
          setWinLength(winLength - 1)
        }
        break
      default:
        break
    }
  }
  let handleClick = (e) => {
    let player = curPlayerX ? "x" : "o"
    let stateMutatorVariable = board
    if (gameover === false) {
      switch (board[e.target.dataset.row][e.target.dataset.col]) {
        case " ":
          stateMutatorVariable[e.target.dataset.row][e.target.dataset.col] = curPlayerX ? "x" : "o"
          setBoard([
            ...stateMutatorVariable
          ])
          if (getLongestLine(board, player, e.target.dataset.row, e.target.dataset.col, offset) >= winLength) {
            setMessage(`${player} wins`)
            setGameover(true)
            break
          }
          setCurPlayerX(!curPlayerX)
          break
        default:
          break
      }
    }
  }
  return (
    <>
      <WinningLength winLength={winLength} handleWinLength={handleWinLength} />
      <ResetButtons handleOffset={handleOffset} handleRows={handleRows} />
      <BoardAdjustmentTool offset={offset} handleOffset={handleOffset} handleRows={handleRows} board={board} />
      <CurrentPlayerDisplay curPlayerX={curPlayerX} />
      <GameOverModal message={message} gameover={gameover} resetGame={resetGame}/>
      <Gameboard handleClick={handleClick} board={board} offset={offset} />
    </>
  )
}