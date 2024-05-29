import torch
from flask import render_template
from dotenv import load_dotenv

load_dotenv()

def chain_setup():
    template = """<|prompter|>{question}<|endoftext|>
    <|assistant|>"""

def generate_response(question, llm_chain):
    if not bool(question.strip()):
        question = "Please tell the user, that he needs input something."

    response = llm_chain.run(question)

    if not response['cod'] == 200:
        return render_template('request-went-wrong.html')

    return response


