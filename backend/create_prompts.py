def base_prompts(topic, user_input, feedback):
    """
    Prompt config to handle "promptless" interaction. The specific predefined prompts will be included in a
    template format. The topic of the interaction comes from one of the buttons from the frontend.
    :param topic: The "promptless" interaction topic.
    :param user_input: The code that the request is about
    :param feedback: Possible user feedback about the difficulty of understanding
    :return: Prompt configuration
    """
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
                                      "---"
                                      "CLOSING REMARKS: "
                                      "Don't copy the whole code snippet in the answer, if needed, "
                                      "provide only parts. Maximum tokens: 500. "
                                      "Provide a clear and understandable explanation of the stated "
                                      "problem for the novice programming student, "
                                      "who is currently learning about recursion."
        ),
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config


def manual_prompt(user_question, user_input):
    """
    Prompt config to include the manually created user prompt in a template format.
    :param user_question: The manually created user prompt
    :param user_input: The code that the user prompt might be about
    :return: Prompt configuration
    """
    max_tokens = 600

    prompt_config = {
        "prompt": ("You are a tutor, helping a student understand recursive functions in computer science. The "
                   "student is asking you a question with a prompt they have formulated themselves. You are always adressing the student directly, if needed."
                   "---"
                   "STUDENT PROMPT: "
                   + user_question +
                   "---"
                   "CODE CONTEXT: "
                   "The user might ask questions about the following code that you should consider: "
                   "``` " + user_input + " ```. "
                   "Don't refer to this code as context, if the student prompt above seems unrelated to the context."
                   "---"
                   "CLOSING REMARKS: "
                   "If the user does refer to the code or recursion, then answer the question generally, without focusing on the context."
                   "Use a maximum of 500 tokens in your answer."),
        "max_tokens": max_tokens,
        "temperature": 0.6
    }

    return prompt_config


def check_answer_prompt(question, user_answer):
    """
    Prompt config to check a user answer to a quiz question.
    :param question: The quiz question
    :param user_answer: The user answer
    :return: Prompt configuration
    """
    max_tokens = 300
    temperature = 0.3

    question_extracted = question["text"]
    # correct_answer = question["answers"][0]["text"]

    prompt_config = {
        "prompt": f"""
            You are an evaluation system designed to assess a student's answer to a quiz question about recursion.
            Your goal is to understand the student's answer and provide a fair evaluation based on the given context.
            Your evaluation is supposed to be used to increase a score if the answer was correct, based on a quiz.
            ---
            QUESTION: 
            "{question_extracted}"
            ---
            EVALUATION INSTRUCTIONS:
            1. **Execute the provided Python code** with the given parameters (for example: `recursive_func([1,2,3,4,5],5)`) **before** beginning your evaluation.
            2. Extract what the user thinks the function returns and compare it with the result you got by executing the function yourself.
            3. Use the execution result as the primary basis for evaluating the accuracy of the student's answer.
            4. Use the return value that the users identifies and compare it with your return value.
                - Example: User: ".. the function returns 10." Your result of the function: 5. This indicates that the user answer is not correct, because 10 != 5.
            ---
            CORRECT ANSWER CRITERIA: 
            - Provide the correct numerical result of the function's execution.
            - Correctness of general statements about the recursive concept/function
            ---
            STUDENT ANSWER:
             "{user_answer}"
            Return the evaluation in the following JSON format:
             {{ "correct": True/False, 
                "feedback": "Provide a brief explanation for your decision.",
                "misconceptions": ["List the names of any misconceptions identified from the provided list. Leave this array empty if none match or if the question was correctly answered."]
            }} 
            ---
            ADDITIONAL INFORMATION:
            - If the student provides an incorrect numerical result, the answer must be marked as incorrect, regardless of general understanding.
            - Use the actual output of the function when executed to check the accuracy of the student's numerical result. 
            - If execution shows the student was wrong, explain why and provide corrective feedback.
            - Misconceptions should only be noted if the student’s response suggests a misunderstanding based on the actual code behavior.
            """,

        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    return prompt_config


def analyse_results_prompt(misconceptions):
    """
    Prompt config to analyse the pre- and post-quiz results based on extracted misconceptions.
    :param misconceptions: Extracted misconceptions based on the pre- and post-quiz
    :return: Prompt configuration
    """
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


def choose_best_explanation_prompt(gpt_responses, user_input):
    """
    Prompt config to choose the best explanation based on scoring criteria.
    :param gpt_responses: All explanations to be validated
    :param user_input:  The code that the explanations were about
    :return: Prompt configuration
    """
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
                Return evaluation in the following JSON format. Enclose the property names in double quotes for the JSON:
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
            CODE:
            This is the code that each of the explanations are referring to: 
            "``` " + {user_input} + " ```. "
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


def validate_own_answer_prompt(explanation, user_input, original_prompt):
    """
    Prompt config to validate an explanation.
    :param explanation: Explanation to be validated
    :param user_input: Code that the explanation is about
    :param original_prompt: The prompt that led to the explanation
    :return: Prompt configuration
    """
    max_tokens = 600
    temperature = 0.3

    prompt_config = {
        "prompt":
            f""" 
                You are an expert assessing explanations of recursive Python functions. Your task is to find errors in 
                these explanations. The errors might be subtle. I want you to create a new version of the explanation if 
                you found a mistake.
                ---
                YOUR MAIN TASK:
                You are validating an student explanation of a recursive Python function. Check the provided explanation completely for errors or 
                mistakes. Validate by creating your own version of the explanation first and then compare it with the provided Explanation.
                If you find that something is wrong, take the provided explanation and adjust the parts with mistakes.
                If possible, replace only the parts of the original explanation that are incorrect. If no mistakes are found, then 
                don't change the explanation and fill the JSON field in the response format "isCorrect" with the value
                "yes" and leave the "errors" field as an empty array. If there is something wrong, then fill the "isCorrect" field with "no" and put into the
                "errors" field the line(s) that were wrong. In the "explanation" field i want you to 
                provide your own version of the the correct explanation for the user if something was wrong, or leave it empty, if nothing was wrong.
                ---
                EXPLANATION DESCRIPTION:
                Here is the original task which resulted in the provided explanation. Use this to make your own version and to compare it with the provided one:
                {original_prompt}                     
                ---
                CODE:
                This is the code that the explanation is referring to: 
                "``` " + {user_input} + " ```. "
                ---
                EXPLANATION:
                ---
                Here is the explanation you are validating: {explanation}     
                RETURN FORMAT:
                Return validation in the following JSON format. Enclose the property names in double quotes for the JSON:
                { {
                    "isCorrect": "yes/no",
                    "explanation": "Include your version of the provided explanation here as a string, or leave empty if the explanation provided did not have errors",
                    "errors": ["Include the error parts here, or return empty array for errors if the explanation provided did not have errors"],
                } }
                All keys in the json format should always exist, even when they are not filled with information.
                ---
                HEAD VS TAIL RECURSION:
                If the problem might be related to head or tail recursion, please double check your answer. Don't rush to a conclusion, before finishing your assessment.
                Only because the recursion is part of the last line does not necessarily imply tail recursion. 
                Check if there is further code to be executed after the recursive call was made. 
                Example: ```return n * factorial(n - 1)```. Here it is the last line of the code but it still needs to unwind from the call-stack and multiply the recursive results by n, therefore making it head recurion.
                ---
                CLOSING REMARKS:
                Now validate the explanation and provide me with the final result in the JSON format
                mentioned before. Keep the original structure and length of the provided explanation as much as possible.
                Keep the structure of the given JSON format, even if nothing is to be included in the fields. If nothing
                can be included, just leave the fields empty, but still keep the keys. I don't want you to explain the mistakes, i want you to write a new version of the provided explanation that does not have the mistakes that you found.
                If no explanation is provided, then just return the empty JSON. Enclose the property names in double quotes for the JSON.
                """,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    return prompt_config


def summarize_prompt(prev_summary, user_request, system_response):
    """
    Prompt config to summarize the conversation when the dialog history is full.
    :param prev_summary: Summary of the conversation so far
    :param user_request: The user request to be added to the new summary
    :param system_response: The system response to be added to the new summary
    :return: Prompt configuration
    """
    max_tokens = 800
    temperature = 0.3

    prompt_config = {
        "prompt": f""" 
        You are handling the task oriented dialog between a student and an AI model.
        The goal of the dialog is to explain the student recursive python code and recursion as a concept. 
        ---
        YOUR MAIN TASK:
        Based on the previous summary and the new user request and system response, update the summary by integrating 
        the new information. Keep the summary concise and focused on the relevant points related to the explanation of recursion and Python code. 
        This summary will be used to help the AI understand the student's goals and track the conversation context for future turns.
        ---
        PREVIOUS SUMMARY:
        ```{prev_summary}```.
        ---
        USER REQUEST:
        ```{user_request}```.
        ---
        SYSTEM RESPONSE:
        ```{system_response}```.
        ---
        ADDITIONAL INSTRUCTIONS:
        - Summarize the new user request and system response in relation to the task of explaining recursion and Python code.
        - Retain essential information from the previous summary, but avoid redundancy.
        - If the new user request or response does not add significant new information, preserve the current summary.
        - Ensure the updated summary highlights the student's goals and progress in understanding recursion.
        - Write the new summary in a maximum of 2 concise paragraphs. The summary is not for a human, but for a Large Language Model (LLM).
        - If the previous summary is empty, use only the new request and response pair for the updated summary.
        - Return the summary in a single string.
        """,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    return prompt_config
