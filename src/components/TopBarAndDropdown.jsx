import { useState, useEffect } from "react"
import { TbMenu2, TbX } from "react-icons/tb"
import styles from "../styles/topBarAndDropdowns.module.scss"

/**
 * 
 * @param {{
 * dispatch: function, 
 * gameInProgress: boolean, 
 * tileSize: number,
 * winLength: number
 * }} props 
 */
export default function TopBarAndDropdown(props) {
  const { dispatch, gameInProgress, tileSize, winLength } = props
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    tileSize < 100 ? setHidden(true) : setHidden(false)
  }, [tileSize])

  const collapseButtonStyle = {
    height: `${tileSize * .6}px`,
    width: `${tileSize}px`,
    fontSize: `${tileSize * .5}px`,
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  return (
    <div
      className={
        `${styles.container} `
        + `${!hidden && tileSize < 100 ? styles.containerSmallScreenDropdown : ""} `
        + `${tileSize < 100 ? styles.containerSmallScreen : ""}`}
      style={{
        boxShadow: `${!hidden && tileSize < 100
          ? `${tileSize * 0.02}px ${tileSize * 0.02}px ${tileSize * 0.04}px grey`
          : "0 0 0 0 transparent"}`
      }}>

      {tileSize < 100 && <button
        className={`${styles.collapseButton} ${tileSize > 100 ? "hidden" : ""}`}
        style={collapseButtonStyle}
        onClick={handleHidden}>{
          hidden ? <TbMenu2 className={styles.menuIcon} /> : <TbX className={styles.menuIcon} />
        }</button>}

      {!hidden && <div className={`${styles.dropdownDiv} ${tileSize < 100 ? styles.dropdownAndWinLengthDivSmallScreen : ""}`}>
        <div className={`${styles.winLengthDiv} ${tileSize < 100 ? styles.dropdownAndWinLengthDivSmallScreen : ""}`}>
          <div className={styles.winLengthDivInner}>
            <button
              className={`${styles.button} ${gameInProgress ? "disabled" : ""}`}
              onClick={() => {
                dispatch({ type: "winLength", value: "decrement" })
              }
              }
            >-
            </button>
            <button
              className={`${styles.button} ${gameInProgress ? "disabled" : ""}`}
              onClick={() => dispatch({ type: "winLength", value: "increment" })}
            >+
            </button>
          </div>
          <p className={`${styles.p} ${tileSize < 100 ? styles.pSmallScreen : ""}`}>{winLength} to win</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={`red-button ${styles.resetButton} ${gameInProgress ? "disabled" : ""}`}
            onClick={() => dispatch({ type: "offset", value: "reset" })}
          >reset offset</button>
          <button
            className={`red-button ${styles.resetButton} ${gameInProgress ? "disabled" : ""}`}
            onClick={() => dispatch({ type: "board", value: "reset" })}
          >reset board</button>
          <button
            onClick={() => dispatch({ type: "board", value: "clear" })}
            className={`red-button ${styles.resetButton}`}
          >clear board</button>
        </div>
      </div>}
    </div>
  )
}
