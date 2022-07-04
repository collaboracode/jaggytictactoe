import React, { useState, useEffect } from "react"
export default function TestButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle,
  }

  let styleButtonTwo = {
    height: "20px",
    width: "30px",
    fontSize: "1.2rem",
    lineHeight: "5px",
    textAlign: "center",    
    margin: "3px 1px"
  }
  let styleButtonDiv = {
    display: "flex",
    gap: ".2rem",
  }

  let styleLi = {
    padding: "0 0 0 0",
    width: "100px",
    height: "100px",
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
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyle: "none",
    padding: "0px 25px",
    position: "absolute",
    zIndex: "6"
  }

  return (
    <ul style={styleButtonUl}>
        {props.board.map((row, i) => {
          return (
            <li style={{ ...styleLi, top: `${110 * i}` }}>
              <p>row {i + 1}</p>
              <div key={`div2${i}`} style={styleButtonDiv}>
                <button
                  style={styleButtonTwo}
                  key={`fifth${i}`}
                  data-offsetindex={i}
                  data-function={"offset"}
                  value={-1}
                  onClick={props.handleOffset}
                >{"<"}
                </button>

                <button
                  style={styleButtonTwo}
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
                  style={{ ...styleButtonTwo, ...styleGameInProgress }}
                  key={`sixth${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={-1}
                  onClick={props.handleRows}
                >-
                </button>

                <button
                  style={styleButtonTwo}
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
  )
}