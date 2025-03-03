import React, {useEffect, useState, useCallback, useRef} from 'react'
import Ide from './IDE/Ide'
import LLMChat from './LLMChat/LLMChat';
import {Button, Container, FormControlLabel, FormGroup, Switch, Typography} from '@mui/material'
import QuizIcon from '@mui/icons-material/Quiz'
import PromptlessInteraction from './PromptlessInteraction/PromptlessInteraction'
import axios from 'axios'
import AlertNotification from './AlertNotification'
import initialCode from './IDE/CodeExamples'
import Quiz from "./Quiz/Quiz"
import ResultComponent from "./Quiz/ResultComponent"
import ArrowTooltipComponent from "./ArrowTooltip";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

/**
 * The `App` component renders the main application
 *
 * @returns {JSX.Element} The JSX code for rendering the App in the index parent component.
 */
function App() {
    const [inputCode, setInputCode] = useState('') // code string from the ide component
    const [response, setResponse] = useState({}) // the string coming from chatgpt to either the promptless or prompt-based question
    const [promptlessTextForChat, setPromptlessTextForChat] = useState('') // a string for the chatbox, simulates a user question to chatgpt (not the actual prompt)
    const [alertMessage, setAlertMessage] = useState('') // set the alert message for the AlertNotification component
    const [alertSeverity, setAlertSeverity] = useState('') // set the type of alert for the AlertNotification component
    const [responseReceived, setResponseReceived] = useState(true) // check if the response is received and can be output to the user
    const [requestFailed, setRequestFailed] = useState(false) // check if a promptless/prompt-based request failed
    const [feedback, setFeedback] = useState(0)

    const [showPreQuiz, setShowPreQuiz] = useState(null) // if true -> the pre-quiz is rendered instead of the code-explain tool
    const [preQuizSubmitted, setPreQuizSubmitted] = useState(false) // indicates if the pre-quiz was successfully finished
    const [preQuizResults, setPreQuizResults] = useState({answers: [], score: 0}) // state to manage the pre-quiz results

    const [showPostQuiz, setShowPostQuiz] = useState(false) // if true -> the post-quiz is rendered instead of the code-explain tool
    const [postQuizSubmitted, setPostQuizSubmitted] = useState(null) // indicates if the post-quiz was successfully finished
    const [postQuizResults, setPostQuizResults] = useState({answers: [], score: 0}) // state to manage the post-quiz results

    const quizResultEndRef = useRef(null) // reference object to be appended at a html tag to scroll the page to if changed

    const [explainPromptType, setExplainPromptType] = useState("explain-prompts") // state to handle the API parameter to generate a LLM response by a button click

    useEffect(() => {
        // Set the initial code when the component mounts
        setInputCode(initialCode["factorial"].code)
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [postQuizSubmitted])


    // Function to check if conditions are met before allowing an api request to be sent
    // request: a valid request string to chatgpt (promptless/manual)
    // inputCode: a valid code string from coming from the ide component
    const checkRequest = useCallback((request, inputCode) => {
        if (request === '' && inputCode === '') {
            setRequestFailed(true)
            setAlertMessage('You need to input code into the ide and a valid question for ChatGPT')
            setAlertSeverity('warning')
            return false
        } else if (request === '') {
            setRequestFailed(true)
            setAlertMessage('You need to input a valid question for ChatGPT. \n Use a button or make a manual request in the chatbox.')
            setAlertSeverity('warning')
            return false
        } else if (inputCode === '') {
            setRequestFailed(true)
            setAlertMessage('You need to input code into the ide at the top of the page.')
            setAlertSeverity('warning')
            return false
        } else {
            setRequestFailed(false)
            setAlertMessage('')
            setAlertSeverity('')
            return true
        }
    }, [])

    const isValidResponse = useCallback((requestResponse) => {
        if ('error' in requestResponse) {
            setResponse({text: 'Something went wrong. Check the code.'})
            if (requestResponse['error'] === 'Compilation unsuccessful') {
                setAlertSeverity('error')
                setAlertMessage('An error occurred while trying to compile the code at ' + requestResponse['output'])
            } else {
                setAlertSeverity('error')
                setAlertMessage('unknown error occurred')
            }
            return false
        } else {
            return true
        }
    }, [])

    // API request to make a promptless request to chat gpt
    // "promptlessTopic" are shortcuts indicating for the backend which prompt is requested
    const handlePromptlessRequest = useCallback(async (promptlessTopic) => {
        try {
            const isValid = checkRequest(promptlessTopic, inputCode)
            if (isValid) {
                setResponseReceived(false)
                console.log(explainPromptType)
                const requestResponse = await axios.post(`api/${explainPromptType}`, {
                    promptlessTopic,
                    inputCode,
                    feedback
                })

                setResponseReceived(true)

                if (isValidResponse(requestResponse.data)) {
                    setResponse(requestResponse.data)
                }
            }
        } catch (error) {
            console.log('Error fetching the data:', error)
            setResponseReceived(true)
        }
    }, [checkRequest, inputCode, feedback, explainPromptType, isValidResponse])

    // API request for "manual" requests to chatgpt (user can chat with own prompts)
    const handleManualRequest = useCallback(async (manualTopic) => {
        try {
            const isValid = checkRequest(manualTopic, inputCode)
            if (isValid) {
                setResponseReceived(false)
                const requestResponse = await axios.post('api/manual-prompts', {manualTopic, inputCode})
                setResponseReceived(true)
                if (isValidResponse(requestResponse.data)) {
                    setResponse(requestResponse.data)
                }
            }
        } catch (error) {
            console.log('Error fetching the data:', error)
            setResponseReceived(true)
        }
    }, [checkRequest, inputCode, isValidResponse])

    // API request to clear the context/history of the current conversation with chatgpt
    const handleDelete = useCallback(async () => {
        try {
            await axios.get('api/delete-context').then(res => {
                // return a status in case there was a problem with the context delete by chatgpt or my api
                const deleteStatus = res.data.status;

                if (deleteStatus === 'success') {
                    setAlertMessage('Cleared the chat and context ' + deleteStatus);
                    setAlertSeverity('info');
                }
            });
        } catch (error) {
            console.log("There was an error while trying to request the deletion of ChatGPT's context.");
        }
    }, [])

    const scrollToBottom = () => {
        quizResultEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    const handleSwitchUrl = () => {
        if (explainPromptType === "explain-prompts") {
            setExplainPromptType("explain-prompts-with-validation")
        } else {
            setExplainPromptType("explain-prompts")
        }
    }

    const handleShowEndingQuiz = () => setShowPostQuiz(true)
    const handleYes = () => setShowPreQuiz(true)
    const handleNo = () => setShowPreQuiz(false)

    if (showPreQuiz === null) {
        return (
            <Container style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100vh', textAlign: 'center'
            }}>
                <Typography>Do you want to do an initial Quiz?</Typography>
                <Container sx={{my: 4}}>
                    <Button onClick={handleYes} sx={{mx: 2}}>Yes</Button>
                    <Button onClick={handleNo}>No</Button>
                </Container>
            </Container>
        )
    }

    if (showPostQuiz && !postQuizSubmitted) {
        return (
            <Quiz setQuizSubmitted={setPostQuizSubmitted} setQuizResults={setPostQuizResults} quizType={'ending'}/>
        )
    }

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'row'}}>
            {(!preQuizSubmitted && showPreQuiz) ? <Quiz setQuizSubmitted={setPreQuizSubmitted}
                                                        setQuizResults={setPreQuizResults} quizType={'initial'}/> :
                <Container sx={{display: 'flex', flexDirection: 'column', height: '100%', mt: 10}}>
                    <Typography variant="h1" sx={{my: 4, textAlign: 'center', color: 'secondary.main'}}>
                        Promptelix
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'left', gap: 1}}>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={explainPromptType !== "explain-prompts"}
                                                               onChange={handleSwitchUrl}/>}
                                              label={"Validation"}></FormControlLabel>
                        </FormGroup>
                        <ArrowTooltipComponent title={"Enabling validation will result in significantly more tokens."}
                                               placement={"top"}>
                            <Box sx={{padding: 1}}>
                                <InfoIcon/>
                            </Box>
                        </ArrowTooltipComponent>
                    </Box>
                    <Ide inputCode={inputCode} setInputCode={setInputCode}/>
                    <PromptlessInteraction
                        handlePromptlessRequest={handlePromptlessRequest}
                        setPromptlessTextForChat={setPromptlessTextForChat}
                        responseReceived={responseReceived}
                        setFeedback={setFeedback}
                        feedback={feedback}
                    />
                    <LLMChat
                        response={response}
                        promptlessTextForChat={promptlessTextForChat}
                        handleManualRequest={handleManualRequest}
                        responseReceived={responseReceived}
                        requestFailed={requestFailed}
                        handleDelete={handleDelete}
                    />
                    {alertMessage && (
                        <AlertNotification message={alertMessage} severity={alertSeverity}/>
                    )}
                    {preQuizSubmitted && !postQuizSubmitted &&
                        <Button onClick={handleShowEndingQuiz}><QuizIcon/></Button>
                    }
                    {postQuizSubmitted &&
                        <div ref={quizResultEndRef}><ResultComponent preQuizResults={preQuizResults}
                                                                     postQuizResults={postQuizResults}/></div>
                    }
                </Container>}
        </div>
    )
}

export default App
