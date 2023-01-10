import { TbArrowBigRight, TbArrowBigLeft, TbPlus, TbWreckingBall } from "react-icons/tb"
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
      marginTop: '7rem',
      marginBottom: '10rem',
    },
    board: {
      marginTop: '10rem',
      marginBottom: '10rem',
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
      button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      moveLeft: {
        position: 'absolute',
        left: '-100%',
        top: '8%',
        height: '40%',
        width: '80%',
      },
      moveRight: {
        position: 'absolute',
        right: '-100%',
        top: '8%',
        height: '40%',
        width: '80%',
      },
      addUp: {
        position: 'absolute',
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
        left: '-50%',
        bottom: '8%',
        height: '40%',
        width: '40%'
      },
      addRight: {
        position: 'absolute',
        right: '-50%',
        bottom: '8%',
        height: '40%',
        width: '40%'
      },
      // removeLeft: {
      //   position: 'absolute',
      //   left: 0,
      //   bottom: 0,
      // },
      removeCol: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '0px 2px'
      },
      addLeftFullBar: {
        position: 'absolute',
        left: '-100%',
        bottom: '8%',
        height: '40%',
        width: '80%'
      },
      addRightFullBar: {
        position: 'absolute',
        right: '-100%',
        bottom: '8%',
        height: '40%',
        width: '80%'
      },
      addLeftFullBlock: {
        position: 'absolute',
        left: '-100%',
        bottom: '8%',
        height: '80%',
        width: '80%'
      },
      addRightFullBlock: {
        position: 'absolute',
        right: '-100%',
        bottom: '8%',
        height: '80%',
        width: '80%'
      },
      addFullBlockUp: {
        zIndex: 1,

        position: 'absolute',
        right: '10%',
        width: '80%',
        height: '80%',
        top: '-105%',
      },
      addFullBlockDown: {
        zIndex: 2,
        position: 'absolute',
        right: '10%',
        width: '80%',
        height: '80%',
        bottom: '-105%',
      },
    },

    icon: {
      fontSize: `${props.state.tileSize / 3}px`
    },
    smallIcon: {
      fontSize: `${props.state.tileSize / 6}px`
    }
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
      moveLeft: props.state.board?.[row]?.[col] !== "blank"
        && (col === 0
          || (
            props.state.board[row].slice(0, col).filter(item => item !== 'blank').length === 0
            && props.state.board?.[row]?.[col] !== "blank"
          ))
      ,
      moveRight: props.state.board?.[row]?.[col] !== "blank"
        && (col === props?.state?.board?.[row].length - 1
          || (
            props.state.board[row].slice(col + 1).filter(item => item !== 'blank').length === 0
            && props.state.board?.[row]?.[col] !== "blank"
          ))
      ,
      addLeft: (
        // props?.state?.board?.[row]?.[col - 1] === undefined
        // && props.state.board?.[row]?.[col] !== "blank")
        // || (props?.state?.board?.[row]?.[col - 1] === "blank"
        //   && props?.state?.board?.[row]?.[col] !== "blank")
        // || (col === 0
        //   && props.state.board?.[row]?.[col] !== "blank")


        props.state.board?.[row]?.[col] !== "blank"

        && (
          (
            props.state.board?.[row]?.[col - 1] === undefined
            || props.state.board?.[row]?.[col - 1] === 'blank'
          )
          || (
            props.state.board[row].slice(0, col).filter(item => item !== 'blank').length === 0
          )
        )
      )
      ,

      addRight: (
        props.state.board?.[row]?.[col] !== "blank"
      )
        && (
          (
            props.state.board?.[row]?.[col + 1] === undefined
            || props.state.board?.[row]?.[col + 1] === 'blank'
          )
          || (
            props.state.board[row].slice(col + 1).filter(item => item !== 'blank').length === 0
          )
        ),

      addUp: (
        props.state.board?.[row]?.[col] !== "blank"
      )
        && (
          props.state.board?.[row - 1]?.[col + props.state.offset[row] - props.state.offset[row - 1]] === undefined
          || props.state.board?.[row - 1]?.[col + props.state.offset[row] - props.state.offset[row - 1]] === "blank"
        )
        && (
          props.state.board?.[row - 1]?.[(col - 1) + props.state.offset[row] - props.state.offset[row - 1]] === undefined
          || props.state.board?.[row - 1]?.[(col - 1) + props.state.offset[row] - props.state.offset[row - 1]] === "blank"
        )
        && (
          props.state.board?.[row - 1]?.[(col + 1) + props.state.offset[row] - props.state.offset[row - 1]] === undefined
          || props.state.board?.[row - 1]?.[(col + 1) + props.state.offset[row] - props.state.offset[row - 1]] === "blank"
        ),

      addDown: (
        props.state.board?.[row + 1]?.[col + props.state.offset[row] - props.state.offset[row + 1]] === undefined
        || props.state.board?.[row + 1]?.[col + props.state.offset[row] - props.state.offset[row + 1]] === "blank"
      )
        && props.state.board?.[row]?.[col] !== "blank"
        && (
          props.state.board?.[row + 1]?.[(col - 1) + props.state.offset[row] - props.state.offset[row + 1]] === undefined
          || props.state.board?.[row + 1]?.[(col - 1) + props.state.offset[row] - props.state.offset[row + 1]] === "blank"
        )
        && (
          props.state.board?.[row + 1]?.[(col + 1) + props.state.offset[row] - props.state.offset[row + 1]] === undefined
          || props.state.board?.[row + 1]?.[(col + 1) + props.state.offset[row] - props.state.offset[row + 1]] === "blank"
        )
        && (
          props.state.board?.[row + 2]?.[(col) + props.state.offset[row] - props.state.offset[row + 2]] === undefined
          || props.state.board?.[row + 2]?.[(col) + props.state.offset[row] - props.state.offset[row + 2]] === "blank"
        ),

      removeCol: props.state.board?.[row]?.[col] !== "blank"
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
                    {showControls(i, j).moveLeft && <button
                      style={{ ...style.controls.moveLeft }}
                      className={'btn-hover'}
                      onClick={() => {
                        props.dispatch({ type: "offset", value: "decrement", offsetIndex: i, row: i, col: j })
                      }}
                    ><TbArrowBigLeft style={style.icon} />
                      {/* {"<"} */}
                    </button>}
                    {showControls(i, j).moveRight && <button
                      className={'btn-hover'}
                      style={{ ...style.controls.moveRight }}
                      onClick={() => {
                        props.dispatch({ type: "offset", value: "increment", offsetIndex: i, row: i, col: j })
                      }}
                    ><TbArrowBigRight style={style.icon} />
                      {/* {">"} */}
                    </button>}
                    {showControls(i, j).removeCol && <button
                      className={'remover'}
                      style={{ ...style.controls.removeCol }}
                      data-row={i}
                      onClick={() => {
                        props.dispatch({ type: "remove", row: i, col: j })
                      }}
                    ><TbWreckingBall style={style.smallIcon} />
                    </button>}
                    {showControls(i, j).addLeft && (
                      !(props.state.board[i][j - 2] && showControls(i, j - 2).addRight)
                      ||
                      (
                        props.state.board[i][j - 2] === undefined
                        || props.state.board[i][j - 2] === 'blank'
                      )
                    ) && <button
                      className={'btn-hover'}
                      style={{
                        // todo work on this type of logic to get bottons working nicely
                        ...(
                          showControls(i, j).addLeft
                          && !showControls(i, j).moveLeft
                          && (row[j - 2] === 'blank' || showControls(i, j - 2).addRight)
                        )
                          ? style.controls.addLeftFullBlock
                          : style.controls.addLeftFullBar
                      }}
                      data-row={i}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'left', row: i, col: j })
                      }}
                    ><TbPlus style={style.icon} />
                      </button>}
                    {showControls(i, j).addRight && <button
                      className={'btn-hover'}
                      style={{
                        ...(
                          showControls(i, j).addRight
                          && !showControls(i, j).moveRight
                          && (row[j + 2] === 'blank' || showControls(i, j + 2).addLeft)
                        )
                          ? style.controls.addRightFullBlock
                          : style.controls.addRightFullBar,
                      }}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'right', row: i, col: j })
                      }}
                    ><TbPlus style={style.icon} />
                    </button>}
                    {showControls(i, j).addUp && <button
                      className={'btn-hover'}
                      style={{ ...style.controls.addFullBlockUp, ...{ display: `${showControls(i, j).addUp === true ? '' : 'none'}` } }}
                      data-row={i}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'up', row: i, col: j })
                      }}
                    ><TbPlus style={style.icon} />
                    </button>}
                    {showControls(i, j).addDown && <button
                      className={'btn-hover'}
                      style={{
                        ...style.controls.addFullBlockDown
                      }}
                      onClick={() => {
                        props.dispatch({ type: "add", value: "increment", direction: 'down', row: i, col: j })
                      }}
                    ><TbPlus style={style.icon} />
                    </button>}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    </div >
  )
}