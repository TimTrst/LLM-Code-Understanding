import os
from flask import Flask, render_template, request, jsonify
import datetime
from compilecode import compile_and_run, save_code_to_file

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return {
        'Project': 'Leveraging LLMs to help novice learners wih code understanding',
        'Date': datetime.datetime.now(),
        'Backend': "Flask",
        'Frontend': "React"
    }


@app.route('/requests')
def get_request():
   return {

   }


@app.route('/compile', methods=['POST'])
def compile_code():
    data = request.get_json()
    code = data.get('code')
    language = data.get('language')

    if not code or not language:
        return jsonify({'error': 'Code and language are required'}), 400

    # Temporary file to save the code
    file_path = save_code_to_file(code, language)

    # Compile the code
    result = compile_and_run(file_path, language)

    # Clean up the temporary file
    os.remove(file_path)

    return jsonify(result)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    #serve(app, host="0.0.0.0", port=8000)

