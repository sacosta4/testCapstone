import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicTacToe.css'; // Ensure CSS adjustments for scoreboard are included

const TicTacToe = ({ quboCode, log }) => {
  const [gameSetup, setGameSetup] = useState(false);
  const [player1Type, setPlayer1Type] = useState('Human');
  const [player2Type, setPlayer2Type] = useState('CPU');
  const [player1Difficulty, setPlayer1Difficulty] = useState('Easy');
  const [player2Difficulty, setPlayer2Difficulty] = useState('Easy');
  const [unlockedDifficulties, setUnlockedDifficulties] = useState(['Easy']);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [playerWins, setPlayerWins] = useState({ X: 0, O: 0 });
  const [turnIndicator, setTurnIndicator] = useState('');
  const [gameOver, setGameOver] = useState(false); // New state to track game end
  const [nextGameReady, setNextGameReady] = useState(false); // New state for next game prompt

  const MAX_WINS_DISPLAY = 3; // Max number of boxes to display wins
  const MOVE_DELAY = 1000; // Customizable delay in milliseconds, change as needed

  useEffect(() => {
    if (gameSetup && !gameOver) {
      if (currentPlayer === 'X' && player1Type === 'CPU') {
        setTurnIndicator('Player 1 (CPU) is making a move...');
        setTimeout(() => handleCPUMove(player1Difficulty), MOVE_DELAY);
      } else if (currentPlayer === 'O' && player2Type === 'CPU') {
        setTurnIndicator('Player 2 (CPU) is making a move...');
        setTimeout(() => handleCPUMove(player2Difficulty), MOVE_DELAY);
      } else if (currentPlayer === 'X' && player1Type === 'Quantum CPU') {
        setTurnIndicator('Player 1 (Quantum CPU) is making a move...');
        setTimeout(fetchQuantumMove, MOVE_DELAY);
      } else {
        setTurnIndicator(`It's ${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s turn`);
      }
    }
  }, [currentPlayer, gameSetup, gameOver]);

  const startGame = () => {
    setGameSetup(true);
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setTurnIndicator("It's Player 1's turn");
    setGameOver(false); // Reset gameOver state
    setNextGameReady(false); // Reset next game state
    log('> Game started\n\n');
  };

  const handleCellClick = (index) => {
    if (cells[index] || gameSetup === false || gameOver) return;

    if (
      (currentPlayer === 'X' && player1Type === 'Human') ||
      (currentPlayer === 'O' && player2Type === 'Human')
    ) {
      makeMove(index);
    }
  };

  const makeMove = (index, player = currentPlayer) => {
    const newCells = [...cells];
    newCells[index] = player;
    setCells(newCells);
    log(`> Placed ${player} at cell ${index}\n\n`);

    if (checkWinner(newCells)) {
      setGameOver(true);
      setTimeout(() => {
        alert(`${player} wins!`);
        handleWin(player);
      }, 100); // Slight delay to allow rendering
    } else if (checkDraw(newCells)) {
      setGameOver(true);
      setTimeout(() => {
        alert("It's a draw!");
        prepareNextGame();
      }, 100);
    } else {
      setCurrentPlayer(player === 'X' ? 'O' : 'X');
    }

    saveGame({ cells: newCells, currentPlayer: player === 'X' ? 'O' : 'X' });
  };

  const handleWin = (player) => {
    setPlayerWins((prevWins) => {
      const updatedWins = { ...prevWins, [player]: prevWins[player] + 1 };

      if (updatedWins[player] >= 2) {
        if (
          (player === 'X' && player1Type === 'Human' && player2Type === 'CPU' && player2Difficulty === 'Easy') ||
          (player === 'O' && player2Type === 'Human' && player1Type === 'CPU' && player1Difficulty === 'Easy')
        ) {
          if (!unlockedDifficulties.includes('Medium')) {
            setUnlockedDifficulties((prev) => [...prev, 'Medium']);
            alert('Congratulations! "Medium" difficulty unlocked!');
          }
        } else if (
          (player === 'X' && player1Type === 'Human' && player2Type === 'CPU' && player2Difficulty === 'Medium') ||
          (player === 'O' && player2Type === 'Human' && player1Type === 'CPU' && player1Difficulty === 'Medium')
        ) {
          if (!unlockedDifficulties.includes('Hard')) {
            setUnlockedDifficulties((prev) => [...prev, 'Hard']);
            alert('Congratulations! "Hard" difficulty unlocked!');
          }
        }

        // Automatically return to the main menu after winning 2/3 times
        setTimeout(() => {
          alert('You have won 2 out of 3 games! Returning to the main menu.');
          resetToSetup();
        }, 1000);
      } else {
        setTimeout(prepareNextGame, 100); // Prepare for next game after win
      }

      return updatedWins;
    });
  };

  const prepareNextGame = () => {
    setNextGameReady(true);
  };

  const startNextGame = () => {
    resetBoard();
    setNextGameReady(false); // Hide the next game button
  };

  const resetBoard = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setTurnIndicator("It's Player 1's turn");
    setGameOver(false); // Allow new game to proceed
  };

  const handleCPUMove = (difficulty) => {
    const availableCells = cells
      .map((cell, index) => (cell === '' ? index : null))
      .filter((index) => index !== null);

    let chosenCell;
    if (difficulty === 'Easy') {
      chosenCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    } else if (difficulty === 'Medium') {
      const corners = [0, 2, 6, 8].filter((index) => availableCells.includes(index));
      chosenCell =
        corners.length > 0
          ? corners[Math.floor(Math.random() * corners.length)]
          : availableCells[Math.floor(Math.random() * availableCells.length)];
    } else if (difficulty === 'Hard') {
      chosenCell = getBestMove() || availableCells[Math.floor(Math.random() * availableCells.length)];
    }

    makeMove(chosenCell);
  };

  const getBestMove = () => {
    // Placeholder for complex logic (e.g., minimax)
    return null;
  };

  const fetchQuantumMove = async () => {
    var createQuboForSingleMove = () => {};

    try {
      eval(quboCode);

      if (typeof createQuboForSingleMove !== 'function') {
        throw new Error("createQuboForSingleMove is not defined or not a function.");
      }

      const qubo = createQuboForSingleMove(cells);
      log('> QUBO Generated by Blockly Code\n\n');

      const response = await axios.post('http://localhost:8000/quantum', qubo);

      if (response.data && response.data.solution !== undefined && response.data.energy !== undefined) {
        makeMove(response.data.solution, 'X');
        log(`> Quantum Server calculated X placement at cell ${response.data.solution} based on QUBO generated from Blockly Workspace\n\n`);
      } else {
        log('> Quantum Server Error: Invalid response format or missing data.\n\n');
      }
    } catch (error) {
      console.error("Quantum Server Error:", error.message);
      log('> Quantum Server Error: QUBO format may be invalid, or server connection error occurred.\n\n');
    }
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

    return winningCombos.some((combo) =>
      combo.every((index) => currentCells[index] === currentPlayer)
    );
  };

  const checkDraw = (currentCells) => {
    return currentCells.every((cell) => cell);
  };

  const resetToSetup = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameSetup(false);
    setTurnIndicator('');
    setGameOver(false); // Reset game over state
    setNextGameReady(false); // Reset next game state
    log('> Game reset to setup screen\n\n');
  };

  const saveGame = (state) => {
    try {
      localStorage.setItem('ticTacToeGameState', JSON.stringify(state));
      log('> Game state saved\n\n');
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const loadGame = () => {
    try {
      const savedState = localStorage.getItem('ticTacToeGameState');
      return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  };

  const handleLoadGame = () => {
    const savedState = loadGame();
    if (savedState) {
      setCells(savedState.cells);
      setCurrentPlayer(savedState.currentPlayer);
      setGameSetup(true);
      log('> Game loaded from saved state\n\n');
    } else {
      alert('No saved game found.');
      log('> No saved game found\n\n');
    }
  };

  const clearSavedGame = () => {
    try {
      localStorage.removeItem('ticTacToeGameState');
      alert('Saved game cleared.');
      log('> Saved game cleared\n\n');
    } catch (error) {
      console.error('Error clearing saved game:', error);
    }
  };

  const handlePlayerTypeChange = (player, newType) => {
    if (player === 'player1') {
      setPlayer1Type(newType);
    } else {
      setPlayer2Type(newType);
    }
    setPlayerWins({ X: 0, O: 0 }); // Reset scores when switching player type
  };

  const renderPlayerName = (playerType, playerDifficulty) => {
    if (playerType === 'CPU' || playerType === 'Quantum CPU') {
      return `${playerType} (${playerDifficulty})`;
    }
    return 'Human';
  };

  const renderScoreboard = (wins, player) => {
    const scoreBoxes = Array(MAX_WINS_DISPLAY)
      .fill(null)
      .map((_, index) => (index < wins ? `[${player}]` : `[]`));
    return <div className="scoreboard-row">{scoreBoxes.join(' ')}</div>;
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {gameSetup ? (
        <>
          <div className="scoreboard">
            <div>Player 1 (X): {renderScoreboard(playerWins.X, 'X')}</div>
            <div>Player 2 (O): {renderScoreboard(playerWins.O, 'O')}</div>
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

          <p className="turn-indicator">{turnIndicator}</p>

          {nextGameReady && (
            <button onClick={startNextGame} className="next-game-button">
              Start Next Game
            </button>
          )}

          <div className="controls">
            <button onClick={resetToSetup}>Reset to Setup</button>
            <button onClick={() => saveGame({ cells, currentPlayer })}>Save</button>
            <button onClick={handleLoadGame}>Load</button>
            <button onClick={clearSavedGame}>Clear Save</button>
          </div>
        </>
      ) : (
        <div className="setup">
          <h2>Game Setup</h2>
          <label>
            Player 1 (X):
            <select value={player1Type} onChange={(e) => handlePlayerTypeChange('player1', e.target.value)}>
              <option value="Human">Human</option>
              <option value="CPU">CPU</option>
              <option value="Quantum CPU">Quantum CPU</option>
            </select>
          </label>
          {player1Type === 'CPU' && (
            <label>
              Player 1 CPU Difficulty:
              <select
                value={player1Difficulty}
                onChange={(e) => setPlayer1Difficulty(e.target.value)}
                disabled={!unlockedDifficulties.includes(player1Difficulty)}
              >
                {unlockedDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Player 2 (O):
            <select value={player2Type} onChange={(e) => handlePlayerTypeChange('player2', e.target.value)}>
              <option value="Human">Human</option>
              <option value="CPU">CPU</option>
            </select>
          </label>
          {player2Type === 'CPU' && (
            <label>
              Player 2 CPU Difficulty:
              <select
                value={player2Difficulty}
                onChange={(e) => setPlayer2Difficulty(e.target.value)}
                disabled={!unlockedDifficulties.includes(player2Difficulty)}
              >
                {unlockedDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
