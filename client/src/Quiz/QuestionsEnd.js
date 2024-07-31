const questionsEnd = [
    {
        id: 0,
        type: "MC",
        heading: "## Q1.1: Termination of recursive function",
        text: "### **Question**\nHow does a recursive function terminate?",
        answers: [
            {id: 0, text: 'When it completes a fixed number of iterations.', isCorrect: false},
            {id: 1, text: 'When it reaches its base case.', isCorrect: true},
            {id: 2, text: 'When the operating system stops it.', isCorrect: false},
            {id: 3, text: 'When it runs out of memory.', isCorrect: false},
        ],
    },
    {
        id: 1,
        type: "MC",
        heading: "## Q1.2: Absence of base case",
        text: "### **Question**\nWhat happens if a recursive function does not have a base case?",
        answers: [
            {id: 0, text: 'It will compile but not run.', isCorrect: false},
            {id: 1, text: 'It will result in infinite recursion.', isCorrect: true},
            {id: 2, text: 'It will return a default value.', isCorrect: false},
            {id: 3, text: 'It will behave like a normal function.', isCorrect: false},
        ],
    },
    {
        id: 2,
        type: "MC",
        heading: "## Q1.3: Direct vs Indirect recursion",
        text: "### **Question**\nWhat is the difference between direct and indirect recursion?",
        answers: [
            {
                id: 0,
                text: 'Direct recursion involves a function calling itself, while indirect recursion involves a function being called by another function.',
                isCorrect: true
            },
            {id: 1, text: 'Direct recursion is faster than indirect recursion.', isCorrect: false},
            {id: 2, text: 'Indirect recursion is always more complex than direct recursion.', isCorrect: false},
            {id: 3, text: 'There is no difference; they are the same.', isCorrect: false},
        ],
    },
    {
        id: 3,
        type: "MC",
        heading: "## Q2.3: Recursive sum function",
        text: "### **Question**\nWhat value will be returned by the following function call: `sumDigits(1234)`?\n```java\nint sumDigits(int n) {\n if (n == 0) return 0;\n else return n % 10 + sumDigits(n / 10);\n}\n```",
        answers: [
            {id: 1, text: '10', isCorrect: false},
            {id: 2, text: '1234', isCorrect: false},
            {id: 3, text: '1', isCorrect: false},
            {id: 4, text: '10', isCorrect: true},
            {id: 5, text: 'Infinite recursion', isCorrect: false},
        ],
    },
    {
        id: 4,
        type: "EXPLAIN",
        heading: "## Q2.2: Recursive function to find maximum value",
        text: "### **Question**\nWrite a recursive function to find the maximum value in an array.\n```java\nint findMax(int[] arr, int n) {\n if (n == 1) return arr[0];\n else return Math.max(arr[n-1], findMax(arr, n - 1));\n}\n```\nExplain how this function works and what it returns for the array `[1, 5, 3, 9, 2]`.",
        answers: [
            {
                id: 0,
                text: 'The function works by comparing the last element of the array with the maximum of the rest of the array. It returns 9 for the given array.',
                isCorrect: true
            },
        ],
    },
]

export default questionsEnd