/*1*/const Gameboard = (function(){
  let board = ["", "", "", "", "", "", "", "", ""];
  
   const getBoard = function() {
    return board;};

    const placeMark = function(index, marker) {
    if (board[index] === "") {
  board[index] = marker;}};

  const resetBoard = function() {
  board = ["", "", "", "", "", "", "", "", ""];};
return{getBoard, placeMark,resetBoard};
}) ();

/*2*/function createPlayer(name, marker) {
  return {name,marker};             }


/*3*/const GameController = (function(){
    let player1;
  let player2;
  let activePlayer;
 
/*4*/const switchPlayerTurn = function() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;}};

   

  const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

function checkWinner() {
const board = Gameboard.getBoard();

for(let i=0;i<winningCombos.length;i++){
  const combo = winningCombos[i];
  const a = combo[0];
  const b = combo[1];
  const c = combo[2];

   if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
      return true; // someone won
      }}
  return false; // no winning combo found
}
function playRound(index) {
  Gameboard.placeMark(index, activePlayer.marker);
  if (checkWinner()) {
    alert(`"${activePlayer.marker}" won!`);
    return activePlayer
  } else {
    switchPlayerTurn();
    return null;
  }}

  function startGame(name1,name2){
   player1 = createPlayer(name1, "X");
   player2 = createPlayer(name2, "O");

   activePlayer = player1;
   Gameboard.resetBoard();}

  return{playRound,startGame}; })();
  

const DisplayController = (function() {
  const boardDiv = document.getElementById("gameboard");
  const startBtn = document.getElementById("start-btn");

  const renderBoard = function() {
    boardDiv.innerHTML = ""; // clear out old cells first
    const board = Gameboard.getBoard();
    

    board.forEach(function(cellValue, index) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell"); //for the style in css
      cellDiv.textContent = cellValue; //"", "X", or "O"
      // we still need to add a click listener here
      cellDiv.addEventListener("click", function() {
    const result = GameController.playRound(index);
  
    renderBoard();

    if (result) {
    document.getElementById("result").textContent = 
      `🎉 Congratulations, ${result.name}! 🎉`;}
  });
  
      boardDiv.appendChild(cellDiv);
    });
  };
   startBtn.addEventListener("click", function() {
    const name1 = document.getElementById("player1-name").value;
    const name2 = document.getElementById("player2-name").value;

    GameController.startGame(name1, name2);
    document.getElementById("result").textContent = "";
    renderBoard();
  });

  renderBoard(); // render once immediately so the grid shows up empty at the start
  
   return{};
 
})();
   