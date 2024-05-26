import torch
from flask import render_template
from transformers import BertTokenizer, BertForQuestionAnswering
from dotenv import load_dotenv

load_dotenv()
model_name = "deepset/bert-base-cased-squad2"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForQuestionAnswering.from_pretrained(model_name)

context = "Recursion is a method of solving a problem where the solution depends on solving smaller instances of the same problem. It typically involves a function calling itself."

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

def make_request_bert(question):
    input_text = question
    inputs = tokenizer.encode_plus(input_text, context, return_tensors="pt")
    input_ids = inputs["input_ids"].tolist()[0]

    #get berts output
    with torch.no_grad():
        outputs = model(**inputs)

    answer_start_scores=outputs.start_logits
    answer_end_scores = outputs.end_logits

    # Find the tokens with the highest `start` and `end` scores
    answer_start = torch.argmax(answer_start_scores)
    answer_end = torch.argmax(answer_end_scores) + 1

    # Convert tokens to answer
    #answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    predict_answer_tokens = inputs.input_ids[0, answer_start: answer_end + 1]
    answer = tokenizer.decode(predict_answer_tokens, skip_special_tokens=True)

    return answer
