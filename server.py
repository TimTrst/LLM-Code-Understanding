from flask import Flask, render_template, request
from LLM import make_request_bert
from waitress import serve

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/requests')
def get_request():  # put application's code here
    question = request.args.get('api_request')
    llm_response = make_request_bert(question)
    return render_template(
        "code_understanding.html",
        response=llm_response
    )

if __name__ == '__main__':
    app.run(debug=True)
    #serve(app, host="0.0.0.0", port=5000)
