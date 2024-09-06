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

/**
 * The `LLMChat` component renders the chat component for the conversation between user and LLM
 *
 * @param {Object} response - The system response to be added to the chat
 * @param {Object} promptlessTextForChat - The template string to be added as a user request in the chat (in case of a promptless-button request)
 * @param {function} handleManualRequest - Function that sends the manual input to the parent component
 * @param {boolean} responseReceived - Indicates whether the system response is received or still pending
 * @param {boolean} requestFailed - Indicates whether the request to the backend failed
 * @param {function} handleDelete - Function that requests the deletion of the conversation history
 * @returns {JSX.Element} The JSX code for rendering the LLMChat component.
**/
function LLMChat({response, promptlessTextForChat, handleManualRequest, responseReceived, requestFailed, handleDelete}) {
    // state to save all messages of the conversation so far
    const [messages, setMessages] = useState([])

    // to scroll to the end of the chat
    const messagesEndRef = useRef(null);

    // adds manual prompts to the chat
    // calls the parent component API with the manualRequest input
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

    // removes the loading message from the chat as soon as the system response is received
    function removeLoadingAndAddSystemResponse(message) {
        setMessages((prevMessages) => {
            const updatedMessages = prevMessages.filter((msg) => msg.text !== "Loading...");
            return [...updatedMessages, {text: message, user: false}];
        });
    }

    // clears the chat messages
    // calls the parent method to request the deletion of the history
    function clearMessages(){
        handleDelete()
        setMessages([])
    }

    // adds a message to the chat
    function addMessageToChat(message, isUser) {
        setMessages((prevMessages) => [...prevMessages, {text: message, user: isUser}]);
    }

    // scroll to the newest chat message
    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }

    // adds the loading message to the chat as soon as the promptless-interaction request state changes
    // unwanted effect at the moment: pressing the same promptless-request button won't add the message again
    // -> could be confusing the user (request is still sent again)
    // --> maybe don't send again? One time is enough?!
    useEffect(() => {
        if (promptlessTextForChat !== "") {
            addMessageToChat(promptlessTextForChat, true)
            addMessageToChat("Loading...", false)
        }
    }, [promptlessTextForChat]);

    // if a response is received (response state changed) then add the new message
    // if request failed -> add error message
    useEffect(() => {
        if (requestFailed) {
            removeLoadingAndAddSystemResponse("Something went wrong. Check the Code")
        } else if (Object.keys(response).length !== 0) {
            removeLoadingAndAddSystemResponse(response['text'])
        }
    }, [response, requestFailed]);

    // if message state changes -> scroll to bottom
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
