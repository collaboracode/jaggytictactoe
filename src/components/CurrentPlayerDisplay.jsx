import styles from '../styles/currentPlayerDisplay.module.scss'

/**
 * @param {{
 * curPlayerX: boolean, 
 * playerOne: string|number, 
 * playerTwo: string|number
 * }} props 
 */
export default function CurrentPlayerDisplay(props) {
  const { curPlayerX, playerOne, playerTwo } = props
  return (
    <h2
      className={styles.h2}
    >currently {curPlayerX ? `${playerOne}` : `${playerTwo}`}'s turn
    </h2>
  )
}