from flask import Flask, request, jsonify
import datetime
from compilecode import check_if_compilable
from helper import validate_input, add_feedback, validate_question, json_string_to_python_dict, choose_best_gpt_answer
from create_prompts import base_prompts, manual_prompt, check_answer_prompt, analyse_results_prompt, \
    choose_best_explanation_prompt, validate_own_answer_prompt
from llm import make_chatgpt_request, execute_requests_parallely, clear_history
from config import Config

app = Flask(__name__)

app.config.from_object(Config)


@app.route('/')
@app.route('/index')
def index():
    """
        index route to the base address of this project
        :return: Returns a test object that describes the project
    """
    return {
        'Project': 'Leveraging LLMs to help novice learners wih code understanding',
        'Date': datetime.datetime.now(),
        'Backend': "Flask",
        'Frontend': "React"
    }


@app.route('/manual-prompts', methods=['POST'])
def manual_prompts():
    """
        manual_prompts accepts manually written prompts by the user.
        These prompts get passed to the model as they are.
        :param user_question: The user prompt
        :param user_input: Code from the IDE frontend component
        :return: Returns a json object with the chat-gpt-model response
    """
    user_question = request.json['manualTopic']
    user_input = request.json['inputCode']

    # check if parameters exist
    is_valid = validate_input(user_input, user_question)

    if not is_valid:
        return jsonify({
            'error': 'Input missing',
            'output': 'Question or Code missing'
        })

    # see if the provided code is compilable (only compilable, not runnable/executable)
    compilation_result = check_if_compilable(user_input)

    if 'error' in compilation_result:
        return jsonify(compilation_result)

    # general prompt config with the full prompt, the temperature and max. token length in responses
    prompt_config = manual_prompt(user_question, user_input)

    # make the chatgpt request
    use_history = True
    response = make_chatgpt_request(prompt_config, use_history)

    # return the response to the frontend
    return jsonify(response)


@app.route('/explain-prompts', methods=['POST'])
def explain_prompts():
    """
        explain_prompts passes predefined prompts to the gpt-model.
        The prompts are created in create_prompts.py in the explain_prompts() function.
        :param topic: this is the user chosen pre-defined prompt in the frontend application
        :param user_input: Code from the IDE frontend component
        :return: Returns a json object with the chat-gpt-model response
    """
    topic = request.json['promptlessTopic']
    user_input = request.json['inputCode']
    feedback = request.json['feedback']

    print("no validation")

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
    use_history = True
    response = make_chatgpt_request(prompt_config, use_history)

    # return the response to the frontend
    return jsonify(response)


# no history yet (but possible)
@app.route('/explain-prompts-with-validation', methods=['POST'])
def explain_prompts_with_validation():
    """
        explain_prompts_with_validation passes predefined prompts to the gpt-model but with a validation action.
        This method tries to validate gpt answers. It does this by generating multiple answers of the same pre-defined
        question and sends them all to the gpt-model. The model is asked to evaluate the own answers based
        on some criteria. The "best" answer is then chosen.
        The prompts are created in create_prompts.py in the explain_prompts() function.
        :param topic: this is the user chosen pre-defined prompt in the frontend application
        :param user_input: Code from the IDE frontend component
        :return: Returns a json object with the "best" chat-gpt-model response
    """
    topic = request.json['promptlessTopic']
    user_input = request.json['inputCode']
    feedback = request.json['feedback']

    # for debugging purposes, infinite loops are no joke
    print("with validation")

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
    prompt_config_original = base_prompts(topic, user_input, feedback_string)

    # calls a function in llm.py which will execute one prompt multiple times parallely
    gpt_responses_array = execute_requests_parallely(prompt_config_original, 3)

    # sets the prompt for the validation of the generated responses
    prompt_config_validation = choose_best_explanation_prompt(gpt_responses_array, user_input)

    # this is the validation request to the openai api
    use_history = False
    gpt_response = make_chatgpt_request(prompt_config_validation, use_history)

    # extract the response
    gpt_evaluation = gpt_response['text']

    # convert the JSON string that the model returned to a python dictionary
    evaluation_dict = json_string_to_python_dict(gpt_evaluation)

    # choose highest scoring answer (choose_best_gpt_answer located in helper.py)
    best_gpt_answer = gpt_responses_array[choose_best_gpt_answer(evaluation_dict["text"])]

    # this will trigger the second validation step (check the best answer for mistakes)
    # this works in mysterious ways, sometimes it actually fixes the error. Sometimes it makes it wrong.
    prompt_config_validate = validate_own_answer_prompt(best_gpt_answer, user_input, prompt_config_original)
    # history wont work here yet
    use_history = False
    gpt_response = make_chatgpt_request(prompt_config_validate, use_history)
    validation_gpt_response = gpt_response['text']

    validation_gpt_response_dict = json_string_to_python_dict(validation_gpt_response)

    print("validation return:")
    print(validation_gpt_response_dict)

    if validation_gpt_response_dict["text"]["isCorrect"] == "yes":
        validated_explanation = best_gpt_answer
    else:
        validated_explanation = validation_gpt_response_dict["text"]["explanation"]

    result = {
        "text": validated_explanation,
        "user": False
    }

    # return the response to the frontend
    return jsonify(result)


@app.route('/check-quiz-answer', methods=['POST'])
def check_quiz_answers():
    """
        check_quiz_answers checks the answer that the user provided when submitting a quiz that included a question
        where the user was asked to type in their own answers. The question and the user's answer are passed to
        a gpt model. The model checks this answer for correctness and returns the result.
        :param question: The Question to be answered by the student (Object-> "id", "text", "answers")
        :param user_answer: The user's answer to the question.
        :return: Returns a json object with the chat-gpt-model response
    """
    question = request.json['question']
    user_answer = request.json['userAnswer']

    # check if parameters exist (and type for the question)
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

    # prompt for evaluating the user answers to quiz questions (explain type questions only)
    prompt_config = check_answer_prompt(question, user_answer)

    # openai api request with the final prompt config
    use_history = False
    gpt_response = make_chatgpt_request(prompt_config, use_history)

    # chatgpt returns an JSON object with the answer to make it accessible in the frontend, the string is converted
    # to a python dictionary and then placed in the response
    gpt_evaluation = gpt_response['text']

    # convert the JSON string that the model returned to a python dictionary
    evaluation_dict = json_string_to_python_dict(gpt_evaluation)

    # return the result to the frontend
    return jsonify(evaluation_dict)


@app.route('/analyse-quiz-results', methods=['POST'])
def analyse_quiz_results():
    """
        analyse_quiz_results aims to analyse misconceptions that were gathered through answers to quiz questions.
        The gpt model gets the whole list of misconceptions about recursion everytime in the context.
        The goal is to provide the student with an evaluation of their possible problems regarding recursion.
        :param misconceptions: An Array of misconceptions.
        :return: Returns a json object with the chat-gpt-model evaluation
    """

    misconceptions = request.json['misconceptions']

    # check if misconceptions were provided
    if not misconceptions:
        return jsonify({
            'error': 'Misconceptions are missing',
            'output': 'Misconceptions are missing',
        }, 406)

    # prompt for evaluating the results of the quizzes based on extracted misconceptions
    prompt_config = analyse_results_prompt(misconceptions)

    # openai api request with the prompt config
    use_history = False
    gpt_response = make_chatgpt_request(prompt_config, use_history)

    # extract the model response
    gpt_evaluation = gpt_response['text']

    # convert the JSON string that the model returned to a python dictionary
    evaluation_dict = json_string_to_python_dict(gpt_evaluation)

    return jsonify(evaluation_dict)


@app.route('/delete-context', methods=['GET'])
def delete_context():
    clear_history()
    return {
        'status': 'success',
    }


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    # serve(app, host="0.0.0.0", port=8000)
