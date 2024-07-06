def base_prompts(topic, user_input, feedback):
    sub_prompt = ""
    temperature = 0
    max_tokens = 0

    print(topic)

    # constructing the sub prompts (key-concepts)
    # Subprompts are the core of the prompt
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
            "Focus on a general, easy to understand explanation of the problem. Do not be too specific about individual parts, "
            "but explain the whole concept using the provided code example. "
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "line_by_line":
        sub_prompt = (
            "Please provide a detailed, line-by-line explanation of the following recursive code snippet. Each line of code "
            "should be explained clearly, including the purpose of the line, how it contributes to the recursion, and any important "
            "concepts or terms. "
        )
        temperature = 0.2
        max_tokens = 700

    elif topic == "iterative_comparison":
        sub_prompt = (
            "Compare the following recursive code snippet with its iterative equivalent. Explain the differences in approach, "
            "performance, and readability. Provide both versions of the code."
        )
        temperature = 0.3
        max_tokens = 700

    elif topic == "optimization":
        sub_prompt = (
            "Explain how the following recursive code snippet can be optimized. Discuss potential improvements and provide an optimized "
            "version of the code."
        )
        temperature = 0.2
        max_tokens = 700

        # Construct the full prompt
    prompt_config = {
        "prompt": (
                "Explain the following recursive problem in a manner suitable for a novice programmer learning about recursion. "
                + sub_prompt +
                " Describe the inputs and outputs of the program. Additionally, highlight the base case and recursive case, and explain "
                "how the recursive calls work with a visual representation of the call stack's active and passive flow. "
                + feedback +
                " Code: ``` " + user_input + " ```"
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


def misconceptions_prompts(topic, user_input):
    prompt = ""

    if topic == "backwardFlow":
        prompt = f"Explain backward flow in recursion using the following example:\n{user_input}"
    elif topic == "infiniteRecursion":
        prompt = f"Explain the risk of infinite recursion and how to avoid it using the following example:\n{user_input}"
    elif topic == "recursiveCalls":
        prompt = f"Explain how to formulate recursive calls using the following example:\n{user_input}"
    elif topic == "returnKeyword":
        prompt = f"Explain the usage of the return keyword in recursion using the following example:\n{user_input}"
    elif topic == "baseCasePosition":
        prompt = f"Explain the correct positioning of the base case in recursion using the following example:\n{user_input}"
    elif topic == "baseCaseActions":
        prompt = f"Explain the actions of the base case in recursion using the following example:\n{user_input}"
    elif topic == "writingBaseCases":
        prompt = f"Provide guidance on writing base cases in recursion using the following example:\n{user_input}"
    elif topic == "variableUpdates":
        prompt = f"Explain how variable updates work in recursion using the following example:\n{user_input}"


def dynamic_prompts(user_inputs, misconceptions):
    # when the user makes the quiz
    def create_prompt(user_input, misconceptions):
        prompts = []
        if "BF1" in misconceptions:
            prompts.append(
                f"After a recursive call, the program continues executing statements following the call in the current stack frame. Let's look at an example:\n{user_input}")
        if "INF1" in misconceptions:
            prompts.append(
                f"Even if a base case exists, the recursive calls must progress towards it to avoid infinite recursion. Here's how:\n{user_input}")
        if "RC1" in misconceptions:
            prompts.append(
                f"Recursive calls need to break down the problem into smaller sub-problems until a base case is reached. Example:\n{user_input}")
        if "RC2" in misconceptions:
            prompts.append(
                f"Not all recursive functions need a return statement. Let's explore when it's necessary:\n{user_input}")
        if "BC1" in misconceptions:
            prompts.append(
                f"The base case can be placed logically anywhere in the function. Understand its role with this example:\n{user_input}")
        if "BC2" in misconceptions:
            prompts.append(
                f"The base case doesn't have to return a constant. It can return a variable or computed value. Example:\n{user_input}")
        if "VU1" in misconceptions:
            prompts.append(
                f"Variables in recursive calls are updated within their own stack frame. Learn how this works:\n{user_input}")

        combined_prompt = "\n\n".join(prompts)
        return combined_prompt
