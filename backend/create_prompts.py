def base_prompts(topic, user_input, feedback):
    sub_prompt = ""
    temperature = 0
    max_tokens = 0

    print(topic)

    # constructing the sub prompts (key-concepts)
    # Sub-prompts are the core of the prompt
    # todo: see if explanations are core heavy or drift from actual explanations through too heavy template prompt
    if topic == "example":
        sub_prompt = (
            "Provide a real-world analogy for the following recursive code snippet. Explain how the recursive process "
            "in the code is similar to a real-world situation, making it easier for a novice programmer to understand. "
        )
        temperature = 0.7
        max_tokens = 700

    elif topic == "explain":
        sub_prompt = (
            "Focus on a general, easy to understand explanation of the following recursive code snippet. Do not be "
            "too specific about individual parts,"
            "but explain the whole concept using the provided code example. "
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "line_by_line":
        sub_prompt = (
            "Please provide a detailed, line-by-line explanation of the following recursive code snippet. Each line "
            "of code"
            "should be explained clearly, including the purpose of the line, how it contributes to the recursion, "
            "and any important"
            "concepts or terms. "
        )
        temperature = 0.2
        max_tokens = 700

    elif topic == "iterative_comparison":
        sub_prompt = (
            "Compare the following recursive code snippet with its iterative equivalent. Explain the differences in "
            "approach,"
            "performance, and readability. Provide both versions of the code."
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "optimization":
        sub_prompt = (
            "Show how the following recursive code snippet can be optimized. Discuss potential improvements and "
            "provide an optimized"
            "version of the code."
        )
        temperature = 0.2
        max_tokens = 700

        # Construct the full prompt
    prompt_config = {
        "prompt": (
                "You are a tutor helping a student understand recursive functions in computer science. "
                + sub_prompt +
                "Highlight the base case and recursive "
                "case. Explain"
                "how the recursive calls work by providing an ASCII-art visual representation of the call stack's "
                "active and passive flow."
                + feedback +
                " Code snippet: ``` " + user_input + " ```. "
                                                     "Don't copy the whole code snippet in the answer, if needed, provide only parts."
                                                     "Maximum tokens: 500"
        ),
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config


def manual_prompt(user_question, user_input):
    max_tokens = 800

    prompt_config = {
        "prompt": user_question,
        "max_tokens": max_tokens,
        "temperature": 0.6
    }

    return prompt_config


def check_answer_prompt(question, user_answer):
    max_tokens = 300
    temperature = 0.2

    question_extracted = question["text"]
    correct_answer = question["answers"][0]["text"]

    prompt_config = {
        "prompt": f"""
    Evaluate the following student's answer to a quiz question.

    Question: "{question_extracted}"
    Correct Answer: "{correct_answer}"
    Student's Answer: "{user_answer}"

    Return the evaluation in the following JSON format: {{ "correct": True/False, "misconception": [use the 
    misconceptions names (only provide the names in this array) without descriptions from the provided context based on the provided student answer. Leave 
    array empty if none match.] }} """,

        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config
