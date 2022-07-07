import React, { useState, useEffect } from "react"

import WinningLength from "./winLineLength"
import ResetButtons from "./BoardAndOffsetReset"

export default function ControlBar(props) {

const [hidden, setHidden] = useState(false)

  useEffect(() => {
    props.tileSize > 50 ? setHidden(false) : setHidden(true)
  }, [props.tileSize])
  
  const styleDiv = {
    display: "flex",
    padding: "0",
    width: "100%",
    overflowX: "hidden",
    marginTop: "0",
    marginBottom: "0",
    justifyContent: "center",
    flexDirection: `${props.tileSize > 50 ? "row" : "column"}`,
    display: `${hidden ? "none" : "flex"}`,
    marginBottom: "1rem"
  }
  let collapseButton = {
    position: "-webkit-sticky",
    position: "sticky",
    display: `${props.tileSize > 50 ? "none" : "inline-block"}`,
    float: `${props.rightHanded ? "right" : "left"}`,
    marginTop: `${- props.tileSize * .6}px`,
    left: `${props.rightHanded ? "auto" : "1rem"}`,
    right: `${props.rightHanded ? "1rem" : "auto"}`,
    padding: "0",
    height: `${props.tileSize * .6}px`,
    width: `${props.tileSize}px`,
    textAlign: "center",
    fontSize: `${props.tileSize * .5}px`,
    zIndex: "8",
    border: "none",
    boxShadow: "1px 2px 3px grey",
  }
  const styleSwap = {
    padding: ".5rem",
    marginLeft: `${props.tileSize > 50 ? "1rem" : "auto"}`,
    marginRight: `${props.tileSize > 50 ? "1rem" : "auto"}`,
    marginBottom: `${props.tileSize > 50 ? "0" : "1rem"}`,
    height: "2.5rem"
  }
  const handleHidden = () => {
    setHidden(!hidden)
  }
  return (
    <>
    <button style={collapseButton} onClick={handleHidden}>{
            hidden ? "\\/" : "/\\"
          }</button>
          <div style={styleDiv}>
    
            <button style={styleSwap} onClick={props.handleHanded}>swap hands</button>
            <WinningLength
              winLength={props.winLength}
              tileSize={props.tileSize}
              handleWinLength={props.handleWinLength}
              gameInProgress={props.gameInProgress}
            />
            <ResetButtons
              handleOffset={props.handleOffset}
              handleRows={props.handleRows}
              gameInProgress={props.gameInProgress}
            />
          </div>
    </>
  )
}
