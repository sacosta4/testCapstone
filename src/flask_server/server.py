import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from dimod import BinaryQuadraticModel
from neal import SimulatedAnnealingSampler
from io import StringIO
import json

app = Flask(__name__)
CORS(app)

# JSON representation of the QUBO problem
qubo_json = """
{
  "linear": {
    "0": 2,
    "1": 4,
    "2": 6
  },
  "quadratic": {
    "0,1": 3,
    "0,2": -2,
    "1,2": 1
  }
}
"""

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
  solution_index = solution_index[0]

  return jsonify({'solution': solution_index, 'energy': solution.first.energy}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)