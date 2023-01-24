import { TbArrowBigRight, TbArrowBigLeft, TbPlus, TbWreckingBall } from "react-icons/tb"
import styles from '../styles/board.module.scss'

/**
* @param {{
* board: string[][],
* offset: number[],
* tileSize: number,
* boardShift: number,
* dispatch: function
* }} props
*/
export default function Gameboard(props) {
  const { board, offset, boardShift, tileSize, dispatch } = props
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {board?.map((row, i) => {
          return (
            <Row key={i} board={board} offset={offset} tileSize={tileSize} boardShift={boardShift} dispatch={dispatch} row={row} rowNumber={i} />
          )
        })}
      </div>
    </div >
  )
}

/**
* @param {{
* board: string[][],
* offset: number[]
* tileSize: number
* boardShift: number,
* dispatch: function,
* row: string[],
* rowNumber: number}} props
*/
function Row(props) {
  const { board, offset, tileSize, boardShift, dispatch, row, rowNumber } = props
  return (
    <>
      <ul
        className={styles.row}
        style={{
          marginLeft: `${(tileSize + 10) * offset[rowNumber]}px`,
          left: `${(tileSize + 10) * boardShift}px`,
          // applies margin to the last row of the board
          marginBottom: `${rowNumber + 1 === board.length ? "8rem" : "0"}`
        }}>
        {row?.map((col, j) => {
          return <Col key={j} board={board} offset={offset} tileSize={tileSize} dispatch={dispatch} rowNumber={rowNumber} colNumber={j} />
        })}
      </ul>
    </>
  )
}

/**
* @param {{
* board: string[][],
* offset: number[]
* tileSize: number
* dispatch: function,
* row: string[],
* rowNumber: number,
* colNumber: number}} props
*/
function Col(props) {
  const { board, offset, tileSize, dispatch, rowNumber, colNumber } = props
  return (
    <>
      <li
        className={`${styles.col} ${board[rowNumber][colNumber] === "blank" ? styles.blank : ""}`}
        style={{ // todo refactor this out
          height: `${tileSize}px`,
          width: `${tileSize}px`,
          boxShadow: `${tileSize * 0.02}px ${tileSize * 0.02}px ${tileSize * 0.04}px grey`
        }}
      >
        {board?.[rowNumber]?.[colNumber] !== "blank" && <button
          className={styles.playSpace}
          style={{ fontSize: `${tileSize}px` }}
          onClick={() => {
            dispatch({ type: "board", value: "play", row: rowNumber, col: colNumber })
          }}
        >{`${board[rowNumber][colNumber]}`}</button>}
        <Controls board={board} offset={offset} tileSize={tileSize} dispatch={dispatch} rowNumber={rowNumber} colNumber={colNumber} />
      </li>
    </>
  )
}

/**
 * @param {string[][]} board 2d array of strings
 * @param {number[]} offset 1d array of numbers
 * @param {number} row position Y
 * @param {number} col position X
 */
function showControls(board, offset, row, col) {
  if (!board || !offset || row === undefined || col === undefined) return <></>
  return {
    moveLeft: board?.[row]?.[col] !== "blank"
      && (col === 0
        || (
          board[row].slice(0, col).filter(item => item !== 'blank').length === 0
          && board?.[row]?.[col] !== "blank"
        ))
    ,
    moveRight: board?.[row]?.[col] !== "blank"
      && (col === board[row].length - 1
        || (
          board[row].slice(col + 1).filter(item => item !== 'blank').length === 0
          && board?.[row]?.[col] !== "blank"
        ))
    ,
    addLeft: (
      board?.[row]?.[col] !== "blank"
      && (
        (
          board?.[row]?.[col - 1] === undefined
          || board?.[row]?.[col - 1] === 'blank'
        )
        || (
          board[row].slice(0, col).filter(item => item !== 'blank').length === 0
        )
      )
    ),
    addRight: (
      board?.[row]?.[col] !== "blank"
    )
      && (
        (
          board?.[row]?.[col + 1] === undefined
          || board?.[row]?.[col + 1] === 'blank'
        )
        || (
          board[row].slice(col + 1).filter(item => item !== 'blank').length === 0
        )
      ),

    addUp: (
      board?.[row]?.[col] !== "blank"
    )
      && ( //* target above is undefined or blank
        board?.[row - 1]?.[col + offset[row] - offset[row - 1]] === undefined
        || board?.[row - 1]?.[col + offset[row] - offset[row - 1]] === "blank"
      )
      && ( //* the left side of the target above is undefined or blank
        board?.[row - 1]?.[(col - 1) + offset[row] - offset[row - 1]] === undefined
        || board?.[row - 1]?.[(col - 1) + offset[row] - offset[row - 1]] === "blank"
      )
      && ( //* the right side of the target above is undefined or blank
        board?.[row - 1]?.[(col + 1) + offset[row] - offset[row - 1]] === undefined
        || board?.[row - 1]?.[(col + 1) + offset[row] - offset[row - 1]] === "blank"
      ),

    addDown: ( //* target below is undefined or blank
      board?.[row + 1]?.[col + offset[row] - offset[row + 1]] === undefined
      || board?.[row + 1]?.[col + offset[row] - offset[row + 1]] === "blank"
    )
      && board?.[row]?.[col] !== "blank"
      && ( //* the left side of the target below is undefined or blank
        board?.[row + 1]?.[(col - 1) + offset[row] - offset[row + 1]] === undefined
        || board?.[row + 1]?.[(col - 1) + offset[row] - offset[row + 1]] === "blank"
      )
      && ( //* the right side of the target below is undefined or blank
        board?.[row + 1]?.[(col + 1) + offset[row] - offset[row + 1]] === undefined
        || board?.[row + 1]?.[(col + 1) + offset[row] - offset[row + 1]] === "blank"
      )
      && ( //* the space below the target below is undefined or blank
        board?.[row + 2]?.[(col) + offset[row] - offset[row + 2]] === undefined
        || board?.[row + 2]?.[(col) + offset[row] - offset[row + 2]] === "blank"
      ),

    removeCol: board?.[row]?.[col] !== "blank"
  }
}

/**
 * @param {{
 * board: string[][],
 * offset: number[]
 * tileSize: number
 * dispatch: function, 
 * rowNumber: number, 
 * colNumber: number}} props
 */
function Controls(props) {
  const { board, offset, tileSize, dispatch, rowNumber, colNumber } = props

  const style = {
    icon: {
      fontSize: `${tileSize / 3}px`
    },
    smallIcon: {
      fontSize: `${tileSize / 6}px`
    }
  }
  return (
    <>
      {showControls(board, offset, rowNumber, colNumber).moveLeft && <button
        className={`btn-hover ${styles.moveLeft}`}
        onClick={() => {
          dispatch({ type: "offset", value: "decrement", row: rowNumber, col: colNumber })
        }}
      ><TbArrowBigLeft style={style.icon} />
      </button>}

      {showControls(board, offset, rowNumber, colNumber).moveRight && <button
        className={`btn-hover ${styles.moveRight}`}
        onClick={() => {
          dispatch({ type: "offset", value: "increment", row: rowNumber, col: colNumber })
        }}
      ><TbArrowBigRight style={style.icon} />
      </button>}

      {showControls(board, offset, rowNumber, colNumber).removeCol && <button
        className={`remover ${styles.removeCol}`}
        onClick={() => {
          dispatch({ type: "remove", row: rowNumber, col: colNumber })
        }}
      ><TbWreckingBall style={style.smallIcon} />
      </button>}

      {showControls(board, offset, rowNumber, colNumber).addLeft && (
        !(board[rowNumber][colNumber - 2] && !showControls(rowNumber, colNumber - 2).addRight)
        ||
        (
          board[rowNumber][colNumber - 2] === undefined
          || board[rowNumber][colNumber - 2] === 'blank'
        ))
        && <button
          className={`btn-hover ${(
            !showControls(board, offset, rowNumber, colNumber).moveLeft
          )
            ? styles.addLeftFullBlock
            : styles.addLeftFullBar
            }`}
          onClick={() => {
            dispatch({ type: "add", value: "increment", direction: 'left', row: rowNumber, col: colNumber })
          }}
        ><TbPlus style={style.icon} />
        </button>}

      {showControls(board, offset, rowNumber, colNumber).addRight && <button
        className={`btn-hover ${(
          !showControls(board, offset, rowNumber, colNumber).moveRight
        )
          ? styles.addRightFullBlock
          : styles.addRightFullBar
          }`}
        onClick={() => {
          dispatch({ type: "add", value: "increment", direction: 'right', row: rowNumber, col: colNumber })
        }}
      ><TbPlus style={style.icon} />
      </button>}

      {showControls(board, offset, rowNumber, colNumber).addUp && <button
        className={`btn-hover ${styles.addUpFullBlock}`}
        onClick={() => {
          dispatch({ type: "add", value: "increment", direction: 'up', row: rowNumber, col: colNumber })
        }}
      ><TbPlus style={style.icon} />
      </button>}

      {showControls(board, offset, rowNumber, colNumber).addDown && <button
        className={`btn-hover ${styles.addDownFullBlock}`}
        onClick={() => {
          dispatch({ type: "add", value: "increment", direction: 'down', row: rowNumber, col: colNumber })
        }}
      ><TbPlus style={style.icon} />
      </button>}
    </>
  )
}