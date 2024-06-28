def validate_input(code, question):
    if not code:
        return False
        # return jsonify({'error': 'Code required'}), 400
    if not question:
        return False
    return True
