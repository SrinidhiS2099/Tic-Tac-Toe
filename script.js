let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "+";
let scores = { '+': 0, O: 0 };
let playerNames = { '+': "Player 1", O: "Player 2" };
let isGameActive = false;

const startGameBtn = document.getElementById("start-game");
const resetBtn = document.getElementById("reset");
const gameBoard = document.getElementById("game-board");
const winnerDisplay = document.getElementById("winner");
const scoreDisplay = document.getElementById("score");

function initializeGame() {
  gameBoard.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "+";
  winnerDisplay.textContent = "";

  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === "") {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
      winnerDisplay.textContent = `${playerNames[currentPlayer]} wins!`;
      scores[currentPlayer]++;
      updateScore();
      endGame();
    } else if (board.every((cell) => cell !== "")) {
      winnerDisplay.textContent = "It's a draw!";
      endGame();
    } else {
      currentPlayer = currentPlayer === "+" ? "O" : "+";
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function updateScore() {
  scoreDisplay.textContent = `${playerNames["+"]}: ${scores["+"]} | ${playerNames["O"]}: ${scores["O"]}`;
}

function endGame() {
  isGameActive = false;
  resetBtn.classList.remove("hidden");
}

startGameBtn.addEventListener("click", () => {
  const player1 = document.getElementById("player1").value || "Player 1";
  const player2 = document.getElementById("player2").value || "Player 2";

  playerNames["+"] = player1;
  playerNames["O"] = player2;

  updateScore();
  initializeGame();
  isGameActive = true;
  resetBtn.classList.add("hidden");
});

resetBtn.addEventListener("click", () => {
  initializeGame();
  resetBtn.classList.add("hidden");
});
