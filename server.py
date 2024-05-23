from flask import Flask, render_template, request, jsonify
from LLM import make_request_bert
import requests
from waitress import serve

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return 'This is the flask server'
    return render_template('index.html')

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
    app.run(debug=True)
    #serve(app, host="0.0.0.0", port=5000)
