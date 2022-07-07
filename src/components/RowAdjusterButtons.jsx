import React, { useState, useEffect } from "react"
export default function RowAdjusterButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle,
  }

  // let styleP = {
  //   margin: "0"
  // }

  let styleButton = {
    padding: "0",
    height: `${props.tileSize * .4}px`,
    width: `${props.tileSize * .4}px`,
    fontSize: `${props.tileSize * .3}px`,
    lineHeight: "5px",
    textAlign: "center",
    alignText: "center",
    margin: `${props.tileSize * .05}px ${props.tileSize * .03}px`
  }
  let collapseButton = {
    position: "-webkit-sticky",
    position: "sticky",
    float: `${props.rightHanded ? "right" : "left"}`,
    marginTop: `${- props.tileSize * .6}px`,
    left: `${props.rightHanded ? "auto" : "1rem"}`,
    right: `${props.rightHanded ?  "1rem": "auto"}`,
    padding: "0",
    height: `${props.tileSize * .6}px`,
    width: `${props.tileSize}px`,
    textAlign: "center",
    fontSize: `${props.tileSize * .5}px`,
    zIndex: "8",
    border: "none",
    boxShadow: "1px 2px 3px grey",
  }
  let styleButtonDiv = {
    display: "flex",
    gap: ".2rem",
  }

  let styleLi = {
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
  }
  let styleButtonUl = {
    display: `${hidden ? "none" : "flex"}`,
    flexDirection: "column",
    gap: "1rem",
    listStyle: "none",
    padding: "0",
    position: "absolute",
    // add button to swap sides using left 0, and right 0
    zIndex: "6",
    right: `${props.rightHanded ? "1rem" : "auto"}`,
    left: `${props.rightHanded ?  "auto": "1rem"}`,
  }
  const handleHidden = (e) => {
    setHidden(!hidden)
  }

  return (
    <>
      <button style={collapseButton} onClick={handleHidden}>{
      props.rightHanded ? hidden ? "<" : ">" : hidden ? ">" : "<"
      }</button>
      <ul style={styleButtonUl}>
        {props.board.map((row, i) => {
          return (
            <li key={`li${i}`} style={{ ...styleLi, top: `${110 * i}` }}>
              {/* <p style={styleP}>row {i + 1}</p> */}
              <div key={`div2${i}`} style={styleButtonDiv}>
                <button
                  style={styleButton}
                  key={`fifth${i}`}
                  data-offsetindex={i}
                  data-function={"offset"}
                  value={-1}
                  onClick={props.handleOffset}
                >{"<"}
                </button>

                <button
                  style={styleButton}
                  key={`third${i}`}
                  data-offsetindex={i}
                  data-function={"offset"}
                  value={1}
                  onClick={props.handleOffset}
                >{">"}
                </button>
              </div>
              <div key={`div3${i}`} style={styleButtonDiv}>
                <button
                  style={{ ...styleButton, ...styleGameInProgress }}
                  key={`sixth${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={-1}
                  onClick={props.handleRows}
                >-
                </button>

                <button
                  style={styleButton}
                  key={`fourth ${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={1}
                  onClick={props.handleRows}
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