import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicTacToe.css'; // Import your CSS styles or adjust them here

const TicTacToe = ({ quboCode, log }) => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [difficulty, setDifficulty] = useState('Easy');

  // Load saved game state on mount
  useEffect(() => {
    const savedState = loadGame();
    if (savedState) {
      setCells(savedState.cells);
      setCurrentPlayer(savedState.currentPlayer);
      log('> Game loaded from saved state\n\n');
    }
  }, []);

  // Fetch move from quantum backend if it's 'O's turn
  useEffect(() => {
    if (currentPlayer === 'O') fetchQuantumMove();
  }, [currentPlayer, cells]);

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

  const fetchQuantumMove = async () => {
    try {
      eval(quboCode); // Dynamically generate QUBO logic
      const qubo = createQuboForSingleMove(cells, difficulty);

      log(`> QUBO generated for ${difficulty} difficulty\n\n`);

      const response = await axios.post('http://localhost:8000/quantum', qubo);

      if (response.data?.solution !== undefined) {
        setTimeout(() => {
          handleCellClick(response.data.solution);
          log(`> Quantum server placed O at cell ${response.data.solution}\n\n`);
        }, 500);
      } else {
        log('> Quantum server error: Invalid QUBO or missing solution\n\n');
      }
    } catch (error) {
      console.error('Quantum server error:', error.message);
      log('> Quantum server error: Check QUBO format or connection\n\n');
    }
  };

  const checkWinner = (currentCells) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo =>
      combo.every(index => currentCells[index] === currentPlayer)
    );
  };

  const checkDraw = (currentCells) => currentCells.every(cell => cell);

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    log('> Board reset\n\n');
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
      alert('No saved game found.');
      log('> No saved game found\n\n');
    }
  };

  const clearSavedGame = () => {
    localStorage.removeItem('ticTacToeGameState');
    alert('Saved game cleared.');
    log('> Saved game cleared\n\n');
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {/* Difficulty Dropdown */}
      <div className="controls">
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => {
            const selectedDifficulty = e.target.value;
            if (window.confirm(`Change difficulty to ${selectedDifficulty}?`)) {
              setDifficulty(selectedDifficulty);
              resetBoard();
            }
          }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Game Board */}
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

      {/* Control Buttons */}
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
