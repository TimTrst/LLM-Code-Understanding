import json


def validate_input(param1, param2):
    """
    Checks if the parameters exist.
    :param param1: Parameter 1
    :param param2: Parameter 2
    :return: Boolean
    """
    if not param1:
        return False
    if not param2:
        return False
    return True


def add_feedback(feedback):
    """
    This will return a string with user feedback included. This can be included in a template prompt.
    :param feedback: The user feedback provided as an integer (1-5)
    :return: Feedback string
    """
    if feedback != 0:
        feedback_string = (
            f"---\n"
            f"USER FEEDBACK:\n"
            f"The User rated your last response in terms of understandability on a scale from 1 to 5. "
            f"1 means I did not understand at all and 5 means I understood fully. Adjust the next response "
            f"accordingly. User Rating: {feedback}."
        )
        return feedback_string
    else:
        return ""


def validate_question(question):
    """
    Checks the correct structure and information necessary of quiz questions.
    :param question: A quiz question
    :return: Empty string if correct, else error string.
    """
    if not isinstance(question, dict):
        return "question must be a dictionary"
    if "text" not in question or not isinstance(question["text"], str):
        return "question['text'] must be a string"
    if "answers" not in question or not isinstance(question["answers"], list):
        return "question['answers'] must be a list"
    else:
        return ""


def json_string_to_python_dict(json_string):
    """
    Takes a string from a LLM response and extracts the JSON. The JSON is converted into a python dictionary.
    This is necessary to evaluate the LLM answers with python code.
    :param json_string: The LLM answer as a string
    :return: LLM answer as python dictionary
    """
    try:
        # Strip off any leading/trailing whitespace or formatting markers
        cleaned_json_string = json_string.strip().replace('```json', '').replace('```', '').strip()

        # Load the cleaned JSON string
        python_dict = json.loads(cleaned_json_string)

    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse response: {json_string}") from e

    response = {
        "text": python_dict,
        "user": False
    }

    return response


def choose_best_gpt_answer(evaluation_dict):
    """
    Takes a python dictionary with evaluated LLM responses. Chooses the response with the highest total score.
    :param evaluation_dict: The evaluated responses by the LLM as a python dictionary
    :return: Best response id as integer
    """
    highest_score = -1
    best_explanation_id = 0

    explanations = evaluation_dict.get('explanations', [])

    for explanation in explanations:
        # Extract the final score and ID
        final_score = explanation.get('final_score', -1)
        explanation_id = explanation.get('explanation_id', None)

        # Update the highest score and ID if the current score is higher
        if final_score > highest_score:
            highest_score = final_score
            best_explanation_id = explanation_id

    return best_explanation_id
