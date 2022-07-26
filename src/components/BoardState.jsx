import React, { useEffect, useReducer } from "react"
import getLongestLine from "../functions/longest_line"
import Gameboard from "./BoardDisplay"
import CurrentPlayerDisplay from "./CurrentPlayerDisplay"
import GameOverModal from "./GameOverModal"
import ShiftButtons from "./BoardShiftButtons"
import AddRemoveRowButtons from "./AddRemoveRowButtons"
import AdjusterBottons from "./RowAdjusterButtons"
import ControlBar from "./ControlBar"

import Reducer from "../functions/Reducer"
import initialState from "../statics/initialState"
export default function GameState() {

  const [state, dispatch] = useReducer(Reducer, initialState)


  function CheckForWinOrDraw(board, player1, player2, goalLength, offset = null) {
    let playerOneRecord = 0
    let playerTwoRecord = 0
    let isFull = true
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === " ") {
          isFull = false
        }
        playerOneRecord = Math.max(
          getLongestLine(board, player1, Number(i), Number(j), offset),
          playerOneRecord
        )
        playerTwoRecord = Math.max(
          getLongestLine(board, player2, Number(i), Number(j), offset),
          playerTwoRecord
        )
      })
    })
    if (playerOneRecord >= goalLength && playerTwoRecord >= goalLength) {
      return "draw"
    } else if (playerOneRecord >= goalLength) {
      return "player1"
    } else if (playerTwoRecord >= goalLength) {
      return "player2"
    } else if (isFull) {
      return "draw"
    } else return
  }
  
  
  useEffect(() => {
    if (state.board?.length) {
      let checkForWin = CheckForWinOrDraw(state.board, state.playerOne, state.playerTwo, state.winLength, state.offset)
      switch (checkForWin) {
        case "draw":
          dispatch({ type: "message", value: "Draw" })
          dispatch({ type: "gameover", value: true })
          break
        case "player1":
          dispatch({ type: "message", value: `${state.playerOne} wins` })
          dispatch({ type: "gameover", value: true })
          break
        case "player2":
          dispatch({ type: "message", value: `${state.playerTwo} wins` })
          dispatch({ type: "gameover", value: true })
          break
        default:
          break
      }
    }
  }, [state.board, state.offset, state.winLength, state.playerOne, state.playerTwo])
  
  useEffect(() => {
    window.addEventListener("resize", () => dispatch({type: "window", value: window.innerWidth}));
    return () => {
      window.removeEventListener("resize", () => dispatch({type: "window", value: window.innerWidth}));
    }
  }, [])

  // const resize = () => {
  //   const sizeOne = 100
  //   const sizeTwo = 75
  //   const sizeThree = 60
  //   const sizeFour = 50
  //   if (window.innerWidth > 800) {
  //     dispatch({type: "tileSize", value: sizeOne})
  //   } else if (window.innerWidth > 600) {
  //     dispatch({type: "tileSize", value: sizeTwo})
  //   } else if (window.innerWidth > 400) {
  //     dispatch({type: "tileSize", value: sizeThree})
  //   } else {
  //     dispatch({type: "tileSize", value: sizeFour})
  //   }
  // }

  const handleClick = (e) => {
    let stateMutatorVariable = [...state.board]
    let row = e.target.dataset.row
    let col = e.target.dataset.col
    if (state.gameover === false
      && state.board[row][col] === " ") {
      stateMutatorVariable[row][col] = state.curPlayerX ? state.playerOne : state.playerTwo
      dispatch({ type: "board", value: [...stateMutatorVariable] })
      dispatch({ type: "curPlayerX", value: !state.curPlayerX })
      dispatch({ type: "gameInProgress", value: true })
    }
  }
  return (
    <>
      <ControlBar
        tileSize={state.tileSize}
        rightHanded={state.rightHanded}
        winLength={state.winLength}
        gameInProgress={state.gameInProgress}
        dispatch={dispatch}
      />
      <AddRemoveRowButtons
        gameInProgress={state.gameInProgress}
        dispatch={dispatch}
      />
      <CurrentPlayerDisplay
        curPlayerX={state.curPlayerX}
        playerOne={state.playerOne}
        playerTwo={state.playerTwo}
      />
      <GameOverModal
        dispatch={dispatch}
        message={state.message}
        gameover={state.gameover}
      />
      <AdjusterBottons
        dispatch={dispatch}
        board={state.board}
        offset={state.offset}
        tileSize={state.tileSize}
        rightHanded={state.rightHanded}
        gameInProgress={state.gameInProgress}
      />
      <Gameboard
        board={state.board}
        offset={state.offset}
        tileSize={state.tileSize}
        boardShift={state.boardShift}
        handleClick={handleClick}
      />
      <ShiftButtons
        dispatch={dispatch}
      />
    </>
  )
}