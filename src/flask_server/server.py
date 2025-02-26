import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from dimod import BinaryQuadraticModel
from neal import SimulatedAnnealingSampler
import os
import json

app = Flask(__name__)
CORS(app)

# Directory for storing workspace JSON files
WORKSPACE_DIR = "workspaces"
os.makedirs(WORKSPACE_DIR, exist_ok=True)  # Create the directory if it doesn't exist

# Quantum calculation route
@app.route('/quantum', methods=['POST'])
def calculate():
    data = request.json

    # Initialize the linear and quadratic dictionaries
    linear = {int(k): v for k, v in data["linear"].items()}
    quadratic = {(int(k.split(',')[0]), int(k.split(',')[1])): v for k, v in data["quadratic"].items()}

    # Create a Binary Quadratic Model (BQM)
    bqm = BinaryQuadraticModel(linear, quadratic, 0.0, 'BINARY')

    # Solve the BQM using Simulated Annealing
    sampler = SimulatedAnnealingSampler()
    solution = sampler.sample(bqm)

    solution_index = [int(k) for k, v in solution.first.sample.items() if v == 1]
    solution_index = solution_index[0] if solution_index else None

    return jsonify({'solution': solution_index, 'energy': solution.first.energy}), 200


# Save workspace route
@app.route('/api/workspaces', methods=['POST'])
def save_workspace():
    try:
        data = request.json
        workspace_name = data.get('name')
        workspace_state = data.get('state')

        if not workspace_name or not workspace_state:
            return jsonify({"error": "Missing 'name' or 'state'"}), 400

        # Ensure workspace_state has the expected Blockly format
        if not isinstance(workspace_state, dict) or "blocks" not in workspace_state:
            return jsonify({"error": "Invalid Blockly workspace format"}), 400

        # Define file path for saving
        file_path = os.path.join(WORKSPACE_DIR, f"{workspace_name}.json")

        # Save workspace JSON to file
        with open(file_path, 'w') as f:
            json.dump(workspace_state, f, indent=4)  # Pretty-print JSON for readability

        return jsonify({"message": f"Workspace '{workspace_name}' saved successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Load workspace route
@app.route('/api/workspaces/<workspace_name>', methods=['GET'])
def load_workspace(workspace_name):
    try:
        # Ensure Minimax workspace is preloaded
        if workspace_name.lower() == "minimax":
            minimax_file = "minimaxBlockly.json"
            minimax_path = os.path.join(WORKSPACE_DIR, minimax_file)

            if not os.path.exists(minimax_path):
                return jsonify({"error": "Minimax workspace file not found"}), 404

            with open(minimax_path, 'r') as f:
                workspace_state = json.load(f)

            return jsonify({"state": workspace_state}), 200

        # Load regular workspaces
        file_path = os.path.join(WORKSPACE_DIR, f"{workspace_name}.json")
        if not os.path.exists(file_path):
            return jsonify({"error": f"Workspace '{workspace_name}' not found"}), 404

        with open(file_path, 'r') as f:
            workspace_state = json.load(f)

        return jsonify({"state": workspace_state}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# List all saved workspaces
@app.route('/api/workspaces', methods=['GET'])
def list_workspaces():
    try:
        files = os.listdir(WORKSPACE_DIR)
        workspaces = [os.path.splitext(file)[0] for file in files if file.endswith('.json')]
        return jsonify({"workspaces": workspaces}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a specific workspace
@app.route('/api/workspaces/<workspace_name>', methods=['DELETE'])
def delete_workspace(workspace_name):
    try:
        file_path = os.path.join(WORKSPACE_DIR, f"{workspace_name}.json")

        if not os.path.exists(file_path):
            return jsonify({"error": f"Workspace '{workspace_name}' not found"}), 404

        os.remove(file_path)
        return jsonify({"message": f"Workspace '{workspace_name}' deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
