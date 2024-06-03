import React, {useEffect, useRef, useState} from "react";
import {Paper, Card, List} from "@mui/material";
import ManualInput from "./ManualInput";
import ListItem from "@mui/material/ListItem";
import axios from 'axios'
import ListItemText from "@mui/material/ListItemText";

function LmmChat() {
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null);

    const handleSend = async (userInput) => {
        setMessages((prevMessages) => [...prevMessages, { text: userInput, user: true }]);

        console.log(userInput)
        console.log(messages)

        try {
            setMessages((prevMessages) => [...prevMessages, { text: "Loading...", user: false }]);

            const response = await axios.post('api/requests', {
                message: userInput,
            })

            //setSystemResponse(response.data.text)
            const systemResponse = response.data.text

           setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => msg.text !== "Loading...");
                return [...updatedMessages, { text: systemResponse, user: false }];
            });
        } catch (error) {
            console.log('Error while fetching the API: ', error)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Paper elevation={3} sx={{height: '49em', my: 4, py: 2, px: 2, bgcolor: "fourthColor.main"}}>
            <Card sx={{height: '30em', my: 2, py: 2, px: 2, bgcolor: "secondary.main"}}>
                <List ref={messagesEndRef} sx={{maxHeight: 460, overflowY: 'auto'}}>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <Paper elevation={2}
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
        </Paper>
    );
}

export default LmmChat;
