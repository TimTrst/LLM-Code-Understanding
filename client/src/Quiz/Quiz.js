import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from "prop-types"
import questionsInit from "./QuestionsInit"
import questionsEnd from "./QuestionsEnd"
import Question from "./Question"
import {Button, Container, Paper, Typography} from "@mui/material"
import LoopIcon from '@mui/icons-material/Loop'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import remarkGfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import axios from "axios"

const Quiz = ({setQuizSubmitted, setQuizResults, quizType}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState(questionsInit)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [explainAnswers, setExplainAnswers] = useState({})
    const [evaluationStarted, setEvaluationStarted] = useState(false)

    useEffect(() => {
        if (quizType === 'initial') {
            setQuestions(questionsInit)
        } else {
            setQuestions(questionsEnd)
        }
    }, [quizType]);

    useEffect(() => {
        //console.log('Selected Answers:', selectedAnswers);
    }, [selectedAnswers]);

    useEffect(() => {
        //console.log('Explain Answers:', explainAnswers);
    }, [explainAnswers]);


    const handleExplainAnswer = useCallback(async (question, userAnswer) => {
        try {
            return await axios.post('api/check-quiz-answers', {question, userAnswer})
        } catch (error) {
            console.log('Error fetching the data:', error)
        }
    }, [])


    async function handleAnswers() {
        setEvaluationStarted(true)

        let score = 0
        let misconceptions = []

        if (Object.keys(selectedAnswers).length !== 0) {
            for (const key in selectedAnswers) {

                let isCorrect = true

                const question = selectedAnswers[key]

                question.forEach((answer) => {
                    if (!answer.isCorrect) {
                        isCorrect = false
                    }

                    const misconception = answer.misconception

                    if (misconception) {
                        if (!misconceptions.includes(misconception)) {
                            misconceptions.push(misconception)
                        }
                    }
                })
                if (isCorrect) {
                    score++
                }
            }
        }

        //to be evaluated by something (gpt or test cases?)
        if (Object.keys(explainAnswers).length !== 0) {
            for (const key in explainAnswers) {
                //handle the checking of the correctness of the textual answer here before finishing the score calculation
                const response = await handleExplainAnswer(questions[key], explainAnswers[key].answer)

                //see if the answer was correct by waiting for the API response
                if (response.data.status) {
                    explainAnswers[key]["isCorrect"] = true
                    score++
                }else{
                    explainAnswers[key]["isCorrect"] = false
                }
            }
        }

        setQuizResults({
            multiple_choice_answers: selectedAnswers,
            explain_answers: explainAnswers,
            score: score,
            misconceptions: misconceptions
        })

        setEvaluationStarted(false)
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

    const renderLoadingIcon = () => {
        return (
            <Container>
                <LoopIcon sx={{
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                        "0%": {
                            transform: "rotate(360deg)",
                        },
                        "100%": {
                            transform: "rotate(0deg)",
                        },
                    },
                }}/>
            </Container>
        )
    }

    const renderQuizPaper = () => {
        return (
            <Container>
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
            </Container>
        )
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
                {evaluationStarted ? renderLoadingIcon() : renderQuizPaper()}
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
