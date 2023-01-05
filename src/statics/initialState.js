const initialState = {
  board: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ],
  message: "",
  offset: [0, 0, 0],
  gameover: false,
  curPlayerX: true,
  gameInProgress: false,
  winLength: 3,
  boardShift: 0,
  rightHanded: false,
  tileSize: 100,
  offsetRange: 6,
  playerOne: "X",
  playerTwo: "O"
}

export default {...initialState}