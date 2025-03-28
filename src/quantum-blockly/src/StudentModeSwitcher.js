// src/StudentModeSwitcher.js
import React, { useState, useEffect } from 'react';
import Blockly from 'blockly/core';
import StudentFriendlyBlockly from './StudentFriendlyBlockly';
import './StudentModeSwitcher.css';

const StudentModeSwitcher = ({ workspace, onCodeGenerated }) => {
  const [isStudentMode, setIsStudentMode] = useState(false);
  const [originalToolboxConfig, setOriginalToolboxConfig] = useState(null);

  // Save original toolbox configuration when component mounts
  useEffect(() => {
    if (workspace && !originalToolboxConfig) {
      const toolboxDef = workspace.options.languageTree;
      setOriginalToolboxConfig(toolboxDef);
    }
  }, [workspace, originalToolboxConfig]);

  // Handle switching between student mode and regular mode
  const handleModeToggle = () => {
    if (workspace) {
      const newMode = !isStudentMode;
      setIsStudentMode(newMode);
      
      // Clear the workspace when switching modes to avoid confusion
      workspace.clear();
      
      // If returning to regular mode, restore the original toolbox
      if (!newMode && originalToolboxConfig) {
        workspace.updateToolbox(originalToolboxConfig);
      }
    }
  };

  // When student mode is on, code generated from student blocks
  // needs to be passed up to the parent component
  const handleStudentCodeGenerated = (code) => {
    if (onCodeGenerated && code) {
      onCodeGenerated(code);
    }
  };

  return (
    <div className="student-mode-container">
      <div className="mode-toggle-wrapper">
        <button 
          className={`mode-toggle-button ${isStudentMode ? 'student-active' : ''}`}
          onClick={handleModeToggle}
        >
          {isStudentMode ? 'Switch to Regular Mode' : 'Switch to Student Mode'}
        </button>
        
        {isStudentMode && (
          <div className="student-mode-label">
            <span role="img" aria-label="student">👨‍🎓</span> Student Mode Active
          </div>
        )}
      </div>
      
      {isStudentMode && (
        <StudentFriendlyBlockly 
          onCodeGenerated={handleStudentCodeGenerated}
          parentWorkspace={workspace}
          isStudentMode={isStudentMode}
        />
      )}
    </div>
  );
};

export default StudentModeSwitcher;