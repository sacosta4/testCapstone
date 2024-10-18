function generateSudoku() {
    const size = 9;
    const board = Array.from({ length: size }, () => Array(size).fill(0));
  
    // Function to check if a value is valid to be placed in the board
    function isValid(board, row, col, num) {
      // Check the row
      for (let i = 0; i < size; i++) {
        if (board[row][i] === num) {
          return false;
        }
      }
  
      // Check the column
      for (let i = 0; i < size; i++) {
        if (board[i][col] === num) {
          return false;
        }
      }
  
      // Check the 3x3 subgrid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === num) {
            return false;
          }
        }
      }
  
      return true;
    }
  
    // Function to solve the board using backtracking
    function solve(board) {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= size; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
  
                if (solve(board)) {
                  return true;
                }
  
                board[row][col] = 0;
              }
            }
  
            return false;
          }
        }
      }
  
      return true;
    }
  
    // Fill the board with a solution
    solve(board);
  
    // Remove random elements to create a puzzle
    const emptyCells = Math.floor(Math.random() * 30) + 20; // Adjust the number of empty cells as desired
    for (let i = 0; i < emptyCells; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      board[row][col] = 0;
    }
  
    return board;
  }
  
  // Generate and display a random Sudoku board
  const sudokuBoard = generateSudoku();
  console.log("Random Sudoku Board:");
  console.log(sudokuBoard.map(row => row.join(' ')).join('\n'));
  