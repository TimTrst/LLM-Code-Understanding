import os

from dotenv import load_dotenv
from flask import jsonify
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),
    organization=os.getenv('OPENAI_ORG_ID'),
    project=os.getenv('OPENAI_PROJECT_ID'),
)

model = "gpt-3.5-turbo"


def make_chatgpt_request(prompt_config):
    if not prompt_config:
        return jsonify({"error": "No prompt config provided"}), 400

    print("oh oh")

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt_config["prompt"]}
            ],
            temperature=prompt_config["temperature"],
            max_tokens=prompt_config["max_tokens"]
        )

        if response:
            return jsonify({
                'text': response.choices[0].message.content,
                'user': False
            })
        else:
            return jsonify({'error': 'Something went wrong while trying to get an answer from openai'})

    except Exception as e:
        print("An error occurred:", str(e))
        return None
