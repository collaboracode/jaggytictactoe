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
      overflow: "hidden",

    },
    board: {
      marginTop: 20,
      marginBottom: 20,
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
      position: 'relative'

    },
    controls: {
      moveLeft: {
        position: 'absolute',
        left: '-45%',
        top: '8%',
        height: '40%',
        width: '40%',
      },
      moveRight: {
        position: 'absolute',
        right: '-45%',
        top: '8%',
        height: '40%',
        width: '40%',
      },
      addUp: {
        position: 'absolute',
        left: 0,
        // right: 'auto',
        left: '10%',
        width: '80%',
        top: -25,
      },
      addDown: {
        position: 'absolute',
        right: '10%',
        width: '80%',
        bottom: -25,
      },
      addLeft: {
        position: 'absolute',
        left: '-45%',
        bottom: '8%',
        height: '40%',
        width: '40%'
      },
      addRight: {
        position: 'absolute',
        right: '-45%',
        bottom: '8%',
        height: '40%',
        width: '40%'
      },
      removeLeft: {
        position: 'absolute',
        left: 0,
        bottom: 0,
      },
      removeRight: {
        position: 'absolute',
        right: 0,
        bottom: 0,
      },

    },
    invisible: {
      opacity: 0,
      pointerEvents: "none"
    },
    none: {}
  }

  const handleClick = (e) => {
    let stateMutatorVariable = [...props.state.board]
    let row = e.target.dataset.row
    let col = e.target.dataset.col
    if (props?.state?.gameover === false
      && props?.state?.board?.[row]?.[col] === " ") {
      stateMutatorVariable[row][col] = props.state.curPlayerX
        ? props.state.playerOne
        : props.state.playerTwo
      props.dispatch({ type: "board", value: [...stateMutatorVariable] })
      props.dispatch({ type: "curPlayerX", value: !props.state.curPlayerX })
      props.dispatch({ type: "gameInProgress", value: true })
    }
  }
  const showControls = (row, col) => {
    return {
      moveLeft: col === 0,
      moveRight: col === props.state.board[row].length - 1,
      addLeft: props.state.board?.[row]?.[col - 1] === undefined
        && props.state.board?.[row]?.[col] !== "blank"
        || props.state.board?.[row]?.[col - 1] === "blank"
        && props.state.board?.[row]?.[col] !== "blank"
        || col === 0
        && props.state.board?.[row]?.[col] !== "blank",

      addRight: props.state.board?.[row]?.[col + 1] === "blank"
        && props.state.board?.[row]?.[col] !== "blank"
        || props.state.board?.[row]?.[col + 1] === undefined
        && props.state.board?.[row]?.[col] !== "blank"
        || col === props.state.board?.[row].length - 1
        && props.state.board?.[row]?.[col] !== "blank",

      addUp: props.state.board?.[row - 1]?.[col + props.state.offset[row] - props.state.offset[row - 1]] === undefined
        // && board[row][col + offset[row]] !== "blank"
        && props.state.board?.[row]?.[col] !== "blank"
        || props.state.board?.[row - 1]?.[col + props.state.offset[row] - props.state.offset[row - 1]] === "blank"
        && props.state.board[row][col + props.state.offset[row] - props.state.offset[- 1]] !== "blank"
        && props.state.board?.[row]?.[col] !== "blank",

      addDown: props.state.board?.[row + 1]?.[col + props.state.offset[row] - props.state.offset[row + 1]] === undefined
        && props.state.board?.[row]?.[col] !== "blank"
        || props.state.board?.[row + 1]?.[col + props.state.offset[row] - props.state.offset[row + 1]] === "blank"
        && props.state.board?.[row]?.[col] !== "blank",

      removeLeft: col === 0 && props.state.board?.[row]?.[col] !== "blank",
      removeRight: col === props.state.board[row].length - 1 && props.state.board?.[row]?.[col] !== "blank",
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
                marginblankottom: `${i + 1 === props.state.board.length ? "8rem" : "0"}`
              }}>
              {row && row.map((col, j) => {
                return (
                  col && <li
                    style={{ ...style.col, ...{ opacity: props.state.board[i][j] === 'blank' ? 0 : 1, pointerEvents: props.state.board[i][j] === 'blank' ? 'none' : 'all' } }}
                    onClick={handleClick}
                    className="col"
                    key={`second${j}`}
                    data-row={i}
                    data-col={j}>
                    <p key={`third${j}`}
                      style={style.p}
                    >{`${props.state.board[i][j]}`}</p>
                    <button
                      style={{ ...style.controls.moveLeft, ...{ display: `${showControls(i, j).moveLeft === true ? '' : 'none'}` } }}
                      className={'btn-hover'}
                      onClick={() => {
                        props.dispatch({ type: "offset", value: "decrement", offsetIndex: i, row: i, col: j })
                      }}
                    >{"<"}
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.moveRight, ...{ display: `${showControls(i, j).moveRight === true ? '' : 'none'}` } }}
                      onClick={() => {
                        props.dispatch({ type: "offset", value: "increment", offsetIndex: i, row: i, col: j })
                      }}
                    >{">"}
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.removeLeft, ...{ display: `${showControls(i, j).removeLeft === true ? '' : 'none'}` } }}
                      data-row={i}
                      // data-function={"col"}
                      value={-1}
                      onClick={() => {
                        props.dispatch({ type: "col", value: "decrement", row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >-
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.removeRight, ...{ display: `${showControls(i, j).removeRight === true ? '' : 'none'}` } }}
                      data-row={i}
                      // data-function={"col"}
                      // value={-1}
                      onClick={() => {
                        props.dispatch({ type: "col", value: "decrement", row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >-
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.addLeft, ...{ display: `${showControls(i, j).addLeft === true ? '' : 'none'}` } }}
                      data-row={i}
                      // data-function={"col"}
                      // value={1}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'left', row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >+
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.addRight, ...{ display: `${showControls(i, j).addRight === true ? '' : 'none'}` } }}
                      data-row={i}
                      // data-function={"col"}
                      // value={1}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'right', row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >+
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.addUp, ...{ display: `${showControls(i, j).addUp === true ? '' : 'none'}` } }}
                      data-row={i}
                      // data-function={"col"}
                      // value={1}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'up', row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >+
                    </button>
                    <button
                      className={'btn-hover'}
                      style={{ ...style.controls.addDown, ...{ display: `${showControls(i, j).addDown === true ? '' : 'none'}` } }}
                      // data-row={i}
                      // data-function={"col"}
                      // value={1}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'down', row: i, col: j })
                      }}
                    // onClick={props.handleRows}
                    >+
                    </button>
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