import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicTacToe.css'; // Import your CSS file or add styles directly here

const TicTacToe = ({ quboCode, log }) => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [difficulty, setDifficulty] = useState('Easy'); // Add difficulty state

  // Load the saved game state when the component mounts
  useEffect(() => {
    const savedState = loadGame();
    if (savedState) {
      setCells(savedState.cells);
      setCurrentPlayer(savedState.currentPlayer);
      log('> Game loaded from saved state\n\n');
    }
  }, []);

  useEffect(() => {
    if (currentPlayer === 'O') {
      if (difficulty === 'Easy') {
        makeEasyMove();
      } else if (difficulty === 'Medium') {
        makeMediumMove();
      } else {
        makeHardMove();
      }
    }
  }, [currentPlayer, cells, difficulty]);

  const handleCellClick = (index) => {
    if (!cells[index]) {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      log(`> Placed ${currentPlayer} at cell ${index}\n\n`);

      if (checkWinner(newCells)) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
      } else if (checkDraw(newCells)) {
        alert("It's a draw!");
        resetBoard();
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }

      saveGame({ cells: newCells, currentPlayer: currentPlayer === 'X' ? 'O' : 'X' });
    }
  };

  const makeEasyMove = () => {
    // Random move for easy difficulty
    const emptyCells = cells.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleCellClick(randomIndex);
  };

  const makeMediumMove = () => {
    // Check for a winning move for AI
    for (let i = 0; i < 9; i++) {
      if (cells[i] === '') {
        const newCells = [...cells];
        newCells[i] = 'O'; // AI's move
        if (checkWinner(newCells)) {
          handleCellClick(i); // Make winning move
          return;
        }
      }
    }

    // Block opponent's winning move
    for (let i = 0; i < 9; i++) {
      if (cells[i] === '') {
        const newCells = [...cells];
        newCells[i] = 'X'; // Opponent's move
        if (checkWinner(newCells)) {
          handleCellClick(i); // Block opponent's winning move
          return;
        }
      }
    }

    // Choose center if available
    if (cells[4] === '') {
      handleCellClick(4);
      return;
    }

    // Check for two corners occupied by opponent and block
    const corners = [0, 2, 6, 8];
    let occupiedCorners = corners.filter(index => cells[index] === 'X');
    
    if (occupiedCorners.length === 2) {
      // Find the index of the third corner to block
      const thirdCorner = corners.find(corner => !occupiedCorners.includes(corner) && cells[corner] === '');
      if (thirdCorner !== undefined) {
        handleCellClick(thirdCorner);
        return;
      }
    }

    // Finally, make a random move if no strategic moves are available
    makeEasyMove();
  };

  const makeHardMove = () => {
    // Use Minimax algorithm for optimal move
    const bestMove = findBestMove(cells);
    handleCellClick(bestMove);
  };

  const findBestMove = (board) => {
    let bestValue = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O'; // AI's move
        const moveValue = minimax(board, 0, false);
        board[i] = ''; // Undo the move
        if (moveValue > bestValue) {
          bestMove = i;
          bestValue = moveValue;
        }
      }
    }
    return bestMove;
  };

  const minimax = (board, depth, isMaximizing) => {
    const score = evaluateBoard(board);
    if (score === 10) return score - depth; // AI wins
    if (score === -10) return score + depth; // Opponent wins
    if (checkDraw(board)) return 0; // Draw

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O'; // AI's move
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = ''; // Undo the move
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X'; // Opponent's move
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = ''; // Undo the move
        }
      }
      return best;
    }
  };

  const evaluateBoard = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O') {
        return 10; // AI wins
      }
      if (board[a] === 'X' && board[b] === 'X' && board[c] === 'X') {
        return -10; // Opponent wins
      }
    }
    return 0; // No winner
  };

  const checkWinner = (currentCells) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombos.some(combo => {
      return combo.every(index => currentCells[index] === currentPlayer);
    });
  };

  const checkDraw = (currentCells) => {
    return currentCells.every(cell => cell);
  };

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    log('> Board has been reset \n\n');
  };

  const saveGame = (state) => {
    localStorage.setItem('ticTacToeGameState', JSON.stringify(state));
    log('> Game state saved\n\n');
  };

  const loadGame = () => {
    const savedState = localStorage.getItem('ticTacToeGameState');
    return savedState ? JSON.parse(savedState) : null;
  };

  const handleLoadGame = () => {
    const savedState = loadGame();
    if (savedState) {
      setCells(savedState.cells);
      setCurrentPlayer(savedState.currentPlayer);
      log('> Game loaded from saved state\n\n');
    } else {
      log('> No saved game found\n\n');
      alert('No saved game found.');
    }
  };

  const clearSavedGame = () => {
    localStorage.removeItem('ticTacToeGameState');
    log('> Saved game has been cleared\n\n');
    alert('Saved game has been cleared.');
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="controls">
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select 
          id="difficulty" 
          value={difficulty} 
          onChange={(e) => {
            const selectedDifficulty = e.target.value;
            if (window.confirm(`Are you sure you want to change the difficulty to ${selectedDifficulty}?`)) {
              setDifficulty(selectedDifficulty);
              resetBoard(); // Reset the game on difficulty change
            }
          }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="board">
        {cells.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetBoard}>Reset</button>
        <button onClick={() => saveGame({ cells, currentPlayer })}>Save</button>
        <button onClick={handleLoadGame}>Load</button>
        <button onClick={clearSavedGame}>Clear Save</button>
      </div>
    </div>
  );
};

export default TicTacToe;
