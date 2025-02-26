import './App.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import BlocklyComponent from './BlocklyComponent';
import DisplayComponent from './DisplayComponent';
import Connect4 from './Connect4';
import TicTacToe from './TicTacToe';

/*
Main Component that contains the main content section of the app
*/
function MainComponent() {
  const [code, setCode] = useState(''); //setting up a state for the generated code
  const [log, setLog] = useState('');

  const codeHandler = (code) => { //this code handler will be passed into the BlocklyComponent, and will set the state of the code for the main component
    setCode(code);
  }

  const logHandler = (next) => {
    setLog((prev) => next + prev);
  }

  const [game, setGame] = useState(0);
  
  const changeGame = async () => {
      if(game === 0) {
        setGame(1);
      }
      else {
        setGame(0);
      }
  };
  
  // returns UI of main component (Blockly Component, Code Display, and Standard Output Display)
  if(game === 0) {
    return (
      <>
      <div className="controls">
          <button onClick={changeGame}>Change Game</button>
        </div>
      <div className="main">
        <div className="vertical-div">
          <BlocklyComponent mainCodeHandlingFunction={codeHandler} log={logHandler}/>
          <DisplayComponent heading="Generated Code" text={code} bColor='black'/>
        </div>
        <div className="vertical-div" >
          <div style={{height:'50%'}}>
            <Connect4 quboCode={code} log={logHandler}/>
          </div>
          <div style={{width: '90%', height:'50%'}}>
            <DisplayComponent heading="Log" text={log} bColor='black' />
          </div>
          
        </div>
      </div>
      </>
    )
  }
  else {
    return (
      <>
      <div className="controls">
          <button onClick={changeGame}>Change Game</button>
        </div>
      <div className="main">
        <div className="vertical-div">
          <BlocklyComponent mainCodeHandlingFunction={codeHandler} log={logHandler}/>
          <DisplayComponent heading="Generated Code" text={code} bColor='black'/>
        </div>
        <div className="vertical-div" >
          <div style={{height:'50%'}}>
            <TicTacToe quboCode={code} log={logHandler}/>
          </div>
          <div style={{width: '90%', height:'50%'}}>
            <DisplayComponent heading="Log" text={log} bColor='black' />
          </div>
          
        </div>
      </div>
      </>
    )
  }

}

/*
Root Component that comprises the entire app
*/
function App() {

  return (
    <>
    <h1>Quantum Blockly</h1>
    <MainComponent /> 
    </>
  );
}

export default App;
