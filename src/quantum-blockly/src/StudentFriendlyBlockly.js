// src/StudentFriendlyBlockly.js
import React, { useState, useEffect, useRef } from 'react';
import Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// Import blocks and generators
import './blocks/student_friendly_blocks';
import './generators/student_friendly_generators';
import { initStudentFriendlyBlocks } from './blocks/student_friendly_blocks';
import { initStudentFriendlyGenerators } from './generators/student_friendly_generators';

// Import styles
import './StudentFriendlyBlockly.css';

const StudentFriendlyBlockly = ({ onCodeGenerated, parentWorkspace, isStudentMode }) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [showTips, setShowTips] = useState(true);
  const [activeTip, setActiveTip] = useState(0);
  const blocklyRef = useRef(null);
  const [workspace, setWorkspace] = useState(null);

  // Initialize blocks and generators
  useEffect(() => {
    if (typeof initStudentFriendlyBlocks === 'function') {
      initStudentFriendlyBlocks();
    }
    if (typeof initStudentFriendlyGenerators === 'function') {
      initStudentFriendlyGenerators();
    }
  }, []);

  // Create a simplified toolbox configuration for students
  const studentToolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "🎮 Easy Strategies",
        colour: "#4CAF50",
        contents: [
          { kind: "block", type: "simple_strategy" },
          { kind: "block", type: "beginner_strategy" }
        ]
      },
      {
        kind: "category",
        name: "🏆 Smart Strategies",
        colour: "#2196F3",
        contents: [
          { kind: "block", type: "win_detection_strategy" },
          { kind: "block", type: "line_detection" },
          { kind: "block", type: "complete_strategy" }
        ]
      },
      {
        kind: "category",
        name: "🎯 Custom Strategies",
        colour: "#9C27B0",
        contents: [
          { kind: "block", type: "quantum_strategy_builder" },
          { kind: "block", type: "position_weight" }
        ]
      },
      {
        kind: "category",
        name: "📚 Help & Examples",
        colour: "#607D8B",
        contents: [
          { kind: "block", type: "qubo_explanation" },
          { kind: "block", type: "visual_board" }
        ]
      }
    ]
  };

  // Educational tips for students
  const tips = [
    "The center square is usually the strongest position on the board!",
    "Try to get three of your pieces in a row, column, or diagonal to win!",
    "If your opponent has two pieces in a row, you should block them!",
    "Corners are stronger positions than edges in Tic-Tac-Toe.",
    "The quantum computer chooses the position with the highest weight.",
    "Higher weight numbers mean better moves for the quantum computer.",
    "You can create your own strategy by assigning weights to different positions!"
  ];

  // Effect to set up the Blockly workspace
  useEffect(() => {
    if (blocklyRef.current && isStudentMode) {
      // Only initialize if we're in student mode and it hasn't been initialized yet
      if (!workspace) {
        try {
          const newWorkspace = Blockly.inject(blocklyRef.current, {
            toolbox: studentToolbox,
            zoom: {
              controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2
            },
            trashcan: true,
            renderer: 'zelos', // Zelos renderer is more visually appealing
            theme: Blockly.Themes.Modern // Use a more colorful theme
          });

          setWorkspace(newWorkspace);

          // Add change listener to generate code
          newWorkspace.addChangeListener(() => {
            const code = javascriptGenerator.workspaceToCode(newWorkspace);
            if (typeof onCodeGenerated === 'function') {
              onCodeGenerated(code);
            }
          });

          // Rotate through tips every 10 seconds
          const tipInterval = setInterval(() => {
            setActiveTip(prevTip => (prevTip + 1) % tips.length);
          }, 10000);

          return () => {
            clearInterval(tipInterval);
            newWorkspace.dispose();
          };
        } catch (error) {
          console.error("Error initializing Blockly workspace:", error);
        }
      }
    }
  }, [blocklyRef, isStudentMode, onCodeGenerated, workspace, tips]);

  // Function to update the Blockly workspace with parent workspace if needed
  useEffect(() => {
    if (parentWorkspace && workspace) {
      try {
        const parentXml = Blockly.Xml.workspaceToDom(parentWorkspace);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(parentXml, workspace);
      } catch (error) {
        console.error("Error transferring workspace:", error);
      }
    }
  }, [parentWorkspace, workspace]);

  // Function to add a block to the workspace
  const addBlockToWorkspace = (blockType) => {
    if (workspace) {
      try {
        const block = workspace.newBlock(blockType);
        block.initSvg();
        block.render();
        
        // Position the block in the center of the workspace viewpoint
        const metrics = workspace.getMetrics();
        if (metrics) {
          const x = metrics.viewWidth / 2;
          const y = metrics.viewHeight / 3;
          block.moveBy(x, y);
        }
      } catch (error) {
        console.error(`Error adding block ${blockType}:`, error);
      }
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // Examples for students to use
  const examples = [
    { 
      name: "Center First Strategy",
      blockType: "simple_strategy" 
    },
    { 
      name: "Win & Block Strategy",
      blockType: "win_detection_strategy" 
    },
    { 
      name: "Complete Strategy",
      blockType: "complete_strategy" 
    }
  ];

  if (!isStudentMode) {
    return null; // Don't render anything in regular mode
  }

  return (
    <div className="student-friendly-blockly">
      <div className="student-header">
        <h1>Quantum Tic-Tac-Toe for Students</h1>
        <div className="student-controls">
          <div className="difficulty-selector">
            <label>Difficulty:</label>
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className="tips-toggle" onClick={() => setShowTips(!showTips)}>
            {showTips ? "Hide Tips" : "Show Tips"}
          </button>
        </div>
      </div>

      {showTips && (
        <div className="tips-panel">
          <h3>💡 Did you know?</h3>
          <p className="active-tip">{tips[activeTip]}</p>
        </div>
      )}

      <div className="blockly-quick-actions">
        <h3>Quick Start: Add a Block</h3>
        <div className="quick-blocks">
          <button 
            onClick={() => addBlockToWorkspace("simple_strategy")}
            className="block-button easy"
          >
            Simple Strategy
          </button>
          <button 
            onClick={() => addBlockToWorkspace("win_detection_strategy")}
            className="block-button medium"
          >
            Smart Strategy
          </button>
          <button 
            onClick={() => addBlockToWorkspace("complete_strategy")}
            className="block-button hard"
          >
            Complete Strategy
          </button>
        </div>
      </div>

      <div className="blockly-examples">
        <h3>Example Strategies</h3>
        <div className="examples-list">
          {examples.map((example, index) => (
            <div key={index} className="example-item">
              <h4>{example.name}</h4>
              <button 
                onClick={() => addBlockToWorkspace(example.blockType)}
                className="example-button"
              >
                Try It
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="blockly-container">
        <div 
          ref={blocklyRef} 
          className="blockly-area"
          style={{ width: '100%', height: '500px' }}
        ></div>
      </div>

      <div className="blockly-help">
        <h3>How to Create Your Quantum Strategy</h3>
        <ol>
          <li>Drag blocks from the toolbox on the left into the workspace</li>
          <li>Connect blocks together to build your strategy</li>
          <li>Click "Generate Code" to test your strategy against the computer</li>
          <li>Watch your quantum algorithm play Tic-Tac-Toe!</li>
        </ol>
      </div>
    </div>
  );
};

export default StudentFriendlyBlockly;