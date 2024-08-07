const questionsInit = [
    {
        "id": 0,
        "type": "MC",
        "heading": "## Q1: Base Case in Recursion",
        "text": "### **Question**\nWhich of the following are true regarding the base case in recursive functions?",
        "answers": [
            {
                "id": 0,
                "text": "The base case should come before the recursive call in the function.",
                "misconception": "BCbeforeRecursiveCase",
                "isCorrect": false
            },
            {
                "id": 1,
                "text": "The base case is necessary to terminate recursion.",
                "misconception": "",
                "isCorrect": true
            },
            {
                "id": 2,
                "text": "A base case will always run regardless of whether the problem size is reduced.",
                "misconception": "InfiniteExecution",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "Recursive functions can have more than one base case.",
                "misconception": "",
                "isCorrect": true
            }
        ]
    },
    {
        "id": 1,
        "type": "MC",
        "heading": "## Q2: Execution of Statements After Recursive Call",
        "text": "### **Question**\nWhich of the following statements are true regarding the execution of statements after a recursive call?",
        "answers": [
            {
                "id": 0,
                "text": "No statements after the recursive call will execute.",
                "misconception": "BFneverExecute",
                "isCorrect": false
            },
            {
                "id": 1,
                "text": "Statements after the recursive call will execute only if the base case is met first.",
                "misconception": "",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "Statements after the recursive call will execute once the recursion starts returning.",
                "misconception": "",
                "isCorrect": true
            },
            {
                "id": 3,
                "text": "Statements after the recursive call will execute before the recursive call is executed.",
                "misconception": "BFexecuteBefore",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 2,
        "type": "MC",
        "heading": "## Q3: Recursive PrintArray",
        "text": "### **Question**\nConsider the following function:\n```python\ndef print_array(A, n):\n  if n > 0:\n    print_array(A, n - 1)\n    print(A[n], end=' ')\n```\nWhat will be printed when `print_array(A, 5)` is executed, with array `A` initialized so that position `A[i]` stores value `i`? Write a sequence of numbers that will be printed, or write \"nothing\" if you think that it will print nothing. Write \"infinite recursion\" if you think that the call will lead to infinite recursion.",
        "answers": [
            {
                "id": 0,
                "text": "1 2 3 4 5",
                "misconception": "",
                "isCorrect": true
            },
            {
                "id": 1,
                "text": "1 2 3 4",
                "misconception": "BCevaluation",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "0 1 2 3 4",
                "misconception": "BCevaluation",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "0 1 2 3 4 5",
                "misconception": "BCevaluation",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "5 4 3 2 1",
                "misconception": "BFexecuteBefore",
                "isCorrect": false
            },
            {
                "id": 5,
                "text": "nothing",
                "misconception": "",
                "isCorrect": false
            },
            {
                "id": 6,
                "text": "infinite recursion",
                "misconception": "",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 3,
        "type": "MC",
        "heading": "## Q4: Backward Flow",
        "text": "### **Question**\nGiven the following code:\n```python\ndef function(y):\n  if y == 1:\n    return 5\n  else:\n    function(y - 1)\n    y = y + 1\n    return 83\n```\nWhat will be returned when `function(2)` is executed? Write a number, or write \"infinite recursion\" if you think that this call will lead to infinite recursion.",
        "answers": [
            {
                "id": 0,
                "text": "83",
                "misconception": "",
                "isCorrect": true
            },
            {
                "id": 1,
                "text": "5",
                "misconception": "BFneverExecute",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "6",
                "misconception": "RCnoReturnRequired",
                "isCorrect": false
            },
            {
                "id": 3,
                "text": "infinite recursion",
                "misconception": "BFexecuteBefore",
                "isCorrect": false
            },
            {
                "id": 4,
                "text": "other",
                "misconception": "",
                "isCorrect": false
            }
        ]
    },
      {
        "id": 4,
        "type": "EXPLAIN",
        "heading": "## Q5: Recursive Array Multiplication",
        "text": "### **Question**\nConsider the following function:\n```python\ndef multiply_array(arr, n):\n    if n == 0:\n        return 1\n    else:\n        multiply_array(arr, n - 1)\n        return arr[n - 1] * multiply_array(arr, n - 1)\n```\nExplain what this function is intended to do and describe its behavior when `multiply_array([1, 2, 3, 4], 4)` is called. Identify any errors in the function and explain why they occur. If you think the function will lead to infinite recursion, explain why.",
        "answers": [
            {
                "id": 0,
                "text": "The function aims to multiply all elements of the array but contains an error. When `multiply_array([1, 2, 3, 4], 4)` is called, it will cause infinite recursion because the recursive call `multiply_array(arr, n - 1)` is made twice, and the statement `return arr[n - 1] * multiply_array(arr, n - 1)` means the second recursive call never reaches the base case."
            }
        ]
    }
];


export default questionsInit