import React from 'react'
import PropTypes from "prop-types"
import {Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Question = ({question, setSelectedAnswers, setExplainAnswers, selectedAnswers, explainAnswers}) => {

    const handleCheckboxChange = (questionId, answerId) => {
        setSelectedAnswers(prevSelected => {
          const currentAnswers = prevSelected[questionId] || []

        if (currentAnswers.some(answer => answer.id === answerId)) {
            return {
                ...prevSelected,
                [questionId]: currentAnswers.filter(answer => answer.id !== answerId)
            }
        } else {
            const newAnswer = question.answers.find(answer => answer.id === answerId)
            return {
                ...prevSelected,
                [questionId]: [...currentAnswers, newAnswer]
            }
        }
        })
    }


const handleExplainChange = (questionId, text) => {
    setExplainAnswers(prevExplain => ({
        ...prevExplain,
        [questionId]: text
    }))
}

const renderMultipleChoice = () => {
    return (
        <FormGroup>
            {question.answers.map((answer, index) => (
                <div key={index}>
                    <FormControlLabel
                        control={<Checkbox checked={selectedAnswers[question.id]?.some(oldAnswer => oldAnswer.id === answer.id) || false}
                                           onChange={() => handleCheckboxChange(question.id, answer.id)}/>}
                        label={answer.text}/>
                </div>
            ))}
        </FormGroup>
    )
}

const renderExplain = () => {
    return (
        <Container>
            <TextField id="standard-basic" label="Enter" variant="standard"
                       value={explainAnswers[question.id] || ""}
                       onChange={(e) => handleExplainChange(question.id, e.target.value)}>
            </TextField>
        </Container>
    )
}


return (
    <Container sx={{height: 'fit-content', width: 'fit-content', padding: 3, margin: 2}}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {question.text}
        </ReactMarkdown>
        {question.type === "MC" ? renderMultipleChoice() : renderExplain()}
    </Container>
)
}


Question.propTypes = {
    question: PropTypes.object,
    setSelectedAnswers: PropTypes.func,
    setExplainAnswers: PropTypes.func,
    selectedAnswers: PropTypes.object,
    explainAnswers: PropTypes.object,
}

export default Question
