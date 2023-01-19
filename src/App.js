import reducer from "./functions/reducer"
import { useDoc } from "@syncstate/react";

import Gameboard from "./components/BoardDisplay"
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay"
import GameOverModal from "./components/GameOverModal"
import BoardShift from "./components/BoardShift"
import TopBarAndDropdown from "./components/TopBarAndDropdown"

import './App.css';

export default function App() {
  const statePath = "/gamestate";
  const [state, setState] = useDoc(statePath, Infinity);
  // const [stateFromReducer, dispatch] = useReducer(reducer, state)
  // ! this is hacky but it works (the under the bed approach prevails)
  const dispatch = async (e) => {
    setState(reducer(state, e))
  }

  return (
    <>
      <TopBarAndDropdown
        dispatch={dispatch}
        tileSize={state.tileSize}
        winLength={state.winLength}
        rightHanded={state.rightHanded}
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
        state={state}
      />
      <BoardShift
        dispatch={dispatch}
      />
    </>
  )
}
