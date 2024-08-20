def base_prompts(topic, user_input, feedback):
    sub_prompt = ""
    temperature = 0
    max_tokens = 0

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
                "---"
                "YOUR MAIN TASK: "
                + sub_prompt +
                "---"
                "ADDITIONAL INFORMATION: "
                "Highlight the base case and recursive "
                "case. Explain how the recursive calls work by providing an ASCII-art visual representation of the "
                "call stack's active and passive flow. "
                + feedback +
                "---"
                "CODE: "
                "Code snippet: ``` " + user_input + " ```. "
                                                    "CLOSING REMARKS"
                                                    "Don't copy the whole code snippet in the answer, if needed, "
                                                    "provide only parts. Maximum tokens: 600."
                                                    "Provide a clear and understandable explanation of the code for "
                                                    "the novice programming student,"
                                                    "who is currently learning about recursion."
        ),
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config


def manual_prompt(user_question, user_input):
    max_tokens = 600

    prompt_config = {
        "prompt": ("You are a tutor, helping a student understand recursive functions in computer science. The "
                   "student is asking you a question with a prompt they have formulated themselves. "
                   "---"
                   "STUDENT PROMPT: "
                   + user_question +
                   "---"
                   "CODE CONTEXT: "
                   "The user might ask questions about the following code that you should consider: " + user_input + " "
                   "---"
                   "CLOSING REMARKS: "
                   "Use a maximum of 500 tokens in your answer."),
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
    You are an evaluation system that is evaluating a student's answer to a quiz question.
    ---
    QUESTION: 
    "{question_extracted}"
    ---
    CORRECT ANSWER: 
    "{correct_answer}"
    ---
    STUDENT ANSWER:
     "{user_answer}"
    Return the evaluation in the following JSON format: {{ "correct": True/False, "misconception": [use the 
    misconceptions names (only provide the names in this array) without descriptions from the provided context based 
    on the provided student answer. Leave array empty if none match or if the question was correctly answered.] }} """,

        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config


def analyse_results_prompt(misconceptions):
    max_tokens = 500
    temperature = 0.4

    prompt_config = {
        "prompt": f""" 
        You are a tutor assessing a student's understanding of recursion. 
        ---
        YOUR MAIN TASK:
        Based on a quiz before and after the use of a learning system, the following misconceptions that the 
        student might be struggling with have been identified. Match the misconceptions with the given misconceptions 
        in context. Return an evaluation explaining what the user is struggling with and what they may not 
        understand. 
        ---
        MISCONCEPTIONS:
        {misconceptions}.
        ---
        ADDITIONAL INFORMATION:
        Directly address the student. Don't mention the exact misconception but explain what this means for the student. 
        ---
        RETURN FORMAT:
        Return the evaluation in the following JSON format: 
        {{ "result": insert evaluation here }}. Only provide the JSON in the response. 
        """,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    return prompt_config


def gpt_response_validation_prompt(gpt_responses):
    max_tokens = 600
    temperature = 0.3

    prompt_config = {
        "prompt":
            f""" 
                You are an expert assessing explanations of recursive python functions. The explanations are 
                supposed to help novice learners to understand recursion and python code. Assume that the learners 
                do not have much experience with programming and recursion as a concept.
                ---
                YOUR MAIN TASK:
                You are comparing several explanations to the same code about a recursive python function
                Compare these in several aspects: 1. Clarity and Simplicity, 2. Conceptual Understanding,
                3. Appropriate Complexity 4. Accuracy 5. Encouraging Mental Models. 
                For each explanation, please provide a score between 1 and 10 for each criterion and then sum up these
                scores to give a final score for each explanation.
                ---
                RETURN FORMAT:
                Return the evaluation in the following JSON format:
                { {
                "explanations": [
                    {
                        "explanation_id": 0,
                        "criteria_scores": {
                            "Clarity and Simplicity": 8,
                            "Conceptual Understanding": 9,
                            "Appropriate Complexity": 7,
                            "Accuracy": 6,
                            "Encouraging Mental Models": 8,
                        },
                        "final_score": 38
                    },
                    {
                        "explanation_id": 1,
                        "criteria_scores": {
                            "Clarity and Simplicity": 4,
                            "Conceptual Understanding": 6,
                            "Appropriate Complexity": 5,
                            "Accuracy": 9,
                            "Encouraging Mental Models": 5,
                        },
                        "final_score": 29
                    }
                ]
            } }
            ---
            EXPLANATIONS:
            Here are the explanations provided in an array with strings. {gpt_responses}           
            ---
            CLOSING REMARKS:
            Now evaluate the explanations based on the criteria and provide me with the final result in the JSON format
            mentioned before   
            """,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    return prompt_config
