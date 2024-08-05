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
    "text": "### **Question**\nConsider the following function:\n```java\nvoid PrintArray(int[] A, int n) {\n  if (n > 0) {\n    PrintArray(A, n - 1);\n    System.out.print(A[n]);\n  }\n}\n```\nWhat will be printed when `PrintArray(A, 5)` is executed, with array `A` initialized so that position `A[i]` stores value `i`? Write a sequence of numbers that will be printed, or write \"nothing\" if you think that it will print nothing. Write \"infinite recursion\" if you think that the call will lead to infinite recursion.",
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
        id: 3,
        type: "MC",
        heading: "## Q4: Recursive function calls",
        text: "### **Question**\nWhat values are returned by the following function calls: `function1(2, 3)` and `function2(2, 3)`?\n```java\nint function1(int a, int b) {\n if (a == b) return a;\n else return function1(a, b - 1) + b;\n}\n\nint function2(int x, int y) {\n if (x > 1) return function2(x - 1, y) + y;\n else return y;\n}\n```",
        answers: [
            {id: 0, text: '3 and 3', misconception: 'test', isCorrect: false},
            {id: 1, text: '5 and 6', misconception: 'test', isCorrect: true},
            {id: 2, text: 'Infinite recursion and 3', misconception: 'test', isCorrect: false},
            {id: 3, text: '5 and Infinite recursion', misconception: 'test', isCorrect: false},
        ],
    },
    {
        id: 4,
        type: "EXPLAIN",
        heading: "## Q5: Recursive function to find the greatest common divisor (GCD)",
        text: "### **Question**\n```java\nint gcd(int a, int b) {\n if (b == 0) return a;\n else return gcd(b, a % b);\n}\n```\nExplain how this function works and what it returns for the integers `48` and `18`.",
        answers: [
            {
                id: 0,
                text: 'The function works by repeatedly applying the Euclidean algorithm, which reduces the problem by replacing the pair (a, b) with (b, a % b) until b becomes 0. It returns 6 for the integers 48 and 18.',
                misconception: 'test',
                isCorrect: true
            },
        ],
    }
];


export default questionsInit