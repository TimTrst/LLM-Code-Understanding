from flask import Flask, render_template, request, jsonify
#from waitress import serve
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
    #llm_response = make_request_bert(question)
    return render_template(
        "code_understanding.html",
        #response=llm_response
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    #serve(app, host="0.0.0.0", port=8000)

