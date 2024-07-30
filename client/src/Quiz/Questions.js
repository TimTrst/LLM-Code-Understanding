 const questions = [
    {
      id: 0,
      type: "BF",
      heading: `## Q1.1: Backward flow`,
      text: `### Given the following code:

\`\`\`cpp
int function(int y) {
  if (y == 1)
    return 5;
  else {
    function(y - 1);
    y = y + 1;
    return 83;
  }
}
\`\`\`

### **Question**  
What will be returned when function(2) is executed? Choose one of the buttons if you think it returns a number or infinite recursion.`,
      answers: [
        { id: 1, text: '83', isCorrect: true },
        { id: 2, text: '5', isCorrect: false },
        { id: 3, text: '6', isCorrect: false },
        { id: 4, text: 'Infinite', isCorrect: false },
        { id: 5, text: 'Other', isCorrect: false },
      ],
    },
     {
      id: 1,
         heading: `## Q1.2: Backward flow`,
      text: `### (2) 
      
      No statements after the recursive call will execute.
      
      **Question**
      Is the statement above correct?
      `,

      answers: [
        { id: 1, text: 'Yes', isCorrect: false },
        { id: 2, text: 'No', isCorrect: true },
      ],
    },
  ]

export default questions