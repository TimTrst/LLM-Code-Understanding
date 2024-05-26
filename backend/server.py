from flask import Flask, render_template, request, jsonify
from LLM import make_request_bert
from waitress import serve
import datetime

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
    question = request.args.get('api_request')
    llm_response = make_request_bert(question)
    return render_template(
        "code_understanding.html",
        response=llm_response
    )


@app.route('/ask', methods=['POST'])
def ask():
    question = request.json.get('question')

    response = make_request_bert(question)

    if response.status_code == 200:
        data = response.json()
        answer = data.get('answer', 'Sorry, I could not find an answer to your question.')
    else:
        answer = 'Error: Unable to contact Open Assistant API.'

    return jsonify({'answer': answer})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    # serve(app, host="0.0.0.0", port=5000)

