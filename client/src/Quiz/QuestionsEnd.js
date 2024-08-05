const questionsEnd = [
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
        "text": "### **Question**\nWhich of the following statements correctly describe what happens after a recursive call?",
        "answers": [
            {
                "id": 0,
                "text": "Statements after the recursive call will not execute.",
                "misconception": "BFneverExecute",
                "isCorrect": false
            },
            {
                "id": 1,
                "text": "Only the base case will execute statements after the recursive call.",
                "misconception": "",
                "isCorrect": false
            },
            {
                "id": 2,
                "text": "After recursion starts to return, statements following the recursive call will execute.",
                "misconception": "",
                "isCorrect": true
            },
            {
                "id": 3,
                "text": "Statements after the recursive call execute before the recursion happens.",
                "misconception": "BFexecuteBefore",
                "isCorrect": false
            }
        ]
    },
    {
        "id": 2,
        "type": "MC",
        "heading": "## Q3: Recursive PrintElements",
        "text": "### **Question**\nConsider the following function:\n```java\nvoid PrintElements(int[] B, int m) {\n  if (m > 0) {\n    PrintElements(B, m - 1);\n    System.out.print(B[m]);\n  }\n}\n```\nWhat will be printed when `PrintElements(B, 5)` is executed, with array `B` initialized so that position `B[i]` stores value `i`? Write a sequence of numbers that will be printed, or write \"nothing\" if you think that it will print nothing. Write \"infinite recursion\" if you think that the call will lead to infinite recursion.",
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
    }
]

export default questionsEnd