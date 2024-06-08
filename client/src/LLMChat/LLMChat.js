import React, {useEffect, useRef, useState} from "react"
import {Paper, Card, List, Button} from "@mui/material"
import ManualInput from "./ManualInput"
import ListItem from "@mui/material/ListItem"
import axios from 'axios'
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from '@mui/icons-material/Delete'
import "../App.css"
import PropTypes from "prop-types";

function LLMChat({ response, promptlessTextForChat, handleManualRequest, responseReceived } ) {
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null);

    const handleSend = async (manualRequest) => {
        console.log(responseReceived)
        if (!responseReceived) return

        if (manualRequest !== ''){
            addMessageToChat(manualRequest, true)
            addMessageToChat("Loading...", false)
            handleManualRequest(manualRequest)
        }else{
            handleManualRequest("")
        }
    }

    function removeLoadingAndAddSystemResponse(message){
        setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => msg.text !== "Loading...");
                return [...updatedMessages, { text: message, user: false }];
        });
    }

   function addMessageToChat(message, isUser){
        setMessages((prevMessages) => [...prevMessages, { text: message, user: isUser }]);
    }

    const handleDelete = async () => {
        try{
            await axios.get('api/delete-context').then(res => {
            //return a status incase there was a problem with the context delete by chatgpt or my api
            const deleteStatus = res.data.status

            addMessageToChat(deleteStatus, false)
        })
       } catch (error){
            console.log("There was an error while trying to request the deletion of ChatGpt's context.")
        }
       setMessages([])
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }

    useEffect(() => {
        if(promptlessTextForChat !== ""){
            addMessageToChat(promptlessTextForChat, true)
            addMessageToChat("Loading...", false)
        }
    }, [promptlessTextForChat]);

    useEffect(() => {
        if(Object.keys(response).length !== 0){
             removeLoadingAndAddSystemResponse(response['text'])
        }
    }, [response]);

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

LLMChat.propTypes = {
  response: PropTypes.object,
    handleManualRequest: PropTypes.func.isRequired,
    promptlessTextForChat: PropTypes.string,
    responseReceived: PropTypes.bool,
};

export default LLMChat;
