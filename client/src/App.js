import React, {useState} from 'react'
import Ide from "./IDE/Ide"
import Sidebar from "./Sidebar/Sidebar"
import LLMChat from "./LLMChat/LLMChat"
import "./App.css"
import {Container, Typography} from "@mui/material";
import PromptlessInteraction from "./PromptlessInteraction/PromptlessInteraction";
import axios from "axios";


function App() {
    const [topic, setTopic] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [response, setResponse] = useState({})
    const [promptlessTextForChat, setPromptlessTextForChat] = useState('')

    const handlePromptlessRequest = async () => {
        try {
            const response = await axios.post('api/explain-prompts', {topic, inputCode});
            console.log("handlePromptlessRequest()")
            setResponse(response.data)
        } catch (error) {
            console.log("Error fetching the data:", error)
        }
    }

    return (
        <div className="App" style={{display: "flex", flexDirection: "row"}}>
            <Sidebar/>
            <Container sx={{display: "flex", flexDirection: "column", height: "100%", mt: 10}}>
                <Typography variant="h1" sx={{my: 4, textAlign: 'center', color: "primary.main"}}>
                    Code Understanding
                </Typography>
                <Ide setInputCode={ setInputCode }/>
                <PromptlessInteraction handlePromptlessRequest={ handlePromptlessRequest } setTopic={ setTopic } setPromptlessTextForChat={ setPromptlessTextForChat }/>
                <LLMChat response={ response } promptlessTextForChat={ promptlessTextForChat }/>
            </Container>
        </div>
    );
}

export default App;
