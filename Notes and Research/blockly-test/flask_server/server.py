import sys
from flask import Flask, request, jsonify
from io import StringIO

app = Flask(__name__)

@app.route('/quantum', methods=['POST'])
def index():
    # get the request payload
    data = request.get_json()

    # set up IO buffer and redirect standard output to it
    output = StringIO()
    sys.stdout = output

    # execute code, which will feed its standard output to the output buffer
    exec(data['code'])

    # reset the standard output to the system
    sys.stdout = sys.__stdout__
    
    # result is set to the contents of the buffer
    result = output.getvalue()

    # return a json containing result
    return jsonify({'result': result}), 200

if __name__ == '__main__':
    app.run(debug=True)