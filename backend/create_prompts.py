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