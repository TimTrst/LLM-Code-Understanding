import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from "prop-types"
import questionsInit from "./QuestionsInit"
import questionsEnd from "./QuestionsEnd"
import Question from "./Question"
import {Button, Container, Paper, Typography} from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import remarkGfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import axios from "axios"
import AlertNotification from "../AlertNotification"
import LoadingIcon from "../LoadingIcon";

const Quiz = ({setQuizSubmitted, setQuizResults, quizType}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState(questionsInit)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [explainAnswers, setExplainAnswers] = useState({})
    const [evaluationStarted, setEvaluationStarted] = useState(false)
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(null)

    useEffect(() => {
        if (quizType === 'initial') {
            setQuestions(questionsInit)
        } else {
            setQuestions(questionsEnd)
        }
    }, [quizType]);

    useEffect(() => {
        //console.log('Selected Answers:', selectedAnswers);
    }, [selectedAnswers])

    useEffect(() => {
        //console.log('Explain Answers:', explainAnswers);
    }, [explainAnswers])

    const handleExplainAnswer = useCallback(async (question, userAnswer) => {
        try {
            return await axios.post('api/check-quiz-answer', {question, userAnswer})
        } catch (error) {
            console.log('Error fetching the data:', error)
        }
    }, [])


    // this function will be called after a quiz is submitted
    // calculating the scores based on the answers in:
    // 1. selectedAnswers (object with all multiple choice answers)
    // 2. explainAnswers (object with all explain type answers)
    // note that the explain type answer is validated by gpt through an api call
    async function handleAnswers() {

        const questions_count = questions.length
        const selectedAnswers_count = Object.keys(selectedAnswers).length
        const explainAnswers_count = Object.keys(explainAnswers).length

        if(selectedAnswers_count + explainAnswers_count < questions_count){
            setAllQuestionsAnswered(false)
            return
        }else{
            setAllQuestionsAnswered(true)
        }

        setEvaluationStarted(true)

        // total score for a quiz
        let score = 0
        // gathering of misconceptions found by analyzing the quiz answers
        let misconceptions = []

        if (Object.keys(selectedAnswers).length !== 0) {
            for (const key in selectedAnswers) {
                let isCorrect = true
                const question = selectedAnswers[key]

                // check every mutliple choice answer and
                question.forEach((answer) => {
                    if (!answer.isCorrect) {
                        isCorrect = false

                        // see what misconception was connected to the wrong answer
                        const misconception = answer.misconception

                        // add the misconception if not already present
                        if (misconception) {
                            if (!misconceptions.includes(misconception)) {
                                misconceptions.push(misconception)
                            }
                        }
                    }
                })
                if (isCorrect) {
                    score++
                }
            }
        }
        if (Object.keys(explainAnswers).length !== 0) {
            for (const key in explainAnswers) {
                //handle the checking of the correctness of the textual answer here before finishing the score calculation

                try {
                    //call to gpt api
                    //response.data will have a "text" section and an "misconception" section
                    //the misconceptions are provided to gpt with every request
                    const response = await handleExplainAnswer(questions[key], explainAnswers[key].answer)

                    if (Object.keys(response).length !== 0) {
                        const result = response.data["text"]
                        const feedback = result["feedback"] ? result["feedback"] : ""
                        const isCorrect = result["correct"] ? result["correct"] : false

                        //gpt tries to identify a misconception in the answer of the user and return it as an array
                        let misconceptionsList = []
                        misconceptionsList = result["misconception"]

                        // add misconceptions that the model found in the users answer
                        // don't add them if they are already present
                        if (misconceptionsList.length !== 0) {
                            misconceptionsList.forEach(misconception => {
                                if (!misconceptions.includes(misconception)) {
                                    misconceptions.push(misconception)
                                }
                            })
                        }

                        // if the answer was evaluated by the model to be correct -> increment the score
                        // if not -> flag as false and add the models feedback string
                        if (isCorrect) {
                            explainAnswers[key]["isCorrect"] = true
                            score++
                        } else {
                            explainAnswers[key]["isCorrect"] = false
                            explainAnswers[key]["feedback"] = feedback
                        }
                    }

                } catch (error) {
                    console.log("There was an error while trying to request an answer from chatgpt" + error);
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

    const renderQuizPaper = () => {
        return (
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
                {!allQuestionsAnswered && allQuestionsAnswered !== null && <AlertNotification message={"There are questions unanswered"} severity={"error"}/>}
            </Paper>
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
            {evaluationStarted ? <LoadingIcon /> : renderQuizPaper()}
        </Container>
    )
}

Quiz.propTypes = {
    setQuizSubmitted: PropTypes.func,
    setQuizResults: PropTypes.func,
    quizType: PropTypes.string,
}

export default Quiz;
