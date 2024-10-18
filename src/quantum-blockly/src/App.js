import './App.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import BlocklyComponent from './BlocklyComponent';
import DisplayComponent from './DisplayComponent';
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
  
  // returns UI of main component (Blockly Component, Code Display, and Standard Output Display)
  return (
    <>
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
