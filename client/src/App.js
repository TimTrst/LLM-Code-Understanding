import React, {useEffect, useState} from 'react'
import Ide from "./IDE/Ide"
import Sidebar from "./Sidebar/Sidebar"
import LLMChat from "./LLMChat/LLMChat"
import "./App.css"
import {Container, Typography} from "@mui/material";
import PromptlessInteraction from "./PromptlessInteraction/PromptlessInteraction";
import axios from "axios";
import AlertNotification from "./LLMChat/AlertNotification";
import initialCode from "./IDE/initialCode";

function App() {
    const [inputCode, setInputCode] = useState('')
    const [response, setResponse] = useState({})
    const [promptlessTextForChat, setPromptlessTextForChat] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [responseReceived, setResponseReceived] = useState(true)

    useEffect(() => {
        // Set the initial code when the component mounts
        setInputCode(initialCode)
    }, []);
    
    const handlePromptlessRequest = async (promptlessTopic) => {
        try {
            const isValid = checkRequest(promptlessTopic, inputCode)
            if (isValid) {
                setResponseReceived(false)
                const response = await axios.post('api/explain-prompts', {promptlessTopic, inputCode})
                setResponseReceived(true)
                setResponse(response.data)

            }
        } catch (error) {
            console.log("Error fetching the data:", error)
            setResponseReceived(true)
        }
    }

    const handleManualRequest = async (manualTopic) => {
        try {
            const isValid = checkRequest(manualTopic, inputCode)
            if (isValid) {
                setResponseReceived(false)
                const response = await axios.post('api/manual-prompts', {manualTopic, inputCode})
                setResponseReceived(true)
                setResponse(response.data)
            }
        } catch (error) {
            console.log("Error fetching the data:", error)
            setResponseReceived(true)
        }
    }

    function checkRequest(request, inputCode) {
        if (request === "" && inputCode === "") {
            setAlertMessage("You need to input code into the ide and a valid question for ChatGPT")
            setAlertSeverity("warning");
            return false
        } else if (request === "") {
            setAlertMessage("You need to input a valid question for ChatGPT. \n Use a button or make a manual request in the chatbox.")
            setAlertSeverity("warning")
            return false
        } else if (inputCode === "") {
            setAlertMessage("You need to input code into the ide at the top of the page.")
            setAlertSeverity("warning");
            return false
        } else {
            setAlertMessage('')
            setAlertSeverity('')
            return true
        }
    }

    return (
        <div className="App" style={{display: "flex", flexDirection: "row"}}>
            <Sidebar/>
            <Container sx={{display: "flex", flexDirection: "column", height: "100%", mt: 10}}>
                <Typography variant="h1" sx={{my: 4, textAlign: 'center', color: "primary.main"}}>
                    Code Understanding
                </Typography>
                <Ide inputCode={inputCode} setInputCode={setInputCode}/>
                <PromptlessInteraction handlePromptlessRequest={handlePromptlessRequest}
                                       setPromptlessTextForChat={setPromptlessTextForChat}
                                       responseReceived={responseReceived} setResponseReceived={setResponseReceived}/>
                <LLMChat response={response} promptlessTextForChat={promptlessTextForChat}
                         handleManualRequest={handleManualRequest} responseReceived={responseReceived}
                         setResponseReceived={setResponseReceived}/>
                {alertMessage && (
                    <AlertNotification message={alertMessage} severity={alertSeverity}/>
                )}
            </Container>
        </div>
    );
}

export default App;
