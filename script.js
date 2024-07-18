// Declare the constants
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let aiPlayer = 'O';

// Function for player moves
function makeMove(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === aiPlayer) {
      makeAIMove();
    }
  }
}

// Function for AI moves
function makeAIMove() {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = aiPlayer;
      let score = minimax(gameBoard, 0, false);
      gameBoard[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  gameBoard[bestMove] = aiPlayer;
  document.querySelectorAll('.cell')[bestMove].textContent = aiPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Minimax function
function minimax(board, depth, isMaximizing) {
  if (checkWinner() !== null) {
    if (checkWinner() === aiPlayer) {
      return 10 - depth;
    } else if (checkWinner() === 'X') {
      return depth - 10;
    } else {
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) {
    return 'draw';
  }

  return null;
}

// Function to display the result
function displayResult(result) {
  gameActive = false;
  document.getElementById('result').textContent = result;
}

// Function to reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('result').textContent = '';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}