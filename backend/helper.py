import json


def validate_input(param1, param2):
    if not param1:
        return False
    if not param2:
        return False
    return True


def add_feedback(feedback):
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
    if not isinstance(question, dict):
        return "question must be a dictionary"
    if "text" not in question or not isinstance(question["text"], str):
        return "question['text'] must be a string"
    if "answers" not in question or not isinstance(question["answers"], list):
        return "question['answers'] must be a list"
    else:
        return ""


def json_string_to_python_dict(json_string):
    try:
        python_dict = json.loads(json_string)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse response: {json_string}") from e

    response = {
        "text": python_dict,
        "user": False
    }

    return response
