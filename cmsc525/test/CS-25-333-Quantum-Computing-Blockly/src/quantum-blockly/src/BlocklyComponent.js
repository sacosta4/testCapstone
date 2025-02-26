import './BlocklyComponent.css';
import './javascriptGenerators';
import { toolboxConfig } from "./toolboxConfig";
import { useRef, useEffect, useState } from 'react';
import Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';
import { javascriptGenerator } from 'blockly/javascript';
import minimaxBlockly from "./minimaxBlockly.json";
import "./blockImports";
import "./toolboxConfig"
import "./useBlocklyWorkspace"


/*
  BlocklyComponent displays the actual Blockly Toolbox and Workspace where user will code their solution.
  @param mainCodeHandlingFunction is the setter method for the code. It will be passed into the BlocklyComponent
  by its parent component (the main component) and will be used to set the state of the code of the main component.
  This is done so the code can be passed up from the BlocklyComponent to the MainComponent.
*/
function BlocklyComponent({ mainCodeHandlingFunction, log}) {
  const workspaceRef = useRef(null); // DOM reference to the workspace div needed for injection
  const [workspace, setWorkspace] = useState(null); // the component will manage the state of the workspace, needed so that the workspace can be passed into the Generate Code Button Component
  const [code, setCode] = useState(''); // The component has its own code state to be retrieved from the blockly code handling function
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaces, setWorkspaces] = useState([]);


  useEffect(() => {
    if (!workspaceRef.current) {
      console.warn("Blockly container is not yet in the DOM");
      return;
    }

    console.log("Injecting Blockly into: ", workspaceRef.current);

    const currWorkspace = Blockly.inject(workspaceRef.current, {
      toolbox: toolboxConfig,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    });

    setWorkspace(currWorkspace);

    return () => {
      currWorkspace.dispose(); // Cleanup on unmount
    };
  }, []); // Runs only once when component mounts
  

//SAVE BLOCKS FUNCTION!!!!!!!!! Kinda works

function SaveAsBlockButton({ workspace }) {
  const handleSaveAsBlock = () => {
    if (workspace) {
      const selectedBlocks = workspace.getTopBlocks(true); // Get all top-level blocks
      if (selectedBlocks.length) {
        // Serialize each selected block
        const blockJsonList = selectedBlocks.map((block) =>
          Blockly.serialization.blocks.save(block)
        );

        const toolbox = workspace.options.languageTree;

        if (toolbox) {
          // Ensure "Saved Blocks" category exists
          let savedCategory = toolbox.contents.find(
            (category) => category.kind === 'category' && category.name === 'Saved Blocks'
          );

          if (!savedCategory) {
            savedCategory = {
              kind: 'category',
              name: 'Saved Blocks',
              colour: '#FFAB19',
              contents: [],
            };
            toolbox.contents.push(savedCategory);
          }

          // Add each saved block as a new block to the toolbox
          blockJsonList.forEach((blockJson, index) => {
            const blockType = `saved_block_${Date.now()}_${index}`; // Unique block type

            // Dynamically register the block type
            Blockly.Blocks[blockType] = {
              init: function () {
                const block = Blockly.serialization.blocks.append(
                  blockJson,
                  this.workspace
                );
                // Ensure proper layout, no specific positioning required here
                block.moveBy(0, 0);
              },
            };

            // Check if the block already exists in the toolbox; prevent duplicates
            const existingBlock = savedCategory.contents.find(
              (content) => content.type === blockType
            );

            if (!existingBlock) {
              savedCategory.contents.push({
                kind: 'block',
                type: blockType,
              });
            }
          });

          // Refresh the toolbox to show the new blocks
          workspace.updateToolbox(toolbox);

          alert('Block(s) saved successfully in the "Saved Blocks" category.');
        } else {
          alert('Failed to access the toolbox. Please try again.');
        }
      } else {
        alert('No blocks selected to save.');
      }
    }
  };

  return <button onClick={handleSaveAsBlock}>Save Blocks</button>;
}


/*
  GenerateCodeButton represents the component that hosts the button that'll generate code when clicked
  @param workspace: Blockly Workspace needs to be passed in so that the handleGenerate button knows where
  to generate code from.
  Initially, the workspace is going to be null, but then the state of it will be changed by the BlocklyComponent
  so the GenerateCodeButton will get rerendered with the new workspace passed into its event handler.
  
  - Extracts the QUBO data from the Blockly workspace.
  - This function retrieves the `linear` and `quadratic` dictionaries, 
  - which are used for quantum computation. Modify this function 
  - based on how your blocks store QUBO data.
*/
function GenerateCodeButton({ workspace, blocklyCodeHandlingFunction }) {
  
  // Function to extract QUBO data from the workspace
  const extractQUBOData = (workspace) => {
    // Simulated extraction from Blockly workspace (modify if needed)
    const quboData = {
      linear: {
        "0": 1.0,
        "1": -2.5,
        "2": 3.0
      },
      quadratic: {
        "0,1": -0.5,
        "1,2": 2.0
      }
    };
    return quboData;
  };

  /*
   Handles the "Generate Code" button click event.
   - Converts the Blockly workspace into JavaScript code.
   - Extracts the QUBO data from the workspace.
   - Logs the extracted JSON before sending it to the server.
   - Sends the JSON to the Flask server for processing.
   - Logs the server response or catches errors if any occur.
   */

  // Handle Generate button click
  const handleGenerate = async () => {
    if (workspace) {
      const code = javascriptGenerator.workspaceToCode(workspace);
      blocklyCodeHandlingFunction(code); // Sets the blockly component's code state

      // Extract QUBO data from the workspace
      const quboData = extractQUBOData(workspace);
      
      // Log the generated QUBO JSON
      console.log("📤 Sending QUBO Data to Server:", JSON.stringify(quboData, null, 2));

      try {
        const response = await fetch("http://127.0.0.1:8000/quantum", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(quboData),
        });

        const result = await response.json();
        console.log("✅ Server Response:", result);

        if (!response.ok) {
          throw new Error(`Server Error: ${result.error}`);
        }

      } catch (error) {
        console.error("❌ Error Sending Data:", error);
      }
    }
  };

  return (
    <>
      <button id="generate-btn" onClick={handleGenerate}>Generate Code</button>
    </>
  );
}


  //this code handler will be passed into the button component and will set the state of the code for the blockly component once the code has been generated
  const codeHandler = (code) => {
    setCode(code);
    log('> Blockly Code Generated\n\n');
  }


  const initializeBlocks = (workspace) => {
    // Get your saved state from somewhere, e.g. local storage.
    const state = '{"blocks":{"languageVersion":0,"blocks":[{"type":"function","id":";24IxItNp=6|x4.X-l]V","x":89,"y":50,"fields":{"NAME":"createQuboForSingleMove"},"inputs":{"PARAM":{"block":{"type":"board","id":"tf42#g:,4:*rq8090!7x"}},"BODY":{"block":{"type":"variables_set","id":"VDZJiVhm`5V3+(Y@?3F?","fields":{"VAR":{"id":"{8[bKRn2f;Y1.$sOo;{#"}},"inputs":{"VALUE":{"block":{"type":"dictionary_block","id":"cL^6)zo_W=XJnWsg(9%O"}}},"next":{"block":{"type":"variables_set","id":"]P:lJ^q_s70V3Bq@E#WG","fields":{"VAR":{"id":"9opK!{UC.*(_THqPAiBd"}},"inputs":{"VALUE":{"block":{"type":"dictionary_block","id":"XLHQZvt.)uX|d:%SDR5s"}}},"next":{"block":{"type":"variables_set","id":"`9BI(V,Cb(qz7uD$lj!U","fields":{"VAR":{"id":"xsK10iLQGUyJ:XW-SI%+"}},"inputs":{"VALUE":{"block":{"type":"math_number","id":"_h;JHwjsDP`}JTGk?d8F","fields":{"NUM":2}}}},"next":{"block":{"type":"for_loop","id":".F7!cF@G[5ToD#2EQ+sj","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A"}},"inputs":{"FROM":{"shadow":{"type":"math_number","id":"r.-.by=#psGX:a!haV@#","fields":{"NUM":0}}},"TO":{"shadow":{"type":"math_number","id":"?-[W6o,tS|Hqr@}j}k*u","fields":{"NUM":10}},"block":{"type":"board_length","id":"Cl3Ijg%i6mGRt]A!];L9"}},"BY":{"shadow":{"type":"math_number","id":"%0kB|IfWK^lXq*fwWW.B","fields":{"NUM":1}}},"DO":{"block":{"type":"controls_if","id":"ZqqjsLd39({jr8l^8|@#","inputs":{"IF0":{"block":{"type":"check_index","id":".j3kJ}f}GY,OI@c07-zk","inputs":{"INDEX":{"shadow":{"type":"variables_get","id":"D#=bc#@I7=AJXPr({)0s","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A","name":"i","type":""}}}},"VALUE":{"shadow":{"type":"text","id":"~dj=$gdl9XwA`SMXzN+8","fields":{"TEXT":""}}}}}},"DO0":{"block":{"type":"update_dict","id":"T*9#NX(XclEJ4G~2x(nT","fields":{"NAME":{"id":"{8[bKRn2f;Y1.$sOo;{#"}},"inputs":{"KEY":{"block":{"type":"variables_get","id":"MR$C.hu{%0a1}nc}bNXy","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A"}}}},"VALUE":{"block":{"type":"math_number","id":"upGx!5tN(br7zJq6aA0Q","fields":{"NUM":-1}}}}}}}}}},"next":{"block":{"type":"for_loop","id":"xWr|4GgevJ%L@ecsG$=T","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A"}},"inputs":{"FROM":{"shadow":{"type":"math_number","id":"y/a(f/eVaR`)YyjVd~.M","fields":{"NUM":0}}},"TO":{"shadow":{"type":"math_number","id":"?-[W6o,tS|Hqr@}j}k*u","fields":{"NUM":10}},"block":{"type":"board_length","id":"s,YQb#+-.AQ+4#jGm:J3"}},"BY":{"shadow":{"type":"math_number","id":"dxb!S;R_V_Faw2O:m3|6","fields":{"NUM":1}}},"DO":{"block":{"type":"controls_if","id":"`E#]4PyC8l-F3i,`Xc=L","inputs":{"IF0":{"block":{"type":"check_index","id":"OU16qe8e`n(~F71_,8H;","inputs":{"INDEX":{"shadow":{"type":"variables_get","id":"zY(!(~RwR!YoC*HfLUa:","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A","name":"i","type":""}}}},"VALUE":{"shadow":{"type":"text","id":"2qUkzd4xvTiNsC1H)k.*","fields":{"TEXT":""}}}}}},"DO0":{"block":{"type":"for_loop","id":"4,sYtO@[bHo$2jAO@U,{","fields":{"VAR":{"id":"yk-M5,%0@5F(KM`BRh6r"}},"inputs":{"FROM":{"shadow":{"type":"math_number","id":";WK{Q.U:He;aUV$s*^}~","fields":{"NUM":0}},"block":{"type":"math_arithmetic","id":"VPc.ubB_,/!R0Gj%b/N0","fields":{"OP":"ADD"},"inputs":{"A":{"shadow":{"type":"math_number","id":"U=I^~z`Pgn}Rn%(vFo_`","fields":{"NUM":1}},"block":{"type":"variables_get","id":"vG8md=~0Ff,K6jOKT2}~","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A"}}}},"B":{"shadow":{"type":"math_number","id":"|G$_iUUWQC?Q4slL2xK?","fields":{"NUM":1}}}}}},"TO":{"shadow":{"type":"math_number","id":"P@?7YAgd=`-e1Z(e+=G{","fields":{"NUM":10}},"block":{"type":"board_length","id":"98?]jS3`5#Xgv|N]d|R4"}},"BY":{"shadow":{"type":"math_number","id":"V;6%MhD^R3oGA!5zY=mE","fields":{"NUM":1}}},"DO":{"block":{"type":"controls_if","id":"t2#]9.qLUB+VzgzvC^$w","inputs":{"IF0":{"block":{"type":"check_index","id":"imq(gAFgS#tNah=a-S6R","inputs":{"INDEX":{"shadow":{"type":"variables_get","id":"sy)iQf(4@t%.~u2|/Z3F","fields":{"VAR":{"id":"yk-M5,%0@5F(KM`BRh6r","name":"j","type":""}}}},"VALUE":{"shadow":{"type":"text","id":"?Cigr^TUrf$u;=usCR8]","fields":{"TEXT":""}}}}}},"DO0":{"block":{"type":"variables_set","id":"9@sCn1+60|f[9jM3nCi,","fields":{"VAR":{"id":"bQUXxuu{7lk*Y+/([~fA"}},"inputs":{"VALUE":{"block":{"type":"key_pair","id":"+9nhMt-LdCK:[D02zLw5","inputs":{"KEY1":{"block":{"type":"variables_get","id":"yP3N3|9cefgu^o#:.SF6","fields":{"VAR":{"id":"8#)|9w]F?{,)kP:s+X(A"}}}},"KEY2":{"block":{"type":"variables_get","id":"P7A^Ed?JX]uRd:`c#UGy","fields":{"VAR":{"id":"yk-M5,%0@5F(KM`BRh6r"}}}}}}}},"next":{"block":{"type":"update_dict","id":"K-iOhYiJw)ujgL7O^lwz","fields":{"NAME":{"id":"9opK!{UC.*(_THqPAiBd"}},"inputs":{"KEY":{"block":{"type":"variables_get","id":"i0VZc}PfA4^1?Ct-Bt%J","fields":{"VAR":{"id":"bQUXxuu{7lk*Y+/([~fA"}}}},"VALUE":{"block":{"type":"variables_get","id":"R{K{Iy?r+0y|2U{LID1C","fields":{"VAR":{"id":"xsK10iLQGUyJ:XW-SI%+"}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"LINEAR":{"block":{"type":"variables_get","id":"?mE!I;uefCZ$BLw4=oQ^","fields":{"VAR":{"id":"{8[bKRn2f;Y1.$sOo;{#"}}}},"QUADRATIC":{"block":{"type":"variables_get","id":"_ae{2lq~3w*`sJ*Ke|7o","fields":{"VAR":{"id":"9opK!{UC.*(_THqPAiBd"}}}}}}]},"variables":[{"name":"linear","id":"{8[bKRn2f;Y1.$sOo;{#"},{"name":"quadratic","id":"9opK!{UC.*(_THqPAiBd"},{"name":"penalty","id":"xsK10iLQGUyJ:XW-SI%+"},{"name":"i","id":"8#)|9w]F?{,)kP:s+X(A"},{"name":"item","id":"kKYZ/}q|s_CwM{%Uw,_("},{"name":"j","id":"yk-M5,%0@5F(KM`BRh6r"},{"name":"k","id":"0e~lfiU`y^@k/BaJn/{E"},{"name":"m","id":"}Zil)c;w9f=In1boo:.;"},{"name":"n","id":";4^{2Ft8oHYyML;a(4ix"},{"name":"pairKey","id":"bQUXxuu{7lk*Y+/([~fA"},{"name":"o","id":"a_XYtwIL3Z-r];Q/,(D~"}]}';
    const realState = JSON.parse(state);

    // Deserialize the state.
    Blockly.serialization.workspaces.load(realState, workspace);    

  }


  const fetchWorkspaces = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/workspaces');
      if (!response.ok) throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
      const data = await response.json();
      setWorkspaces(data.workspaces || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error.message);
      alert('Error fetching workspaces. See console for details.');
    }
  };


  const saveWorkspaceToServer = async (workspaceName, workspaceState) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workspaceName,
          state: workspaceState,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save workspace: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result.message);
      alert(result.message);
    } catch (error) {
      console.error('Error saving workspace:', error.message);
      alert(`Error saving workspace: ${error.message}`);
    }
  };
  

  const loadWorkspaceFromServer = async (workspaceName) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/workspaces/${encodeURIComponent(workspaceName)}`);
      if (!response.ok) {
        throw new Error(`Failed to load workspace: ${response.statusText}`);
      }
  
      const { state } = await response.json();
      if (state) {
        Blockly.serialization.workspaces.load(state, workspace); // Load the retrieved state into the workspace
        alert(`Workspace '${workspaceName}' loaded successfully.`);
      }
    } catch (error) {
      console.error('Error loading workspace:', error.message);
      alert(`Error loading workspace: ${error.message}`);
    }
  };
  

  const saveWorkspace = async () => {
    if (!workspace) {
      alert('Workspace is not initialized.');
      return;
    }

    const name = prompt('Enter a name for the workspace:');
    if (!name) return;

    const state = Blockly.serialization.workspaces.save(workspace);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, state }),
      });

      if (!response.ok) throw new Error(`Failed to save workspace: ${response.statusText}`);
      alert(`Workspace "${name}" saved successfully.`);
      fetchWorkspaces();
    } catch (error) {
      console.error('Error saving workspace:', error.message);
      alert('Error saving workspace. See console for details.');
    }
  };


  const loadWorkspace = async () => {
    const name = prompt('Enter the name of the workspace to load:');
    if (!name) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/workspaces/${encodeURIComponent(name)}`);
      if (!response.ok) throw new Error(`Failed to load workspace: ${response.statusText}`);

      const { state } = await response.json();
      Blockly.serialization.workspaces.load(state, workspace);
      alert(`Workspace "${name}" loaded successfully.`);
    } catch (error) {
      console.error('Error loading workspace:', error.message);
      alert('Error loading workspace. See console for details.');
    }
  };


  // **EXPORT FUNCTION (Now with Editable Filename)**
  const exportWorkspace = () => {
    if (!workspace) return alert("No workspace found.");
    
    const state = Blockly.serialization.workspaces.save(workspace);
    const jsonData = JSON.stringify(state, null, 2);
    
    // Prompt user for filename
    let filename = prompt("Enter a name for the exported workspace:", "workspace");
    if (!filename) return; // Cancelled or empty input
    
    // Ensure filename ends with .json
    if (!filename.endsWith(".json")) {
      filename += ".json";
    }

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    log(`> Workspace exported successfully as "${filename}".\n\n`);
  };


  // **IMPORT FUNCTION**
  const importWorkspace = (event) => {
    const file = event.target.files[0];
    if (!file) return alert("No file selected.");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        Blockly.serialization.workspaces.load(json, workspace);
        log(`> Workspace imported successfully from "${file.name}".\n\n`);
      } catch (error) {
        alert("Invalid file format. Please upload a valid .json workspace file.");
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);
  };


  const listWorkspaces = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/workspaces', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
      }
  
      const data = await response.json();
      setWorkspaces(data.workspaces || []); // Update state with fetched workspaces
      console.log('Workspaces:', data.workspaces);
    } catch (error) {
      console.error('Error listing workspaces:', error);
      alert('Error fetching workspaces. Check console for details.');
    }
  };
  

  const deleteWorkspace = async (workspaceName) => {
    if (!window.confirm(`Are you sure you want to delete the workspace "${workspaceName}"?`)) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/workspaces/${encodeURIComponent(workspaceName)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete workspace: ${response.statusText}`);
      }
  
      const data = await response.json();
      alert(`Workspace "${workspaceName}" deleted successfully.`);
      await listWorkspaces(); // Refresh workspace list after deletion
    } catch (error) {
      console.error('Error deleting workspace:', error);
      alert('Error deleting workspace. Check console for details.');
    }
  };   


  const sendToQuantumServer = async (quboData) => {
    console.log("📤 Sending QUBO Data to Quantum Server:", JSON.stringify(quboData, null, 2));

    try {
        const response = await fetch('http://127.0.0.1:8000/quantum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quboData)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Quantum Server Response:", data);

    } catch (error) {
        console.error("🚨 Quantum Server Error:", error.message);
        alert(`Quantum Server Error: ${error.message}`);
    }
};


  mainCodeHandlingFunction(code); //sets the main component code state (passes the code up to the main component)
  /*
    blockly-area: div that comprises the BlocklyComponent
    blockly-div: div that contains the workspace itself, and is what workspaceRef refers to for injection
    GenerateCodeButton: component containing button for code generation, and has the workspace passed into it so it can generate the python code from it
    After the workspace state has been changed, the generate code button gets rerendered with the new workspace passed into it
  */
  return (
    <div className="blockly-area">
    <h2>Workspace</h2>
    <div className="blockly-div" ref={workspaceRef} style={{ height: "500px", width: "100%" }}></div>
    <div className="controls">
      <GenerateCodeButton workspace={workspace} blocklyCodeHandlingFunction={codeHandler} />
      <SaveAsBlockButton workspace={workspace} />
      <button onClick={saveWorkspace}>Save Workspace</button>
      <button onClick={loadWorkspace}>Load Workspace</button>
      <button onClick={exportWorkspace}>Export Workspace</button>
      <input type="file" accept=".json" onChange={importWorkspace} />
    </div>
    <div className="workspace-manager">
      <h3>Saved Workspaces</h3>
      <button onClick={listWorkspaces}>Refresh Workspaces</button>
      {workspaces.length > 0 ? (
        <table className="workspace-table">
          <thead>
            <tr>
              <th>Workspace Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workspaces.map((name) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <button onClick={() => deleteWorkspace(name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved workspaces found.</p>
      )}
    </div>
  </div>
  );
}

export default BlocklyComponent;