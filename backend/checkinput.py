def validate_input(code, question):
    if not code:
        return False
        # return jsonify({'error': 'Code required'}), 400
    if not question:
        return False
    return True


def add_feedback(feedback):
    if feedback != 0:
        feedback_string = (
            f"The User rated your last response in terms of understandability on a scale from 1 to 5. 1 "
            f"means i did not understand at all and 5 means i understood fully. Adjust the next response "
            f"accordingly. User Rating: {feedback}.")
        return feedback_string
    else:
        return ""
