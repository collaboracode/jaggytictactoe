import React, { useState, useEffect } from "react"
import Gameboard from "./BoardDisplay"
import CheckForWin from "../functions/checkForWin"
import WinningLength from "./winLineLength"
import ResetButtons from "./BoardAndOffsetReset"
import CurrentPlayerDisplay from "./CurrentPlayerDisplay"
import BoardAdjustmentTool from "./BoardAdjustmentTool"
import GameOverModal from "./GameOverModal"
import ChangeOffset from "../functions/changeOffset"
import ChangeNumberOfRows from "../functions/changeNumberOfRows"
import ChangeRowColLength from "../functions/changeRowColLength"
export default function GameState() {
  // setup
  const startingWinLength = 3
  const startingOffset = [0, 0, 0]
  const offsetRange = 6
  const playerOne = "X"
  const playerTwo = "O"
  // board can be changed, and getLongestLine will adapt
  const startingBoard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]
  
  // state
  const [board, setBoard] = useState(startingBoard)
  const [message, setMessage] = useState(``)
  const [offset, setOffset] = useState(startingOffset)
  const [gameover, setGameover] = useState(false)
  const [curPlayerX, setCurPlayerX] = useState(true)
  // todo add conditional styling for buttons disabled from gameInProgress
  const [gameInProgress, setGameInProgress] = useState(false)
  const [winLength, setWinLength] = useState(startingWinLength)
  
  useEffect(() => {
    let checkForWin = CheckForWin(board, playerOne, playerTwo, winLength, offset)
    switch (checkForWin) {
      case "draw":
        setMessage(`Draw`)
        setGameover(true)
        break
      case "player1":
        setMessage(`${playerOne} wins`)
        setGameover(true)
        break
      case "player2":
        setMessage(`${playerTwo} wins`)
        setGameover(true)
        break
      default:
        break
    }
  }, [board, offset])

  function resetGame() {
    setMessage(``)
    setCurPlayerX(true)
    setBoard(startingBoard)
    setOffset(startingOffset)
    setGameover(false)
    setWinLength(startingWinLength)
    setGameInProgress(false)
  }
  function resetBoard() {
    setBoard(startingBoard)
    setOffset(startingOffset)
    setCurPlayerX(true)
    setGameInProgress(false)
  }
  function clearBoard() {
    let boardMutalator = board
    boardMutalator.forEach((row, i) => {
      row.forEach((col, j) => {
        boardMutalator[i][j] = " "
      })
    })
    setBoard(boardMutalator)
    setCurPlayerX(true)
    setGameInProgress(false)
    setGameover(false)
  }
  function resetOffset() {
    if (!gameInProgress) {
      let offsetArr = []
      board.forEach(arr => offsetArr.push(Number(0)))
      setOffset(offsetArr)
    }
  }
  let handleOffset = (event) => {
    if (gameover === false) {
      switch (event.target.value) {
        case "1":
        case "-1":
          setOffset([...ChangeOffset(event, offset, offsetRange)])
          gameInProgress && setCurPlayerX(!curPlayerX)
          break
        case "reset":
          resetOffset()
          break
        default:
          break
      }
    }
  }
  let handleRows = (e) => {
    if (gameover === false) {
      switch (e.target.dataset.function) {
        case "row":
          switch (e.target.value) {
            case "1":
              gameInProgress && setCurPlayerX(!curPlayerX)
            case "-1":
              let returnedObj = ChangeNumberOfRows(e, board, offset, gameInProgress)
              if (returnedObj) {
                setBoard(returnedObj.board)
                setOffset(returnedObj.offset)
              }
              break
            case "reset":
              if (!gameInProgress) {
                resetBoard()
              }
              break
            default:
              break
          }
          break
        case "col":
          switch (e.target.value) {
            case "1":
                gameInProgress && setCurPlayerX(!curPlayerX)
            case "-1":
              let returnedVal = ChangeRowColLength(e, board, gameInProgress)
              returnedVal && setBoard(returnedVal)
              break
            case "reset":
              resetBoard()
              break
            case "clear":
              clearBoard()
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
    if (!gameInProgress) {
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
  }
  let handleClick = (e) => {
    let stateMutatorVariable = board
    if (gameover === false
      && board[e.target.dataset.row][e.target.dataset.col] === " ") {
      stateMutatorVariable[e.target.dataset.row][e.target.dataset.col] = curPlayerX ? playerOne : playerTwo
      setBoard([
        ...stateMutatorVariable
      ])
      setCurPlayerX(!curPlayerX)
      setGameInProgress(true)
    }
  }
  return (
    <>
      <WinningLength winLength={winLength} handleWinLength={handleWinLength} />
      <ResetButtons handleOffset={handleOffset} handleRows={handleRows} />
      <BoardAdjustmentTool offset={offset} handleOffset={handleOffset} handleRows={handleRows} board={board} />
      <CurrentPlayerDisplay curPlayerX={curPlayerX} playerOne={playerOne} playerTwo={playerTwo} />
      <GameOverModal message={message} gameover={gameover} resetGame={resetGame} clearBoard={clearBoard} />
      <Gameboard handleClick={handleClick} board={board} offset={offset} />
    </>
  )
}