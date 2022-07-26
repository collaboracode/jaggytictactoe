import React, { useEffect, useReducer } from "react"
import getLongestLine from "../functions/longest_line"
import Gameboard from "./BoardDisplay"
import CurrentPlayerDisplay from "./CurrentPlayerDisplay"
import GameOverModal from "./GameOverModal"
import BoardShift from "./BoardShift"
import AddRemoveRows from "./AddRemoveRows"
import SidebarAdjusters from "./SidebarAdjusters"
import TopBarAndDropdown from "./TopBarAndDropdown"

import reducer from "../functions/reducer"
import initialState from "../statics/initialState"
export default function GameState() {

  const [state, dispatch] = useReducer(reducer, initialState)

  function CheckForWinOrDraw() {
    let playerOneRecord = 0
    let playerTwoRecord = 0
    let isFull = true
    state.board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === " ") {
          isFull = false
        }
        playerOneRecord = Math.max(
          getLongestLine(state.board, state.playerOne, Number(i), Number(j), state.offset),
          playerOneRecord
        )
        playerTwoRecord = Math.max(
          getLongestLine(state.board, state.playerTwo, Number(i), Number(j), state.offset),
          playerTwoRecord
        )
      })
    })
    if (playerOneRecord >= state.winLength && playerTwoRecord >= state.winLength) {
      dispatch({ type: "message", value: "Draw" })
      dispatch({ type: "gameover", value: true })
      return "draw"
    } else if (playerOneRecord >= state.winLength) {
      dispatch({ type: "message", value: `${state.playerOne} wins` })
      dispatch({ type: "gameover", value: true })
      return "player1"
    } else if (playerTwoRecord >= state.winLength) {
      dispatch({ type: "message", value: `${state.playerTwo} wins` })
      dispatch({ type: "gameover", value: true })
      return "player2"
    } else if (isFull) {
      dispatch({ type: "message", value: "Draw" })
      dispatch({ type: "gameover", value: true })
      return "draw"
    }
    return
  }

  useEffect(() => {
    if (state.board?.length) {
      CheckForWinOrDraw()
    }
    return
    // eslint-disable-next-line
  }, [state.board, state.offset, state.winLength, state.playerOne, state.playerTwo])

  useEffect(() => {
    dispatch({ type: "window" })
    window.addEventListener("resize", () => {
      dispatch({
        type: "window",
        value: window.innerWidth
      })
    })
    return () => {
      window.removeEventListener("resize", () => {
        dispatch({
          type: "window",
          value: window.innerWidth
        })
      })
    }
  }, [])

  return (
    <>
      <TopBarAndDropdown
        dispatch={dispatch}
        tileSize={state.tileSize}
        winLength={state.winLength}
        rightHanded={state.rightHanded}
        gameInProgress={state.gameInProgress}
      />
      <AddRemoveRows
        dispatch={dispatch}
        gameInProgress={state.gameInProgress}
      />
      <CurrentPlayerDisplay
        playerOne={state.playerOne}
        playerTwo={state.playerTwo}
        curPlayerX={state.curPlayerX}
      />
      <GameOverModal
        dispatch={dispatch}
        message={state.message}
        gameover={state.gameover}
      />
      <SidebarAdjusters
        dispatch={dispatch}
        board={state.board}
        offset={state.offset}
        tileSize={state.tileSize}
        rightHanded={state.rightHanded}
        gameInProgress={state.gameInProgress}
      />
      <Gameboard
        dispatch={dispatch}
        state={state}
      />
      <BoardShift
        dispatch={dispatch}
      />
    </>
  )
}