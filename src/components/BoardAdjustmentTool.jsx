
export default function BoardAdjustmentTool(props) {

  let styleUl = {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "0",
    padding: "0",

  }
  let styleLi = {
    backgroundColor: "#bbb",
    padding: "0 0 1rem 0",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.14)",
    border: "1px solid black",
    maxWidth: "200px",
    margin: "1rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: 'center'
  }
  let styleButtonTwo = {
    height: "30px",
    width: "50px",
    fontSize: "1.5rem",
    textAlign: "center",
    verticalAlign: "bottom"
  }


  let styleRowVals = {

    textAlign: "center",
    lineHeight: ".5rem",
  }
  let styleRowValsContainer = {
    marginTop: "0",
    marginBottom: "0",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#ddd",

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
    margin: "-3rem 0",
    padding: "0",
    height: "100px",
  }
  let styleButtonDiv = {
    display: "flex",
    gap: ".5rem"
  }

  return (
    <>
      <div>
        <div style={styleButtonContainer}>
          <button style={styleButton} onClick={props.handleRows} data-function={"row"} value={"-1"}>remove row</button>
          <button style={styleButton} onClick={props.handleRows} data-function={"row"} value={"1"}>add row</button>
        </div>
        <ul style={styleUl}>
          {props.board && props.board.map((row, i) => {
            return (
              <>
                <li
                  key={`second${i}`}
                  style={styleLi}>
                    <div style={styleRowValsContainer}>

                  <h3 key={`meh${i}`}style={styleRowVals}>row: {i + 1}</h3>
                  <p style={styleRowVals} key={`${i}`}>length: {props?.board?.[i]?.length}</p>
                  <p style={styleRowVals}>offset: {props.offset[i]}</p>
                    </div>
                  <div style={styleButtonDiv}>
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
                  </div>
                  <div style={styleButtonDiv}>
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
                    >+
                    </button>
                  </div>
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </>

  )
}