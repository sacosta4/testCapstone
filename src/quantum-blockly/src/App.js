import './App.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import BlocklyComponent from './BlocklyComponent';
import DisplayComponent from './DisplayComponent';
import Connect4 from './Connect4';
import TicTacToe from './TicTacToe';
import StudentModeSwitcher from './StudentModeSwitcher'; // Import the new component

/*
Main Component that contains the main content section of the app
*/
function MainComponent() {
  const [code, setCode] = useState(''); //setting up a state for the generated code
  const [log, setLog] = useState('');
  const [blocklyWorkspace, setBlocklyWorkspace] = useState(null); // Add state for the Blockly workspace

  const codeHandler = (code) => { //this code handler will be passed into the BlocklyComponent, and will set the state of the code for the main component
    setCode(code);
  }

  const logHandler = (next) => {
    setLog((prev) => next + prev);
  }

  // Handle workspace initialization
  const handleWorkspaceInit = (workspace) => {
    setBlocklyWorkspace(workspace);
  };

  // Handle code from student components
  const handleStudentCodeGenerated = (studentCode) => {
    setCode(studentCode);
    log('> Student-friendly code generated\n\n');
  };

  // Maintain both game selection methods for backward compatibility
  const [game, setGame] = useState(0);
  
  // Simple toggle between games (original functionality)
  const changeGame = async () => {
    if(game === 0) {
      setGame(1);
    }
    else {
      setGame(0);
    }
  };

  // Extended game selection by name (new functionality)
  const selectGame = async (newGame) => {
    if(newGame === 'tic') {
      setGame(0);
    }
    else if (newGame === 'connect') {
      setGame(1);
    }
    else if (newGame === 'mancala') {
      setGame(2);
    }
  };
  
  // Game container styling to ensure consistent appearance
  const gameContainerStyle = {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto'
  };

  // Helper to get current game name
  const getCurrentGameName = () => {
    if (game === 0) return "tic";
    if (game === 1) return "connect";
    if (game === 2) return "mancala";
    return "tic";
  };
  
  // returns UI of main component (Blockly Component, Code Display, and Standard Output Display)
  return (
    <>
      <div className="controls">
        {/* Maintain both control types */}
        <button onClick={changeGame}>Change Game</button>
        
        <label style={{ marginLeft: '20px' }}>
          Choose Game:
          <select 
            value={getCurrentGameName()} 
            onChange={(e) => selectGame(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="tic">Tic-Tac-Toe</option>
            <option value="connect">Connect 4</option>
            <option value="mancala">Mancala</option>
          </select>
        </label>
      </div>
      
      {/* Add the StudentModeSwitcher component */}
      <StudentModeSwitcher 
        workspace={blocklyWorkspace} 
        onCodeGenerated={handleStudentCodeGenerated}
      />
      
      <div className="main">
        <div className="vertical-div">
          <BlocklyComponent 
            mainCodeHandlingFunction={codeHandler} 
            log={logHandler}
            onWorkspaceInit={handleWorkspaceInit}  // Pass the callback to get workspace
          />
          <DisplayComponent heading="Generated Code" text={code} bColor='black'/>
        </div>
        
        <div className="vertical-div">
          <div style={gameContainerStyle}>
            {game === 0 && (
              <TicTacToe quboCode={code} log={logHandler}/>
            )}
            {game === 1 && (
              <Connect4 quboCode={code} log={logHandler}/>
            )}
            {game === 2 && (
              <div className="container">
                <h2>Mancala Game</h2>
                <p>Coming soon...</p>
              </div>
            )}
          </div>
          
          <div style={{width: '90%', height:'50%'}}>
            <DisplayComponent heading="Log" text={log} bColor='black' />
          </div>
        </div>
      </div>
    </>
  );
}

/*
Root Component that comprises the entire app
*/
function App() {
  // Add custom styling for game components
  useEffect(() => {
    // Only add styles if they don't already exist
    if (!document.getElementById('quantum-game-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'quantum-game-styles';
      styleEl.innerHTML = `
        .container {
          text-align: center;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          color: #333;
          background-color: #f0f8ff;
          padding: 10px;
          border-radius: 10px;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .ticboard {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 20px auto;
          max-width: 300px;
        }
        .cell {
          background-color: #ffeb3b;
          color: #333;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .cell:hover {
          background-color: #ffc107;
        }
        .turn-indicator {
          font-size: 1.2rem;
          margin: 10px 0;
          font-weight: bold;
          color: #2196f3;
        }
        .next-game-button {
          background-color: #ff9800;
          margin-top: 15px;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(7, 75px);
          grid-template-rows: repeat(6, 75px);
          gap: 10px;
          margin: 20px auto;
          max-width: 550px;
        }
        .fallback-indicator {
          background-color: #fff3cd;
          color: #856404;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
          border-left: 5px solid #ffeeba;
          width: 90%;
          max-width: 500px;
          text-align: left;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  return (
    <>
      <h1>Quantum Blockly</h1>
      <MainComponent /> 
    </>
  );
}

export default App;