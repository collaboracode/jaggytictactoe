export default function Gameboard(props) {

  const style = {
    p: {
      pointerEvents: "none",
      position: "relative",
      top: "20%",
      fontSize: `${props.tileSize}px`,
      margin: "0",
      lineHeight: ".5",
    },
    boardContainer: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      overflow: "hidden"
  
    },
    board: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    ul: {
      display: "flex",
      gap: "10px",
      listStyle: "none",
      padding: "0",
      position: "relative",
      left: `${(props.tileSize + 10) * props.boardShift}px`,
    },
    col: {
      height: `${props.tileSize}px`,
      width: `${props.tileSize}px`,
      backgroundColor: "lightGrey",
      textAlign: "center",
      boxShadow: `${props.tileSize * 0.02}px ${props.tileSize * 0.02}px ${props.tileSize * 0.04}px grey`,
  
    }
  }

  return (
    <div style={style.boardContainer} id="gameboard">
      <div style={style.board}>
        {props.board.map((row, i) => {
          return (
            <ul
              id={`row${i}`}
              className="row"
              key={`row${i}`}
              style={{
                ...style.ul,
                marginLeft: `${(props.tileSize + 10) * props.offset[i]}px`,
                // applies margin to the last row of the board
                marginBottom: `${i + 1 === props.board.length ? "8rem" : "0"}`
              }}>
              {row && row.map((col, j) => {
                return (
                  col && <li
                    style={style.col}
                    onClick={props.handleClick}
                    className="col"
                    key={`second${j}`}
                    data-row={i}
                    data-col={j}>
                    <p key={`third${j}`}
                      style={style.p}
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