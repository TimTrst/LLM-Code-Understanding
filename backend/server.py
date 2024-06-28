import time

from flask import Flask, render_template, request, jsonify
import datetime
from compilecode import compile_and_run, save_code_to_file, check_if_compilable
from checkinput import validate_input
from create_prompts import base_prompts

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


@app.route('/manual-prompts', methods=['POST'])
def get_manual_request():
    time.sleep(2)
    user_question = request.json['manualTopic']
    user_input = request.json['inputCode']

    validate_input(user_input, user_question)

    compilation_result = check_if_compilable(user_input)

    if 'error' in compilation_result:
        return jsonify(compilation_result)

    response = {
        'text': "Recursion is beautiful",
        'user': False
    }

    return jsonify(response)


@app.route('/explain-prompts', methods=['POST'])
def explain_prompts():
    topic = request.json['promptlessTopic']
    user_input = request.json['inputCode']
    feedback = request.json['feedback']
    feedback_string = ""

    validate_input(user_input, topic)

    compilation_result = check_if_compilable(user_input)

    if 'error' in compilation_result:
        return jsonify(compilation_result)

    if feedback != 0:
        feedback_string = (
            f"The User rated your last response in terms of understandability on a scale from 1 to 5. 1 "
            f"means i did not understand at all and 5 means i understood fully. Adjust the next response "
            f"accordingly. User Rating: {feedback}.")

    prompt_config = base_prompts(topic, user_input, feedback_string)

    print(prompt_config)

    time.sleep(2)

    response = {
        'text': 'Another cute recursion text to output to my beautiful web interface'
    }
    # response = openai.Completion.create(
    #    engine="text-davinci-003",
    #    prompt=prompt,
    #   max_tokens=150
    # )
    return jsonify(response)
    # return jsonify(response.choices[0].text.strip())


@app.route('/delete-context', methods=['GET'])
def delete_context():
    return {
        'status': 'success',
    }


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    # serve(app, host="0.0.0.0", port=8000)
