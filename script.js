const board = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resetButton = document.getElementById('reset');
const winnerPopup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Switch between screens
function switchScreen(screenToShow) {
    startScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    screenToShow.classList.add('active');
}

// Start the game
startGameButton.addEventListener('click', () => {
    switchScreen(gameScreen);
});

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showPopup(currentPlayer);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function showPopup(winner) {
    winnerMessage.innerHTML = `Player ${winner} has won!`;
    winnerPopup.classList.add('active');
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    board.forEach(cell => cell.innerHTML = "");
    winnerPopup.classList.remove('active');
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
