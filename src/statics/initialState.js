const initialState = {
  board: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ],
  offset: [0, 0, 0],
  message: "",
  gameover: false,
  curPlayerX: true,
  gameInProgress: false,
  winLength: 3,
  boardShift: 0,
  tileSize: 100,
  playerOne: "X",
  playerTwo: "O"
}

export default initialState