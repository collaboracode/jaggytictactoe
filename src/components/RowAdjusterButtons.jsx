import React, { useState, useEffect } from "react"
// import AdjusterButton from "./adjusterButton"
export default function RowAdjusterButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  const style = {
    gameInProgress: {
      opacity: gameInProgressStyle,
    },
    button: {
      padding: "0px",
      height: `${props.tileSize * .5}px`,
      width: `${props.tileSize * .5}px`,
      fontSize: `${props.tileSize * .3}px`,
      textAlign: "center",
      alignText: "center",
      margin: "0",
    },
    buttonUl: {
      display: `${hidden ? "none" : "flex"}`,
      flexDirection: "column",
      gap: "1rem",
      listStyle: "none",
      padding: "0",
      position: "absolute",
      // add button to swap sides using left 0, and right 0
      zIndex: "6",
      right: `${props.rightHanded ? "1rem" : "auto"}`,
      left: `${props.rightHanded ? "auto" : "1rem"}`,
    },
    collapseButton: {
      position: "-webkit-sticky",
      // eslint-disable-next-line
      position: "sticky",
      top: "10px",
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
    },
    ul: {
      display: `${hidden ? "none" : "flex"}`,
      flexDirection: "column",
      gap: "1rem",
      listStyle: "none",
      padding: "0",
      position: "absolute",
      // add button to swap sides using left 0, and right 0
      zIndex: "6",
      right: `${props.rightHanded ? "1rem" : "auto"}`,
      left: `${props.rightHanded ? "auto" : "1rem"}`,
    },
    li: {
      padding: "0 0 0 0",
      width: `${props.tileSize}px`,
      height: `${props.tileSize}px`,
      display: "flex",
      flexWrap: "wrap",
      alignContent: "end",
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "dimgrey",
      color: "white",
      // adding boarder without adding width to the element
      boxShadow: "0 0 0 2px #000",
    },
  }

  const handleHidden = (e) => {
    setHidden(!hidden)
  }

  return (
    <>
      <button
        style={style.collapseButton}
        onClick={handleHidden}
      >{props.rightHanded ? hidden ? "<" : ">" : hidden ? ">" : "<"}
      </button>

      <ul style={style.buttonUl}>
        {props.board.map((row, i) => {
          return (
            <li key={`li${i}`} style={{ ...style.li, top: `${110 * i}` }}>
              <div key={`div2${i}`}>
                <button
                  style={style.button}
                  key={`fifth${i}`}
                  onClick={() => {
                    props.dispatch({type: "offset", value: "decrement", offsetIndex: i})
                  }}
                >{"<"}
                </button>

                <button
                  style={style.button}
                  key={`third${i}`}
                  onClick={() => {
                    props.dispatch({type: "offset", value: "increment", offsetIndex: i})
                  }}
                >{">"}
                </button>
              </div>
              <div key={`div3${i}`}>
                <button
                  style={{ ...style.button, ...style.gameInProgress }}
                  key={`sixth${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={-1}
                  onClick={() => {
                    props.dispatch({type: "col", value: "decrement", row: i})
                  }}
                  // onClick={props.handleRows}
                >-
                </button>

                <button
                  style={style.button}
                  key={`fourth ${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={1}
                  onClick={() => {
                    props.dispatch({type: "col", value: "increment", row: i})
                  }}
                  // onClick={props.handleRows}
                >+
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}