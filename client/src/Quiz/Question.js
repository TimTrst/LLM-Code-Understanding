import React, {useEffect} from 'react'
import PropTypes from "prop-types"
import {Card, Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * The `Question` component renders a multiple-choice question or an explanation input based on the provided props.
 *
 * @param {Object} question - The question object containing details such as type, text, and answers.
 * @param {function} setSelectedAnswers - Function to update the state of selected answers.
 * @param {function} setExplainAnswers - Function to update the state of explain-type answers.
 * @param {Object} selectedAnswers - Object holding the current selected answers for each question.
 * @param {Object} explainAnswers - Object holding the current explanation text for each question.
 * @param {boolean} isEvaluated - Boolean to check whether the Question component is used for the result table or for a quiz.
 * Checkboxes will be disabled and colored differently if true.
 *
 * @returns {JSX.Element} The JSX code for rendering the question component.
 */
const Question = ({question, setSelectedAnswers, setExplainAnswers, selectedAnswers, explainAnswers, isEvaluated}) => {

    useEffect(() => {
        // console.log(selectedAnswers)
    }, [selectedAnswers]);

    // sets the checked answers in the parent component on change
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
            [questionId]: {answer: text}
        }))
    }

    // if used for the result table
    // this function will see if a result was correctly answered or not
    // then the checkboxes are colored differently
    const handleCheckAnswer = (questionId, answerId) => {
        const userAnswer = selectedAnswers[questionId]?.find(answer => answer.id === answerId)
        if (userAnswer && userAnswer.user_answered) {
            return userAnswer.isCorrect ? 'green' : 'red'
        }
        return 'default';
    }

    // renders a multiple choice type quiz paper
    const renderMultipleChoice = () => {
        return (
            <FormGroup>
                {question.answers.map((answer, index) => (
                    <div key={index}>
                        <FormControlLabel
                            control={<Checkbox sx={{
                                color: isEvaluated && handleCheckAnswer(question.id, answer.id),
                                '&.Mui-checked': {
                                    color: isEvaluated && handleCheckAnswer(question.id, answer.id)
                                }
                            }} disabled={isEvaluated}
                                               checked={selectedAnswers[question.id]?.some(oldAnswer => oldAnswer.id === answer.id) || false}
                                               onChange={() => handleCheckboxChange(question.id, answer.id)}/>}
                            label={answer.text}/>
                    </div>
                ))}
            </FormGroup>
        )
    }

    // renders a explain type quiz question
    const renderExplain = () => {
        return (
            <Container>
                <Card className={"custom-border"} sx={{
                    borderRadius: 3,
                    height: '8em',
                    bgcolor: "secondary.main",
                    px: 2,
                    my: 3.4,
                }}>
                    <TextField id="standard-basic" label="Enter" variant="standard" InputProps={{
                        disableUnderline: true,
                        sx: {'& .MuiInputBase-input': {color: 'white'}}
                    }}
                               inputProps={{
                                   maxLength: 1000
                               }} multiline fullWidth
                               minRows={4} maxRows={4} sx={{input: {color: 'white'}}}
                               value={explainAnswers[question.id]?.answer || ""}
                               onChange={(e) => handleExplainChange(question.id, e.target.value)}>
                    </TextField>
                </Card>
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
    isEvaluated: PropTypes.bool
}

export default Question
