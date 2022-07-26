export default function Gameboard(props) {

  const style = {
    p: {
      pointerEvents: "none",
      position: "relative",
      top: "20%",
      fontSize: `${props.state.tileSize}px`,
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
      left: `${(props.state.tileSize + 10) * props.state.boardShift}px`,
    },
    col: {
      height: `${props.state.tileSize}px`,
      width: `${props.state.tileSize}px`,
      backgroundColor: "lightGrey",
      textAlign: "center",
      boxShadow: `${props.state.tileSize * 0.02}px ${props.state.tileSize * 0.02}px ${props.state.tileSize * 0.04}px grey`,

    }
  }

  const handleClick = (e) => {
    let stateMutatorVariable = [...props.state.board]
    let row = e.target.dataset.row
    let col = e.target.dataset.col
    if (props.state.gameover === false
      && props.state.board[row][col] === " ") {
      stateMutatorVariable[row][col] = props.state.curPlayerX
        ? props.state.playerOne
        : props.state.playerTwo
      props.dispatch({ type: "board", value: [...stateMutatorVariable] })
      props.dispatch({ type: "curPlayerX", value: !props.state.curPlayerX })
      props.dispatch({ type: "gameInProgress", value: true })
    }
  }

  return (
    <div style={style.boardContainer} id="gameboard">
      <div style={style.board}>
        {props.state.board.map((row, i) => {
          return (
            <ul
              id={`row${i}`}
              className="row"
              key={`row${i}`}
              style={{
                ...style.ul,
                marginLeft: `${(props.state.tileSize + 10) * props.state.offset[i]}px`,
                // applies margin to the last row of the board
                marginBottom: `${i + 1 === props.state.board.length ? "8rem" : "0"}`
              }}>
              {row && row.map((col, j) => {
                return (
                  col && <li
                    style={style.col}
                    onClick={handleClick}
                    className="col"
                    key={`second${j}`}
                    data-row={i}
                    data-col={j}>
                    <p key={`third${j}`}
                      style={style.p}
                    >{`${props.state.board[i][j]}`}</p>
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