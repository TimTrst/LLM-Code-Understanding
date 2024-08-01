const questionsInit = [
    {
        id: 0,
        type: "MC",
        heading: "## Q1.2: Base case in recursion",
        text: "### **Question**\nWhat is a base case in recursion?",
        answers: [
            {
                id: 0,
                text: 'The condition under which the recursion terminates.',
                misconception: 'test',
                isCorrect: true
            },
            {id: 1, text: 'The first recursive call made by the function.', misconception: 'test', isCorrect: false},
            {id: 2, text: 'A loop that helps in recursion.', misconception: 'test', isCorrect: false},
            {id: 3, text: 'The value returned by the recursive function.', misconception: 'test', isCorrect: false},
        ],
    },
    {
        id: 1,
        type: "MC",
        heading: "## Q1.3: True statement about recursive functions",
        text: "### **Question**\nWhich of the following is true about recursive functions?",
        answers: [
            {
                id: 0,
                text: 'They must have a base case to avoid infinite recursion.',
                misconception: 'test',
                isCorrect: true
            },
            {
                id: 1,
                text: 'They are always more efficient than iterative functions.',
                misconception: 'test',
                isCorrect: false
            },
            {id: 2, text: 'They can only be used with numeric data.', misconception: 'test', isCorrect: false},
            {id: 3, text: 'They do not require a return statement.', misconception: 'test', isCorrect: false},
        ],
    },
    {
        id: 2,
        type: "MC",
        heading: "## Q2.1: Factorial function",
        text: "### **Question**\nGiven the following recursive function, what will `factorial(3)` return?\n```java\nint factorial(int n) {\n if (n == 0) return 1;\n else return n * factorial(n - 1);\n}\n```",
        answers: [
            {id: 0, text: '0', misconception: 'test', isCorrect: false},
            {id: 1, text: '1', misconception: 'test', isCorrect: false},
            {id: 2, text: '6', misconception: 'test', isCorrect: true},
            {id: 3, text: 'Infinite recursion', isCorrect: false},
        ],
    },
    {
        id: 3,
        type: "MC",
        heading: "## Q2.2: Recursive function calls",
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
        heading: "## Q2.3: Recursive function to find the greatest common divisor (GCD)",
        text: "### **Question**\nWrite a recursive function to find the greatest common divisor (GCD) of two integers.\n```java\nint gcd(int a, int b) {\n if (b == 0) return a;\n else return gcd(b, a % b);\n}\n```\nExplain how this function works and what it returns for the integers `48` and `18`.",
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