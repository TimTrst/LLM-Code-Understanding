import React, {useState} from 'react'
import PropTypes from "prop-types"
import questions from "./Questions"
import Question from "./Question"
import {Button, Container, Paper, Typography} from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Quiz = ({setInitialQuizSubmitted, setInitialQuizResults}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)


    const handleSubmit = () => {
        setInitialQuizSubmitted(true)
    }

    function handleAnswer(newAnswer) {

        setInitialQuizResults((prevResults) => {
            let updatedAnswers = []
            updatedAnswers = prevResults.answers

            //is there an answers array element in the current result -> if not, then add it
            if(!prevResults.answers[currentQuestionIndex]){
                updatedAnswers.push(newAnswer)
                //if there is an element, then change it at the current question index
            }else{
                updatedAnswers[currentQuestionIndex] = newAnswer
            }

            return {
                ...prevResults,
                answers: updatedAnswers
            }
        })

         const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
         }
    }


function previousQuestion() {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
}

return (
    <Container sx={{
        width: 750, display: 'flex',
        my: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    }}>
        <Typography variant="h1" sx={{my: 3}}>Initial Quiz</Typography>
        <Paper elevation={3} sx={{width: 750, height: "fit-content", backgroundColor: 'primary.main'}}>
            <Typography sx={{
                float: 'right',
                margin: 2
            }}>{(currentQuestionIndex + 1) + " / " + questions.length}</Typography>
            <Container sx={{mx: 1}}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {questions[currentQuestionIndex].heading}
                </ReactMarkdown>
            </Container>
            <Divider/>
            <Question
                questionText={questions[currentQuestionIndex].text}
                answers={questions[currentQuestionIndex].answers}
                onAnswer={handleAnswer}
            />
            <Divider sx={{my: 3}}/>
            <Toolbar sx={{justifyContent: 'space-between', my: 2}}>
                <Button sx={{width: 100}} onClick={previousQuestion}>&lt; Back</Button>
                <Button sx={{width: 100}} onClick={nextQuestion}>Next &gt;</Button>
            </Toolbar>
        </Paper>
        <Button sx={{margin: 2}} onClick={handleSubmit}>Finish Quiz?</Button>
    </Container>
)
}

Quiz.propTypes = {
    setInitialQuizSubmitted: PropTypes.func,
    setInitialQuizResults: PropTypes.func,
}

export default Quiz;
