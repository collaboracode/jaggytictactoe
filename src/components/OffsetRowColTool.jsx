import React, { useState } from "react"
export default function OffsetTool(props) {
  const [resetButtonColor, setResetButtonColor] = useState("white")
  const [resetButtonBackgroundColor, setResetButtonBackgroundColor] = useState("red")
  let styleUl = {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent:"center",
    margin: "0",
    padding: "0",
    
  }
  let styleLi = {
    
    maxWidth: "200px",
    margin: "1rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent:'center'
  }
  let styleButtonTwo = {
    height: "40px",
    width: "75px",
    fontSize: "2rem",
  }
  let styleButton = {
    height: "40px",
    width: "75px",
    fontSize: "1rem",
  }
  let styleButtonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "0",
    padding: "0",
    height: "100px",
  }
  let styleResetButton = {
    height: "40px",
    width: "50px",
    margin: "0",
    padding: "0",
    backgroundColor: `${resetButtonBackgroundColor}`,
    color: `${resetButtonColor}`,
  }
  let styleOffsetValue = {
    marginTop: "0",
    marginBottom: "0",
    width: "100%",
    textAlign: "center"
  }
  const handleMouseEnterStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("darkRed")
        break
    }
  }
  const handleMouseLeaveStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("red")
        break
    }
  }
  const handleMouseClickStyle = (e) => {
    switch (e.target.dataset.element_type) {
      case "resetButton":
        setResetButtonBackgroundColor("red")
        const timer = setTimeout(() => {
          setResetButtonBackgroundColor("darkRed")
        }, 50);
        break
    }
  }

  return (
    <>
      <div >
        <ul style={styleUl}>
          {props.board && props.board.map((row, i) => {
            return (
              <>
                <li
                  key={`second${i}`}
                  style={styleLi}>
                  <h2 style={styleOffsetValue} key={`${i}`}>row{i + 1}: length { props?.board?.[i]?.length}</h2>
                  <h3 style={styleOffsetValue}>offset value {props.offset[i]}</h3>
                  <button
                    style={styleButtonTwo}
                    key={`fifth${i}`}
                    data-offsetindex={i}
                    data-function={"offset"}
                    value={-1}
                    onClick={props.handleOffset}
                  >{"<"}</button>

                  <button
                    style={styleButtonTwo}
                    key={`third${i}`}
                    data-offsetindex={i}
                    data-function={"offset"}
                    value={1}
                    onClick={props.handleOffset}
                  >{">"}</button>


                  <button
                    style={styleButtonTwo}
                    key={`sixth${i}`}
                    data-row={i}
                    data-function={"col"}
                    value={-1}
                    onClick={props.handleRows}
                  >-</button>

                  <button
                    style={styleButtonTwo}
                    key={`fourth ${i}`}
                    data-row={i}
                    data-function={"col"}
                    value={1}
                    onClick={props.handleRows}
                  >+</button>

                </li>
              </>
            )
          })}
        </ul>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem"
      }}>

        <button
          style={styleResetButton}
          onClick={(e) => {
            props.handleOffset(e)
            handleMouseClickStyle(e)
          }}
          data-element_type={"resetButton"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
          value={"reset"}
        >reset offset</button>
      </div>
      <div style={styleButtonContainer}>
        <button style={styleButton} onClick={props.handleRows} data-function={"row"} value={"1"}>add row</button>
        <button
          onClick={props.handleRows}
          data-function={"row"}
          value={"reset"}
          style={styleResetButton}
          data-element_type={"resetButton"}
          onMouseEnter={handleMouseEnterStyle}
          onMouseLeave={handleMouseLeaveStyle}
        >reset board</button>
        <button style={styleButton} onClick={props.handleRows} data-function={"row"} value={"-1"}>remove row</button>
      </div>

    </>
  )
}