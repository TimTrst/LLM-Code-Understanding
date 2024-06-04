import React, {useEffect, useRef, useState} from "react"
import {Paper, Card, List, Button} from "@mui/material"
import ManualInput from "./ManualInput"
import ListItem from "@mui/material/ListItem"
import axios from 'axios'
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from '@mui/icons-material/Delete'
import "../App.css"

function LmmChat() {
    const [messages, setMessages] = useState([])
    const [responseReceived, setResponseReceived] = useState(true)
    const messagesEndRef = useRef(null);

    const handleSend = async (userInput) => {
        setMessages((prevMessages) => [...prevMessages, { text: userInput, user: true }]);

        if (!responseReceived) return

        try {
            setResponseReceived(false)

            setMessages((prevMessages) => [...prevMessages, { text: "Loading...", user: false }]);

            const response = await axios.post('api/requests', {
                message: userInput,
            })

            const systemResponse = response.data.text

           setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => msg.text !== "Loading...");
                return [...updatedMessages, { text: systemResponse, user: false }];
            });
            setResponseReceived(true)
        } catch (error) {
            console.log('Error while fetching the API: ', error)
        }
    }

    const handleDelete = () => {
       setMessages([])
        //todo: delete the chat session with chatgpt aswell?
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Paper elevation={3} sx={{height: '48em', my: 4, py: 2, px: 2, bgcolor: "fourthColor.main"}}>
            <Card sx={{height: '30em', my: 2, py: 2, px: 2, bgcolor: "secondary.main"}}>
                <List ref={messagesEndRef} sx={{maxHeight: 460, overflowY: 'auto'}}>
                    {messages.map((message, index) => (
                        <ListItem key={index} sx={{paddingLeft:0}}>
                            <Paper className={message.user ? "message-user" : "message-system"} elevation={2}
                                   sx={{
                                       padding: 1,
                                       bgcolor: message.user ? "fourthColor.main" : "primary.main",
                                       marginLeft: message.user ? 'auto' : 'none'
                                   }}>
                                    <ListItemText
                                        primary={message.text}
                                        sx={{textAlign: message.user ? 'right' : 'left'}}
                                    />
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <ManualInput onSend={handleSend}/>
            <Button sx={{mb:2}} variant="contained" onClick={handleDelete} startIcon={<DeleteIcon/>}>Clear</Button>
        </Paper>
    );
}

export default LmmChat;
