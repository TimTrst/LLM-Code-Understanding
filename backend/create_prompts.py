def base_prompts(topic, user_input, feedback):
    sub_prompt = ""
    temperature = 0
    max_tokens = 0

    # constructing the sub prompts (key-concepts)
    # Sub-prompts are the core of the prompt-less interaction
    if topic == "explain":
        sub_prompt = (
            "Focus on a general, easy to understand explanation of the following recursive code snippet. Do not be "
            "too specific about individual parts,"
            "but explain the whole concept using the provided code example. "
            "---"
            "ADDITIONAL INFORMATION: "
            "Highlight the base case and recursive case. Showcase how the recursive calls work by providing an "
            "ASCII-art visual representation of the call stack's active and passive flow. "
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "line_by_line":
        sub_prompt = (
            "Provide a thorough, line-by-line explanation of the following recursive code snippet. "
            "For each line of code: "
            "1. Explain what the line does and its role in the function. "
            "2. Describe how it contributes to the recursion, "
            "including its impact on the base case and the recursive case. "
            "3. Clarify any important concepts or terms related to recursion present in the line, "
            "such as function calls, base case checks, and state changes. "
            "---"
            "ADDITIONAL INFORMATION: "
            "Focus on helping a novice programmer understand how each line fits into the bigger "
            "picture of how recursion works. Use simple language and avoid technical jargon, unless explained. "
            "If a line contributes to the creation of a recursive call, explain how the parameters "
            "and state are passed along and changed. Provide insights into how the function's execution "
            "evolves as each line runs, ensuring a clear understanding of the recursive process from start to finish."
        )
        temperature = 0.2
        max_tokens = 700

    elif topic == "iterative_comparison":
        sub_prompt = (
            "Compare the following recursive code snippet with its iterative equivalent. "
            "Your comparison should include: "
            "1. The differences in approach: Describe how recursion and iteration solve the problem differently, "
            "focusing on how each method manages control flow and state. "
            "2. Performance considerations: "
            "Discuss the memory usage, time complexity, and any potential limitations or benefits of each approach. "
            "3. Readability and maintainability: Evaluate which version is easier to read and maintain, "
            "and why. Consider the perspective of a novice programmer."
            "---"
            "ADDITIONAL INFORMATION: "
            "Provide both the recursive and iterative versions of the code. Use ASCII-art or other visual aids to "
            "demonstrate the differences in the call stack's behavior between the recursive and iterative versions. "
            "Highlight the active and passive flow of the call stack in the recursive approach versus the loop "
            "control in the iterative approach. "
            "Explain how each method handles the base case and the overall problem-solving process.")
        temperature = 0.3
        max_tokens = 700

    elif topic == "example":
        sub_prompt = (
            "Provide a real-world analogy that illustrates the concept of recursion, using the provided code snippet "
            "as a basis. Focus on how the recursive process in the code is similar to a real-world situation. "
            "Choose an example that clearly demonstrates the concept of breaking down a problem into smaller, "
            "similar problems until a base case is reached. This should make it easier for a novice programmer "
            "to understand the overall flow and logic of recursion. Additionally, explain how the analogy relates "
            "to the base case and the recursive step in the provided code."
            "---"
            "ADDITIONAL INFORMATION: "
            "Highlight how each step in the analogy corresponds to a step in the recursive code, and describe the "
            "transition from the base case to the recursive case in the real-world example. Aim to provide a "
            "visual or conceptual model that makes the recursive calls and the flow of execution easy to grasp. "
            "Use simple and familiar examples to ensure clarity."
        )
        temperature = 0.7
        max_tokens = 550

    elif topic == "head_vs_tail_recursion":
        sub_prompt = (
            "Help the student understand the difference between head recursion and tail recursion using the provided "
            "code snippet. Explain what it means for a recursive function to be a head recursion or a tail recursion "
            "and highlight which type of recursion is present in the code. Describe how each type affects the flow of "
            "the recursive calls and the call stack, particularly focusing on the 'backward flow' when calculating "
            "results. Make sure to clarify why head recursion can be harder to grasp due to operations being "
            "performed after the recursive call returns, whereas in tail recursion, the recursion itself is the last "
            "operation, simplifying the process."
            "---"
            "ADDITIONAL INFORMATION: "
            "Use the provided code snippet to show how head and tail recursion operate differently. Provide a "
            "step-by-step breakdown of the call stack for each type, illustrating what happens at each step. Use "
            "ASCII-art to visualize the call stack for both head and tail recursion if applicable."
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "optimization":
        sub_prompt = (
            "Show how the following recursive code snippet can be optimized. Discuss potential improvements and "
            "provide an optimized version of the code."
        )
        temperature = 0.2
        max_tokens = 700

    # Construct the full prompt
    prompt_config = {
        "prompt": (
                "You are a tutor helping a student understand recursive functions in computer science. "
                "---"
                "YOUR MAIN TASK: "
                + sub_prompt
                + feedback +
                "---"
                "CODE: "
                "``` " + user_input + " ```. "
                                      "CLOSING REMARKS: "
                                      "Don't copy the whole code snippet in the answer, if needed, "
                                      "provide only parts. Maximum tokens: 600. "
                                      "Provide a clear and understandable explanation of the stated "
                                      "problem for the novice programming student, "
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
                   "The user might ask questions about the following code that you should consider: "
                   + user_input +
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
                You are an expert assessing explanations of recursive Python functions. The explanations are 
                designed to help novice learners understand recursion and Python code. Assume that the learners 
                do not have much experience with programming and recursion as a concept.
                ---
                YOUR MAIN TASK:
                You are comparing several explanations to the same code about a recursive python function. 
                Compare these in several aspects: 1. Clarity and Simplicity, 2. Conceptual Understanding,
                3. Appropriate Complexity 4. Accuracy 5. Encouraging Mental Models and 6. Engagement and Motivation.
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
                            "Visualization and Mental Models": 8,
                            "Engagement and Motivation": 7,
                        },
                        "final_score": 45
                    },
                    {
                        "explanation_id": 1,
                        "criteria_scores": {
                            "Clarity and Simplicity": 4,
                            "Conceptual Understanding": 6,
                            "Appropriate Complexity": 5,
                            "Accuracy": 9,
                            "Visualization and Mental Models": 5,
                            "Engagement and Motivation": 6,
                        },
                        "final_score": 35
                    }
                ]
            } }
            ---
            EXPLANATIONS:
            Here are the explanations provided in an array with objects. 
            The ids of this array correspond with the evaluation object ids in your provided result.
            Each object includes an "explanation" key 
            with the explanation as value: {gpt_responses}           
            ---
            CLOSING REMARKS:
            Now evaluate the explanations based on the criteria and provide me with the final result in the JSON format
            mentioned before. Provide clear, comparative assessments for each criterion.
            If no explanations are provided, then just return the empty JSON.
            """,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    return prompt_config


def test_prompt():
    prompt_config = {
        "prompt": "Dies is ein Test",
        "temperature": 0.3,
        "max_tokens": 200,
    }

    return prompt_config
