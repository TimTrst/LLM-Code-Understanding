# Leveraging LLMs to help novice learners with code understanding. Focus on Recursion

## Teaching recursion
- usual examples are not easy to understand
- often overload novice learners

### What is recursion?
- if the given instance of the problem is small or simple enough, just solve it
- otherwise, reduce the problem to one or more simpler instances of the same problem
-> the self-referencing is often the main issue when it comes to understanding recursion
- "the recursion fairy"
    - imagine someone else is solving the simpler problems (the recursion fairy)
    - the only task for a student is to simplify the original problem
    -> the recursion fairy will magically take care of all other subproblems for you, using methods that are "none of your business"
    - mathimatically the recursion fairy is the "Induction Hypothesis"


### Compiling the code before asking chatgpt
- i want to know if the code has errors before handing it to chatgpt
- running arbitrary code can be trouble some:
    - Use a container or sandbox: Use Docker containers or a sandbox environment to execute the code to prevent it from affecting your host system.
    - Resource limits: Set limits on execution time and memory usage to prevent abuse.
    - Sanitize inputs: Ensure all inputs are properly sanitized to avoid injection attacks.
    - Monitor and log activity: Keep logs of executed commands for auditing and debugging purposes.

### What misconceptions as prompts?
- aktiver und passiver flow

- eher oberkategorien abdecken und nicht


## Prompting mit ChatGPT

### Lever technique

- often llms tend to exaggerate or be too blunt but don't find the space between
- "this email sounds too formal, make it less formal"
    -> then the email will sound too formal
    - also happens the other way around

- give chatgpt the input again and let it rate it from a scale from one to ten with description of maximums
    - You ask ChatGPT to rate its output on a scale of 1-10. You also define the scale, f.e. 1 is very casual, 10 is very professional.
    - ChatGPT will give you the answer (f.e. a 6/10)    
    - You then adjust it to your desired number (f.e. a 3/10)

### Adjusting Chatgpts basic parameters
1. Temperature
    - controls randomness in responses
    - Adjustment
        - Lower: (eg. 0.3) for more predictable straightforward answers
        - Higher: (eg. 0.7 or above) for creative, diverse responses
            - ideal for creative writing 
            - but not so much for explaining? Or maybe it is? 
            - would this work for novice learners rather than experts? How much does change when adjusting the "randomness"?
2. Max Tokens
    - maximum length of the models output
    - longer answers for storytelling
    - should be set to always produce answers of equal format

3. Top P (Nucleus Sampling)
    - influences the diversity of the model's responses
    - Adjustment
        - Lower: make repsonses more predictable
        - Higher: increase diversity and surprise

4. Frequency Penalty
    - discourage model from using the same words or phrases
    - Adjustment
        - Lower: more consisten use of key terms (could help with explaining somehting specific like recursion)
        - Higher: reduce repetition 

5. Presence Penalty
    - encourages the introduction of new topics and concepts
    - Adjustmen
        - Higher: more varied new topics
        - Lower: staying on topic (again, would make sense)

6. Response Length Penalty
    - length of each part of the response
    - Adjustment
        - higher (eg. 2.0) will generate shorter continuations
        - lower (0.5) will result in longer continuations
    - seems useful when trying to control the verbosity (Ausführlichkeit)
    - higher penalty for more concise answers

## Misconception Identification Questionnaire (copied from chatgpt)
Section 1: Understanding Backward Flow
1. BF1: What happens to the statements after a recursive call is made in a function?
    A. They are skipped and never executed.
    B. They execute immediately after the recursive call is made.
    C. They execute after the recursive call has finished executing.

Section 2: Risk of Infinite Recursion
2. INF1: If a recursive function has a base case, will it always stop eventually?
    A. Yes, as long as there is a base case.
    B. No, the recursive calls must progress towards the base case.

Section 3: Formulating Recursive Calls
3. RC1: What is the purpose of a recursive call in a function?
    A. To call the function with a different set of parameters.
    B. To repeatedly execute the same function without any conditions.
    C. To break down the problem into smaller sub-problems until a base case is reached.
4. RC2: Is it necessary to include a return statement in all recursive functions?
    A. Yes, every recursive function must have a return statement.
    B. No, only if the function is supposed to return a value.

Section 4: Understanding the Base Case
5. BC1: Where should the base case be placed in a recursive function?
    A. Always at the beginning of the function.
    B. It can be placed logically anywhere in the function.
6. BC2: What should a base case return?
    A. It must always return a constant value.
    B. It can return a variable or a computed value.
    
Section 5: Updating Variables in Recursion
7. VU1: How do variable updates in recursion work?
    A. Variables updated before the recursive call affect all recursive calls.
    B. Each recursive call gets its own copy of the variables.

