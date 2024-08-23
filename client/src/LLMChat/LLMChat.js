import React, {useEffect, useRef, useState} from "react"
import {Paper, Card, List, Button} from "@mui/material"
import ManualInput from "./ManualInput"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from '@mui/icons-material/Delete'
import "../App.css"
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function LLMChat({response, promptlessTextForChat, handleManualRequest, responseReceived, requestFailed, handleDelete}) {
    const [messages, setMessages] = useState([])

    const messagesEndRef = useRef(null);

    const handleManualSend = async (manualRequest) => {
        if (!responseReceived) return

        if (manualRequest !== '') {
            addMessageToChat(manualRequest, true)
            addMessageToChat("Loading...", false)
            handleManualRequest(manualRequest)
        } else {
            handleManualRequest('')
        }
    }

    function removeLoadingAndAddSystemResponse(message) {
        setMessages((prevMessages) => {
            const updatedMessages = prevMessages.filter((msg) => msg.text !== "Loading...");
            return [...updatedMessages, {text: message, user: false}];
        });
    }

    function clearMessages(){
        handleDelete()
        setMessages([])
    }

    function addMessageToChat(message, isUser) {
        setMessages((prevMessages) => [...prevMessages, {text: message, user: isUser}]);
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }

    useEffect(() => {
        if (promptlessTextForChat !== "") {
            addMessageToChat(promptlessTextForChat, true)
            addMessageToChat("Loading...", false)
        }
    }, [promptlessTextForChat]);

    useEffect(() => {
        if (requestFailed) {
            removeLoadingAndAddSystemResponse("Something went wrong. Check the Code")
        } else if (Object.keys(response).length !== 0) {
            removeLoadingAndAddSystemResponse(response['text'])
        }
    }, [response, requestFailed]);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <Paper elevation={3} sx={{height: '67em', my: 4, py: 2, px: 2, bgcolor: "fourthColor.main", borderRadius:3}}>
            <Card className={"custom-border"} sx={{height: '45em', my: 2, py:0.5, px: 2, bgcolor: "secondary.main", borderRadius:3}}>
                <List ref={messagesEndRef} sx={{maxHeight: 710, overflowY: 'auto'}}>
                    {messages.map((message, index) => (
                        <ListItem key={index} sx={{paddingLeft: 0}}>
                            <Paper className={message.user ? "message-user" : "message-system"} elevation={2}
                                   sx={{
                                       padding: 1,
                                       bgcolor: message.user ? "fourthColor.main" : "hsl(0,1%,14%)",
                                       color: message.user ? "" : "white",
                                       marginLeft: message.user ? 'auto' : 'none'
                                   }}>
                                {message.user ?
                                <ListItemText
                                    primary={message.text}
                                    sx={{textAlign: message.user ? 'right' : 'left'}}
                                /> :
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.text}
                                </ReactMarkdown>
                                }
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <ManualInput handleManualSend={handleManualSend}/>
            <Button sx={{mb: 2, bgcolor:"secondary.main", border: "7px outset black"}} variant="contained" onClick={clearMessages} startIcon={<DeleteIcon/>}>Clear</Button>
        </Paper>
    );
}

LLMChat.propTypes = {
    response: PropTypes.object,
    handleManualRequest: PropTypes.func.isRequired,
    promptlessTextForChat: PropTypes.string,
    responseReceived: PropTypes.bool,
    requestFailed: PropTypes.bool,
    handleDelete: PropTypes.func,
};

export default LLMChat;
