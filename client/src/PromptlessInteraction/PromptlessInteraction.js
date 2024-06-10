import React, {useState} from "react"
import {Button, Box, Paper} from "@mui/material"
import PropTypes from "prop-types"
import FeedbackSlider from "./FeedbackSlider"

const PromptlessInteraction = ({
                                   handlePromptlessRequest,
                                   setPromptlessTextForChat,
                                   responseReceived,
                                   setFeedback
                               }) => {

    const [questionAsked, setQuestionAsked] = useState(false)

    const baseButtons = {
        explain: 'Explain',
        line_by_line: 'Line-By-Line',
        key_concepts: 'Key-Concepts',
        misconceptions: 'Misconceptions',
        optimization: 'Optimization'
    }

    const basePrompts = {
        explain: 'Explain the following recursive problem',
        line_by_line: 'Provide a step-by-step explanation for the following problem',
        key_concepts: 'Explain and Highlight the Key-Concepts of the given problem.',
        misconceptions: 'Explain the following problem and highlight common misconceptions.',
        optimization: 'How can this code be optimized. Show an iterative equivalent. Which is more efficient?'
    }


    const handleSubmitPrompt = (topic) => {
        setQuestionAsked(true)
        if (responseReceived) {
            setPromptlessTextForChat(basePrompts[topic])
            handlePromptlessRequest(topic)
        }
    }

    return (
        <Paper elevation={3} sx={{my: 2, py: 2, px: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                {
                    Object.entries(baseButtons).map(([key, value]) => {
                        return <Button key={key} variant="contained" sx={{mx: 2}}
                                       onClick={() => handleSubmitPrompt(key)}>{value}
                        </Button>
                    })
                }
            </Box>
            {questionAsked && <FeedbackSlider setFeedback={setFeedback} />}
        </Paper>)
}

PromptlessInteraction.propTypes = {
    handlePromptlessRequest: PropTypes.func.isRequired,
    setPromptlessTextForChat: PropTypes.func.isRequired,
    responseReceived: PropTypes.bool,
    setFeedback: PropTypes.func,
}

export default PromptlessInteraction