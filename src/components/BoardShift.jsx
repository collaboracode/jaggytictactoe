import { useEffect, useCallback } from "react"
import { TbArrowBigRight, TbArrowBigLeft, TbRefresh } from "react-icons/tb"
import styles from '../styles/boardShiftButtons.module.scss'

/**
 * @param {{
 * dispatch: function
 * }} props 
 */
export default function BoardShift(props) {
  const { dispatch } = props
  const handleKeys = useCallback((e) => {
    switch (e.key) {
      case "ArrowLeft":
        dispatch({ type: "boardShift", value: "decrement" })
        break
      case "ArrowRight":
        dispatch({ type: "boardShift", value: "increment" })
        break
      default:
        break
    }
  }, [dispatch])

  useEffect(() => {
    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
    }
  }, [handleKeys])

  return (
    <div className={styles.shiftDiv}>
      <button
        className={styles.shiftButton}
        onClick={() => dispatch({ type: "boardShift", value: "decrement" })}
      ><TbArrowBigLeft className={styles.icon} />
      </button>
      <button
        className={`red-button ${styles.shiftButton}`}
        onClick={() => dispatch({ type: "boardShift", value: "reset" })}
      ><TbRefresh className={styles.icon} />
      </button>
      <button
        className={styles.shiftButton}
        onClick={() => dispatch({ type: "boardShift", value: "increment" })}
      >
        <TbArrowBigRight className={styles.icon} />
      </button>
    </div>
  )
}