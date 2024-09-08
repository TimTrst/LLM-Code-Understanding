import json
import os
import concurrent.futures

from dotenv import load_dotenv
from flask import jsonify
from openai import OpenAI

from create_prompts import summarize_prompt

load_dotenv()

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),
    organization=os.getenv('OPENAI_ORG_ID'),
    project=os.getenv('OPENAI_PROJECT_ID'),
)

gpt_turbo = "gpt-3.5-turbo"
gpt_4 = "gpt-4"
gpt_4o = "gpt-4o"
gpt_4o_mini = "gpt-4o-mini"

model = gpt_turbo

# load the misconceptions
try:
    with open('misconceptions.json') as f:
        misconceptions = json.load(f)
except FileNotFoundError as e:
    raise FileNotFoundError("misconceptions.json file not found.") from e

summary = ""

# always 3 more because the assistant message and summary messages need to be saved in the history aswell
history_length = {
    "two_turns": 5,  # latest 2 turns (u1:s1) are saved as they are, rest is summarized
    "four_turns": 7,  # latest 4 turns (u1:s1, u2:s2)
    "six_turns": 9  # (u1:s1, u2:s2, s)
}

# initialize the history with the misconceptions as context (for the evaluations)
dialog_history = [{"role": "system", "content": f"The following misconceptions about recursion should be considered "
                                                f"when evaluating requests: {misconceptions}"}]


def summarize_dialog(prev_summary, user_request, system_response):
    """
            This function will take the previous summary
            and a user request-system response pair to make a new summary through a LLM
            :param prev_summary: Dialog summary so far
            :param user_request: The user action
            :param system_response: The system action
            :return: Returns the summary as a string
    """
    prompt_config = summarize_prompt(prev_summary, user_request, system_response)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system",
                 "content": "You are a helpful assistant, summarizing a conversation between a user and a AI model."},
                {"role": "user", "content": prompt_config["prompt"]}
            ],
            temperature=prompt_config["temperature"],
            max_tokens=prompt_config["max_tokens"]
        )

        if response:
            return response.choices[0].message.content
        else:
            return ""

    except Exception as e:
        print("An error occurred while trying to summarize the dialog:", str(e))
        return None


def add_new_response(system_response):
    """
        This function adjusts the history by adding a new system response. The oldest saved user/system action pair
        will be deleted from the history.
        :param system_response: System action to be added
    """
    global summary
    is_first_summary = True
    dialog_history.append({"role": "assistant", "content": system_response})

    # see if the max length of the history is reached
    if len(dialog_history) >= history_length["four_turns"]:
        # if there is no summary yet, then take the first request/response pair that is saved after the context message
        if summary == "":
            user_request_index = 1
            system_response_index = 2
        # else use the oldest request/response pair after the summary was inserted
        else:
            is_first_summary = False
            user_request_index = 3
            system_response_index = 4

        summary = summarize_dialog(summary, dialog_history[user_request_index],
                                   dialog_history[system_response_index])

        dialog_history[1] = {"role": "user", "content": "Summarize the conversation up to this point."}
        dialog_history[2] = {"role": "assistant", "content": summary}

        # only remove the oldest request/response pair in the history
        # if it wasn't already replaced by the summary in the first run
        if not is_first_summary:
            dialog_history.pop(3)
            dialog_history.pop(3)


def make_chatgpt_request(prompt_config, use_history):
    """
        This function adjusts the history by adding a new system response. The oldest saved user/system action pair
        will be deleted from the history.
        :param prompt_config: System action to be added
        :param use_history: System action to be added
        :return dictionary with the system response (user: False is a indicator for the frontend)
    """
    if not prompt_config:
        return jsonify({"error": "No prompt config provided"}), 400

    print("Prompt fired")

    messages = []

    if use_history:
        dialog_history.append({"role": "user", "content": prompt_config["prompt"]})
        messages = dialog_history
    else:
        messages = [
            {"role": "system", "content": f"The following misconceptions about recursion should be considered "
                                          f"when evaluating requests: {misconceptions}"},
            {"role": "user", "content": prompt_config["prompt"]}
        ]

    # print("ALL MESSAGES")
    # print(messages)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=prompt_config["temperature"],
            max_tokens=prompt_config["max_tokens"]
        )

        # print(response.choices[0].message.content)
        if use_history:
            add_new_response(response.choices[0].message.content)

        # print("Dialog Summary:")
        # print(summary)
        #print("Dialog History:")
        #print(dialog_history)
        # for turn in dialog_history:
        #    print(turn["role"])

        if response:
            return {
                'text': response.choices[0].message.content,
                'user': False
            }
        else:
            return {'error': 'Something went wrong while trying to get an answer from openai'}

    except Exception as e:
        print("An error occurred:", str(e))
        return None


def execute_requests_parallely(prompt_config, num_requests=3):
    """
       This function takes a prompt configuration and executes it 3 times parallely.
       :param prompt_config: System action to be added
       :param num_requests: System action to be added
       :return list of all parallely executed system responses
    """
    gpt_response_array = []

    def request_task():
        return make_chatgpt_request(prompt_config, False)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(request_task) for _ in range(num_requests)]

        for future in concurrent.futures.as_completed(futures):
            try:
                result = future.result()
                if result:
                    answer = result["text"]
                    answer_object = {"explanation": answer}
                    gpt_response_array.append(answer_object)
            except Exception as e:
                print(f"Request failed: {e}")

    return gpt_response_array


def clear_history():
    """
        This function clears the dialog history.
    """
    global summary
    global dialog_history

    summary = ""
    dialog_history = dialog_history[:1]
