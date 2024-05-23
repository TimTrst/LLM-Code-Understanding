import React, { useState, useEffect } from 'react'
import './App.css';



function App() {

   const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault()
      const response = await fetch('/ask', {
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({question})
      })
      const data = await response.json()
      setAnswer(data.answer)
  }

    return (
    <div className="App">
      <header className="App-header">
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here"
            required
          />
          <button type="submit">Ask</button>
        </form>
        {answer && <p>Answer: {answer}</p>}
      </header>
    </div>
    );
}

export default App;
