import React, {useState} from 'react'
import PropTypes from "prop-types";

const Quiz = ({setInitialQuizSubmitted}) => {
    const [answers, setAnswers] = useState({q1: '', q2: '', q3: ''})
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setInitialQuizSubmitted(true)
    }

    return (
        <div style={{margin: '20px'}}>
            <h1>Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>A.1. First iteration CI questions</h2>
                    <div>
                        <h3>A.1.1. Backward flow</h3>
                        <p>(1) Given the following code:</p>
                        <pre>
              {`int function(int y) {
  if (y == 1)
    return 5;
  else {
    function(y - 1);
    y = y + 1;
    return 83;
  }
}`}
            </pre>
                        <p>What will be returned when function(2) is executed? Write a number, or write "infinite
                            recursion" if you think that this call will lead to infinite recursion.</p>
                        <input
                            type="text"
                            name="q1"
                            value={answers.q1}
                            onChange={handleChange}
                            placeholder="Your answer"
                            required
                        />
                    </div>
                </div>
                <div>
                    <h2>A.2. Second iteration CI questions</h2>
                    <div>
                        <h3>A.2.1. Another example</h3>
                        <p>(2) Given the following code:</p>
                        <pre>
              {`int anotherFunction(int x) {
  if (x <= 0)
    return x;
  return anotherFunction(x - 2) + 3;
}`}
            </pre>
                        <p>What will be returned when anotherFunction(4) is executed? Write a number, or write "infinite
                            recursion" if you think that this call will lead to infinite recursion.</p>
                        <input
                            type="text"
                            name="q2"
                            value={answers.q2}
                            onChange={handleChange}
                            placeholder="Your answer"
                            required
                        />
                    </div>
                </div>
                <div>
                    <h2>A.3. Third iteration CI questions</h2>
                    <div>
                        <h3>A.3.1. Yet another example</h3>
                        <p>(3) Given the following code:</p>
                        <pre>
              {`int yetAnotherFunction(int z) {
  if (z == 3)
    return 1;
  return z * yetAnotherFunction(z - 1);
}`}
            </pre>
                        <p>What will be returned when yetAnotherFunction(3) is executed? Write a number, or write
                            "infinite recursion" if you think that this call will lead to infinite recursion.</p>
                        <input
                            type="text"
                            name="q3"
                            value={answers.q3}
                            onChange={handleChange}
                            placeholder="Your answer"
                            required
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            {submitted && (
                <div>
                    <h2>Your Answers</h2>
                    <p><strong>Q1:</strong> {answers.q1}</p>
                    <p><strong>Q2:</strong> {answers.q2}</p>
                    <p><strong>Q3:</strong> {answers.q3}</p>
                </div>
            )}
        </div>
    )
}

Quiz.propTypes = {
    setInitialQuizSubmitted: PropTypes.func,
}

export default Quiz;
