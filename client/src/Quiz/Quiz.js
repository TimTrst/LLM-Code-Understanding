import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types"
import questionsInit from "./QuestionsInit"
import questionsEnd from "./QuestionsEnd"
import Question from "./Question"
import {Button, Container, Paper, Typography} from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Quiz = ({setQuizSubmitted, setQuizResults, quizType}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState(questionsInit)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [explainAnswers, setExplainAnswers] = useState({})

    useEffect(() => {
        if (quizType === 'initial') {
            setQuestions(questionsInit)
        } else {
            setQuestions(questionsEnd)
        }
    }, [quizType]);

    useEffect(() => {
        console.log('Selected Answers:', selectedAnswers);
    }, [selectedAnswers]);

    useEffect(() => {
        console.log('Explain Answers:', explainAnswers);
    }, [explainAnswers]);

    
    function handleAnswers() {
        setQuizResults([])
        /*
        setQuizResults((prevResults) => {
            let updatedAnswers = prevResults.answers
            let score = prevResults.score

            //is there an answers array element in the current result -> if not, then add it
            if (!prevResults.answers[currentQuestionIndex]) {
                updatedAnswers.push(newAnswer)
                if (newAnswer.isCorrect) {
                    score++
                }
                //if there is an element, then change it at the current question index
            } else {
                if (updatedAnswers[currentQuestionIndex] !== newAnswer) {
                    updatedAnswers[currentQuestionIndex] = newAnswer
                    if (!newAnswer.isCorrect) {
                        score--
                    } else {
                        score++
                    }
                }
            }

            return {
                ...prevResults,
                answers: updatedAnswers,
                score: score
            }
        })
         */
        setQuizSubmitted(true)
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
            <Typography variant="h1" sx={{my: 3}}>{quizType === "initial" ? "Initial Quiz" : "Ending Quiz"}</Typography>
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
                    question={questions[currentQuestionIndex]}
                    setSelectedAnswers={setSelectedAnswers}
                    setExplainAnswers={setExplainAnswers}
                    selectedAnswers={selectedAnswers}
                    explainAnswers={explainAnswers}
                />
                <Divider sx={{my: 3}}/>
                <Toolbar sx={{justifyContent: 'space-between', my: 2}}>
                    <Button sx={{width: 120}} onClick={previousQuestion}
                            disabled={currentQuestionIndex === 0}><KeyboardArrowLeftIcon/> </Button>
                    <Button sx={{margin: 2}} onClick={handleAnswers}>Finish Quiz?</Button>
                    <Button sx={{width: 120}} onClick={nextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}><KeyboardArrowRightIcon/></Button>
                </Toolbar>
            </Paper>
        </Container>
    )
}

Quiz.propTypes = {
    setQuizSubmitted: PropTypes.func,
    setQuizResults: PropTypes.func,
    quizType: PropTypes.string,
}

export default Quiz;
