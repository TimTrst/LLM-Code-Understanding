import time
from flask import Flask, request, jsonify
import datetime
from compilecode import check_if_compilable
from checkinput import validate_input, add_feedback
from create_prompts import base_prompts, manual_prompt
from llm import make_chatgpt_request
from config import Config

app = Flask(__name__)

app.config.from_object(Config)



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

    # general prompt config with the full prompt, the temperature and max. token length in responses
    prompt_config = manual_prompt(user_question, user_input)

    # make the chatgpt request
    response = make_chatgpt_request(prompt_config)

    # return the response to the frontend
    return response


@app.route('/explain-prompts', methods=['POST'])
def explain_prompts():
    topic = request.json['promptlessTopic']
    user_input = request.json['inputCode']
    feedback = request.json['feedback']

    # check if both code and a prompt exist
    validate_input(user_input, topic)

    # compile the result to avoid unnecessary api calls
    compilation_result = check_if_compilable(user_input)

    if 'error' in compilation_result:
        return jsonify(compilation_result)

    # if feedback was given by the user then add it here
    feedback_string = add_feedback(feedback)

    # general prompt config with the full prompt, the temperature and max. token length in responses
    prompt_config = base_prompts(topic, user_input, feedback_string)

    # make the chatgpt request
    response = make_chatgpt_request(prompt_config)

    # return the response to the frontend
    return response


@app.route('/delete-context', methods=['GET'])
def delete_context():
    return {
        'status': 'success',
    }


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    # serve(app, host="0.0.0.0", port=8000)
