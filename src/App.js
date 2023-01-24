import { useEffect, useReducer } from "react"

import reducer from "./functions/reducer"
import initialState from "./statics/initialState"

import Gameboard from "./components/BoardDisplay"
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay"
import GameOverModal from "./components/GameOverModal"
import BoardShift from "./components/BoardShift"
import TopBarAndDropdown from "./components/TopBarAndDropdown"

import './App.scss';

export default function App() {
  const [state, dispatch] = useReducer(reducer, { ...initialState })
  function resize() {
    // todo refactor everything that uses this to be done with media queries
    let tileSize
    if (window.innerWidth > 800) {
      tileSize = 100
    }
    else if (window.innerWidth > 600) {
      tileSize = 75
    }
    else if (window.innerWidth > 400) {
      tileSize = 60
    }
    else {
      tileSize = 50
    }
    dispatch({ type: "window", value: tileSize })
  }
  useEffect(() => {
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])
  return (
    <>
      <TopBarAndDropdown
        dispatch={dispatch}
        tileSize={state.tileSize}
        winLength={state.winLength}
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
      <Gameboard
        dispatch={dispatch}
        board={state.board}
        offset={state.offset}
        tileSize={state.tileSize}
        boardShift={state.boardShift}
      />
      <BoardShift
        dispatch={dispatch}
      />
    </>
  )
}