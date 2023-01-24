import styles from '../styles/gameoverModal.module.scss'

/**
 * @param {{
 * dispatch: function, 
 * message: string
 * }} props 
 */
export default function GameOverModal(props) {
  const { dispatch, message, gameover } = props
  return (
    gameover === true &&
    <>
      <div className={styles.modalBackground}>
      </div>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <p className={styles.p}>{message}</p>
          <button
            onClick={() => {
              dispatch({ type: "game", value: "reset" })
            }}
            className={`red-button ${styles.resetAndClearButtons}`}
          >Reset Game</button>
          <button
            onClick={() => {
              dispatch({ type: "board", value: "clear" })
            }}
            className={`red-button ${styles.resetAndClearButtons}`}
          >Clear Board</button>
        </div>
      </div>

    </>
  )
}