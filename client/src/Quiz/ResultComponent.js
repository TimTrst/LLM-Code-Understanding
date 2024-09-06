import React, {useCallback, useEffect, useState, useRef} from 'react'
import PropTypes from "prop-types"
import {Card, Container, Grid, Paper, Typography} from "@mui/material"
import ResultCard from "./ResultCard"
import axios from "axios"
import LoadingIcon from "../LoadingIcon"
import questionsInit from "./QuestionsInit"
import questionsEnd from "./QuestionsEnd"

/**
 * The `ResultComponent` component renders the container for displaying both pre- and post-quiz results
 *
 * @param {Object} preQuizResults - Object that holds the pre-quiz results
 * @param {Object} postQuizResults - Object that holds the post-quiz results
 *
 * @returns {JSX.Element} The JSX code for rendering the ResultComponent component.
 */
const ResultComponent = ({preQuizResults, postQuizResults}) => {

    const [quizEvaluation, setQuizEvaluation] = useState("")
    const hasFetchedData = useRef(false)
    const [selectSummaryPre, setSelectSummaryPre] = useState({})
    const [explainSummaryPre, setExplainSummaryPre] = useState({})
    const [selectSummaryPost, setSelectSummaryPost] = useState({})
    const [explainSummaryPost, setExplainSummaryPost] = useState({})

    // api call to the backend -> returns an evaluation based on extracted misconceptions
    const handleGPTQuizEvaluation = useCallback(async (misconceptions) => {
        try {
            const response = await axios.post('/api/analyse-quiz-results', {misconceptions})
            return response.data
        } catch (error) {
            console.log('Error fetching the data:', error)
            return null
        }
    }, [])

    // on mount -> take results of both quizzes and bring them in a format to analyze the results properly
    useEffect(() => {
        if (Object.keys(preQuizResults).length !== 0 && Object.keys(postQuizResults).length !== 0) {
            const arrayForMap = ["pre", "post"]
            let results = {}
            let questions = []

            arrayForMap.map((quiz) => {
                if (quiz === "pre") {
                    results = preQuizResults
                    questions = questionsInit
                } else {
                    results = postQuizResults
                    questions = questionsEnd
                }

                // merge the correct answers by the user with all answers
                questions.map((question, index) => {
                    if (question.type === "MC") {
                        const correctAnswers = question.answers.filter(a => a.isCorrect).map(a => a.id)
                        const userAnswers = results.multiple_choice_answers[index].map(answer => {
                            return answer.id
                        })

                        const tempLists = [
                            correctAnswers,
                            userAnswers
                        ]

                        const combinedWithoutDuplicates = [...new Set(tempLists.flat())]

                        // adding all possible answers for a single multiple-choice question
                        // flagging all answers that were provided by the user (user_answered)
                        // flagging them to be a correct answer or not
                        // helps to check and color the multiple choice checkboxes in the result cards
                        const combinedAnswersArray = combinedWithoutDuplicates.map(answerId => ({
                            id: answerId,
                            user_answered: userAnswers.includes(answerId),
                            isCorrect: question.answers[answerId].isCorrect
                        }));

                        if (quiz === "pre") {
                            setSelectSummaryPre(prevState => ({
                                ...prevState,
                                [question.id]: combinedAnswersArray
                            }))
                        } else {
                            setSelectSummaryPost(prevState => ({
                                ...prevState,
                                [question.id]: combinedAnswersArray
                            }))
                        }
                    } else if (question.type === "EXPLAIN") {
                        const correctAnswer = question.answers[0].id

                        // final explain type object for a question
                        // adding the feedback string by the gpt evaluation of the explain-type answer in case that the user answer was not correct
                        const explain_object = {
                                    correct_answer: question.answers[correctAnswer],
                                    user_answer: results.explain_answers[question.id].answer,
                                    is_correct: results.explain_answers[question.id].isCorrect,
                                    feedback: results.explain_answers[question.id].feedback,
                                }

                        if (quiz === "pre") {
                            setExplainSummaryPre(prevState => ({
                                ...prevState,
                                [question.id]: explain_object
                            }))
                        } else {
                            setExplainSummaryPost(prevState => ({
                                ...prevState,
                                [question.id]: explain_object
                            }))
                        }
                    }
                })

            })
        }
    }, [])

    // on mount of this component -> send a request to gpt to evaluate the quiz results based on extracted misconceptions
    useEffect(() => {
        if (hasFetchedData.current) return
        hasFetchedData.current = true
        const fetchData = async () => {
            let misconceptions = []
            setQuizEvaluation("")

            // merge all found misconceptions in one array
            if (Object.keys(preQuizResults).length !== 0 && Object.keys(postQuizResults).length !== 0) {
                const misconceptionsPre = preQuizResults.misconceptions;
                const misconceptionsPost = postQuizResults.misconceptions;
                misconceptions = misconceptionsPre.concat(misconceptionsPost);
            }

            if (misconceptions.length !== 0) {
                // request the api call
                const response = await handleGPTQuizEvaluation(misconceptions);
                if (response && response.text && response.text.result) {
                    setQuizEvaluation(response.text.result);
                }
            }
        }

        fetchData()
    }, [])


    return (
        <Container sx={{my: 3}}>
            <Paper elevation={3} sx={{px: 3, py: 3, bgcolor: "fourthColor.main"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ResultCard title="Quiz 1 Results" score={preQuizResults.score}
                                    selectSummary={selectSummaryPre} quizType={"pre"} explainSummary={explainSummaryPre}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ResultCard title="Quiz 2 Results" score={postQuizResults.score}
                                    selectSummary={selectSummaryPost} quizType={"post"} explainSummary={explainSummaryPost}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{padding: 2}}>
                            {quizEvaluation !== "" ? <Typography>{quizEvaluation}</Typography> : <LoadingIcon/>}
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

ResultComponent.propTypes = {
    preQuizResults: PropTypes.shape({
        score: PropTypes.number.isRequired,
        misconceptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        multiple_choice_answers: PropTypes.object.isRequired,
        explain_answers: PropTypes.object.isRequired
    }).isRequired,
    postQuizResults: PropTypes.shape({
        score: PropTypes.number.isRequired,
        misconceptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        multiple_choice_answers: PropTypes.object.isRequired,
        explain_answers: PropTypes.object.isRequired
    }).isRequired
};

export default ResultComponent