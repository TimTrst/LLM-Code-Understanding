import os
import time

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


@app.route('/manual-requests', methods=['POST'])
def get_manual_request():
    time.sleep(3)
    return {
        'text': "Recursion is beautiful",
        'user': False
    }

@app.route('/explain-prompts', methods=['POST'])
def explain_prompts():
    topic = request.json['topic']
    user_input = request.json['input']

    prompt = ""

    if topic == "backwardFlow":
        prompt = f"Explain backward flow in recursion using the following example:\n{user_input}"
    elif topic == "infiniteRecursion":
        prompt = f"Explain the risk of infinite recursion and how to avoid it using the following example:\n{user_input}"
    elif topic == "recursiveCalls":
        prompt = f"Explain how to formulate recursive calls using the following example:\n{user_input}"
    elif topic == "returnKeyword":
        prompt = f"Explain the usage of the return keyword in recursion using the following example:\n{user_input}"
    elif topic == "baseCasePosition":
        prompt = f"Explain the correct positioning of the base case in recursion using the following example:\n{user_input}"
    elif topic == "baseCaseActions":
        prompt = f"Explain the actions of the base case in recursion using the following example:\n{user_input}"
    elif topic == "writingBaseCases":
        prompt = f"Provide guidance on writing base cases in recursion using the following example:\n{user_input}"
    elif topic == "variableUpdates":
        prompt = f"Explain how variable updates work in recursion using the following example:\n{user_input}"

    response = {
        'text': 'Another cute recursion text to output to my beautiful web interface'
    }
    #response = openai.Completion.create(
    #    engine="text-davinci-003",
    #    prompt=prompt,
    #   max_tokens=150
    #)
    return response
    #return jsonify(response.choices[0].text.strip())

def create_prompt(user_input, misconceptions):
    prompts = []
    if "BF1" in misconceptions:
        prompts.append(
            f"After a recursive call, the program continues executing statements following the call in the current stack frame. Let's look at an example:\n{user_input}")
    if "INF1" in misconceptions:
        prompts.append(
            f"Even if a base case exists, the recursive calls must progress towards it to avoid infinite recursion. Here's how:\n{user_input}")
    if "RC1" in misconceptions:
        prompts.append(
            f"Recursive calls need to break down the problem into smaller sub-problems until a base case is reached. Example:\n{user_input}")
    if "RC2" in misconceptions:
        prompts.append(
            f"Not all recursive functions need a return statement. Let's explore when it's necessary:\n{user_input}")
    if "BC1" in misconceptions:
        prompts.append(
            f"The base case can be placed logically anywhere in the function. Understand its role with this example:\n{user_input}")
    if "BC2" in misconceptions:
        prompts.append(
            f"The base case doesn't have to return a constant. It can return a variable or computed value. Example:\n{user_input}")
    if "VU1" in misconceptions:
        prompts.append(
            f"Variables in recursive calls are updated within their own stack frame. Learn how this works:\n{user_input}")

    combined_prompt = "\n\n".join(prompts)
    return combined_prompt


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
    # serve(app, host="0.0.0.0", port=8000)
