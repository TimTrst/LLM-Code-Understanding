import React, {useState} from "react"
import {Button, Box, Paper} from "@mui/material"
import PropTypes from "prop-types"
import FeedbackSlider from "./FeedbackSlider"
import ArrowTooltipComponent from "../ArrowTooltip"
import InfoIcon from '@mui/icons-material/Info'

/**
 * The `PromptlessInteraction` component renders a Button row for the promptless interaction.
 *
 * @param {function} handlePromptlessRequest - Function from the parent component (App) to send the request to the backend
 * @param {function} setPromptlessTextForChat - Function from the parent component that sets the template text to output in the chat component
 * @param {boolean} responseReceived - If true, then a new request can be sent
 * @param {function} setFeedback - sets the feedback in the parent component (App)
 * @param {number} setFeedback - feedback set in the parent component (App)
 *
 * @returns {JSX.Element} The JSX code for rendering the PromptlessInteraction component.
 */
const PromptlessInteraction = ({
                                   handlePromptlessRequest,
                                   setPromptlessTextForChat,
                                   responseReceived,
                                   setFeedback,
                                   feedback
                               }) => {

    const [questionAsked, setQuestionAsked] = useState(false)

    const baseButtons = {
        explain: 'Explain',
        line_by_line: 'Line-By-Line',
        iterative_comparison: 'Iterative-Comparison',
        example: 'Example',
        head_vs_tail_recursion: 'Head-vs-Tail-Recursion'
        //optimization: 'Optimization'
    }

    const basePrompts = {
        explain: 'Explain the following recursive problem',
        line_by_line: 'Provide a step-by-step explanation for the following problem',
        iterative_comparison: 'Compare the following recursive code with its iterative equivalent.',
        example: 'Explain by showing an easy to understand, real life example.',
        head_vs_tail_recursion: 'Explain the concepts of head and tail recursion using the provided code example.'
        //optimization: 'How can this code be optimized. Show an iterative equivalent. Which is more efficient?'
    }

    const toolTipInfo = {
        explain: {
            tooltip: "Ask GPT to create a thorough explanation of the provided code. Not focusing on any part in particular.",
            position: "left"
        },
        line_by_line: {
            tooltip: "Ask GPT to produce an explanation of the provided code, by explaining each individual line.",
            position: "bottom"
        },
        iterative_comparison: {
            tooltip: "Ask GPT to provide an explanation of the code provided by comparing the recursive code provided with code that achieves the same goal in an iterative way.",
            position: "bottom"
        },
        example: {
            tooltip: "Ask GPT to create an explanation by providing a real-world analogy that matches the recursive concept of the code provided.",
            position: "bottom"
        },
        head_vs_tail_recursion: {
            tooltip: "Ask GPT to create a comparison between the concept of head and tail recursion."
        }
        //optimization: {
        //    tooltip: "Ask GPT to show any optimization possibilities and an optimized version of the code.",
        //    position: "right"
        //},
    }

    const promptlessInteractionTooltip = "These buttons are designed to make it easier for you to get explanations for your code without having to manually write prompts. Simply click on any of these buttons, and our application will automatically generate a prompt to the LLM API, providing you with explanations and insights into your code."

    const handleSubmitPrompt = (topic) => {
        setQuestionAsked(true)
        if (responseReceived) {
            setPromptlessTextForChat(basePrompts[topic])
            handlePromptlessRequest(topic)
        }
    }

    return (
        <Paper className={"paper-shadow-depth"} elevation={3}
               sx={{my: 2, py: 2, px: 1, backgroundColor: "fourthColor.main", position: 'relative'}}>

            <Box sx={{position: 'absolute', top: 0, left: 0, p: 1}}>
                <ArrowTooltipComponent title={promptlessInteractionTooltip} placement={"left"}>
                    <InfoIcon/>
                </ArrowTooltipComponent>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                {
                    Object.entries(baseButtons).map(([key, value]) => {
                        return <ArrowTooltipComponent key={key} placement={toolTipInfo[key]["position"]}
                                                      title={toolTipInfo[key]["tooltip"]}>
                            <Button key={key + "-tooltip"} variant="contained"
                                    sx={{mx: 2, backgroundColor: "secondary.main", border: "7px outset black"}}
                                    onClick={() => handleSubmitPrompt(key)}>{value}
                            </Button>
                        </ArrowTooltipComponent>
                    })
                }
            </Box>
            {questionAsked && <FeedbackSlider setFeedback={setFeedback} feedback={feedback}/>}
        </Paper>)
}

PromptlessInteraction.propTypes = {
    handlePromptlessRequest: PropTypes.func.isRequired,
    setPromptlessTextForChat: PropTypes.func.isRequired,
    responseReceived: PropTypes.bool,
    setFeedback: PropTypes.func,
    feedback: PropTypes.number,
}

export default PromptlessInteraction