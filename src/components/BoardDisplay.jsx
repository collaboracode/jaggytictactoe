export default function Gameboard(props) {

  const styleCol = {
    height: `${props.tileSize}px`,
    width: `${props.tileSize}px`,
    backgroundColor: "lightGrey",
    textAlign: "center",
    boxShadow: `${props.tileSize * 0.02}px ${props.tileSize * 0.02}px ${props.tileSize * 0.04}px grey`,

  }
  const styleP = {
    pointerEvents: "none",
    position: "relative",
    top: "20%",
    fontSize: `${props.tileSize}px`,
    margin: "0",
    lineHeight: ".5",
  }
  const styleBoardContainer = {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    overflow: "hidden"

  }
  const styleBoard = {
    marginLeft: "auto",
    marginRight: "auto",
  }
  const styleUl = {
    display: "flex",
    gap: "10px",
    listStyle: "none",
    padding: "0",
    position: "relative",
    left: `${(props.tileSize + 10) * props.boardShift}px`,
  }

  return (
    <div style={styleBoardContainer} id="gameboard">
      <div style={styleBoard}>
        {props.board.map((row, i) => {
          return (
            <ul
              id={`row${i}`}
              className="row"
              key={`row${i}`}
              style={{
                ...styleUl,
                marginLeft: `${(props.tileSize + 10) * props.offset[i]}px`,
                // applies margin to the last row of the board
                marginBottom: `${i + 1 === props.board.length ? "8rem" : "0"}`
              }}>
              {row && row.map((col, j) => {
                return (
                  col && <li
                    style={styleCol}
                    onClick={props.handleClick}
                    className="col"
                    key={`second${j}`}
                    data-row={i}
                    data-col={j}>
                    <p key={`third${j}`}
                      style={styleP}
                    >{`${props.board[i][j]}`}</p>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    </div>
  )
}