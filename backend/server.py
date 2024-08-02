import json

from flask import Flask, request, jsonify
import datetime
from compilecode import check_if_compilable
from checkinput import validate_input, add_feedback, validate_question
from create_prompts import base_prompts, manual_prompt, check_answer_prompt
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
    user_question = request.json['manualTopic']
    user_input = request.json['inputCode']

    is_valid = validate_input(user_input, user_question)

    if not is_valid:
        return jsonify({
            'error': 'Input missing',
            'output': 'Question or Code missing'
        })
    compilation_result = check_if_compilable(user_input)

    if 'error' in compilation_result:
        return jsonify(compilation_result)

    # general prompt config with the full prompt, the temperature and max. token length in responses
    prompt_config = manual_prompt(user_question, user_input)

    # make the chatgpt request
    response = make_chatgpt_request(prompt_config)

    # return the response to the frontend
    return jsonify(response)


@app.route('/explain-prompts', methods=['POST'])
def explain_prompts():
    topic = request.json['promptlessTopic']
    user_input = request.json['inputCode']
    feedback = request.json['feedback']

    # check if both code and a prompt exist
    is_valid = validate_input(user_input, topic)

    if not is_valid:
        return jsonify({
            'error': 'Input missing',
            'output': 'Question or Code missing'
        })

    # compile the code to avoid empty, unnecessary api calls
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
    return jsonify(response)


@app.route('/check-quiz-answers', methods=['POST'])
def check_quiz_answers():
    question = request.json['question']
    user_answer = request.json['userAnswer']

    params_valid = validate_input(question, user_answer)
    question_valid = validate_question(question)

    if not params_valid:
        return jsonify({
            'error': 'Question or Answer missing',
            'output': 'Question or Answer missing. '
                      'Make sure that both the question and an answer are provided'
        }, 406)
    if question_valid != "":
        return jsonify({
            'error': 'Question Format error',
            'output': 'There was something wrong with the format of the question. Error: ' + question_valid
        }, 406)

    prompt_config = check_answer_prompt(question, user_answer)

    response = make_chatgpt_request(prompt_config)

    # chatgpt returns an JSON object with the answer to make it accessible in the frontend, the string is converted
    # to a python dictionary and then placed in the response
    evaluation = response['text']

    # converting the answer string to a python dict
    try:
        evaluation_dict = json.loads(evaluation)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse response: {evaluation}") from e

    response = {
        "text": evaluation_dict,
        "user": False
    }

    return jsonify(response)


# todo
@app.route('/delete-context', methods=['GET'])
def delete_context():
    return {
        'status': 'success',
    }


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    # serve(app, host="0.0.0.0", port=8000)
