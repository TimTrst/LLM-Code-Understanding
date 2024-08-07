import React, {useEffect} from 'react'
import PropTypes from "prop-types"
import {Card, Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Question = ({question, setSelectedAnswers, setExplainAnswers, selectedAnswers, explainAnswers, isEvaluated}) => {

    useEffect(() => {
        // console.log(selectedAnswers)
    }, [selectedAnswers]);

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

    const handleCheckAnswer = (questionId, answerId) => {
        const userAnswer = selectedAnswers[questionId]?.find(answer => answer.id === answerId)
        if (userAnswer && userAnswer.user_answered) {
            return userAnswer.isCorrect ? 'green' : 'red'
        }
        return 'default';
    }

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

    const renderExplain = () => {
        return (
            <Container>
                <Card className={"custom-border"} sx={{
                    borderRadius: 3,
                    height: '7em',
                    bgcolor: "secondary.main",
                    px: 2,
                    my: 3.4,
                }}>
                    <TextField id="standard-basic" label="Enter" variant="standard" InputProps={{
                        disableUnderline: true,
                        sx: {'& .MuiInputBase-input': {color: 'white'}}
                    }}
                               inputProps={{
                                   maxLength: 300
                               }} multiline fullWidth
                               minRows={3} maxRows={3} sx={{input: {color: 'white'}}}
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
