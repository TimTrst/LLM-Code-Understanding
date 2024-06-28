import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box";
import {Button, Grid, IconButton } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from "prop-types";

function FeedbackSlider({setFeedback}) {
    const [localFeedback, setLocalFeedback] = useState(0)

    //resets the feedback
    //0 means that the backend won't include feedback into the prompts
    function handleResetFeedback() {
        setLocalFeedback(0)
        setFeedback(0)
    }

    //sets the feedback for the parent components
    //App.js gets this feedback passed back through the setFeedbackHook (implemented in the Parent)
    function handleSetFeedback() {
        setFeedback(localFeedback)
    }

    const levels = [
        {level: 1, label: 'Very Bad', icon: <SentimentVeryDissatisfiedIcon fontSize="large" />, key: "very-dissatisfied"},
        {level: 2, label: 'Bad', icon: <SentimentDissatisfiedIcon fontSize="large" />, key: "dissatisfied"},
        {level: 3, label: 'Neutral',  icon: <SentimentNeutralIcon fontSize="large" />, key: "neutral"},
        {level: 4, label: 'Good', icon: <SentimentSatisfiedIcon fontSize="large" />, key: "satisfied"},
        {level: 5, label: 'Very Good', icon: <SentimentVerySatisfiedIcon fontSize="large" />, key: "very-satisfied" },
    ]

    return (
        <Box sx={{my: 6, px: 4}}>
            <Typography id="discrete-slider" gutterBottom sx={{mx:5.2, marginBottom: 2}}>
                Rate your understanding of the last explanation:
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
               {levels.map((level) => (
                    <Grid item key={level.level}>
                        <IconButton
                            color={localFeedback === level.level ? 'primary' : 'default'}
                            onClick={() => setLocalFeedback(level.level)}
                        >
                            {level.icon}
                        </IconButton>
                        <Typography variant="caption" display="block" align="center">
                            {level.label}
                        </Typography>
                    </Grid>
                ))}
                <Button variant={'outlined'} sx={{}} onClick={handleSetFeedback}>Set</Button>
                <Button variant={'outlined'} sx={{}} onClick={handleResetFeedback}>Reset</Button>
            </Box>
        </Box>
    )
}

FeedbackSlider.propTypes = {
    setFeedback: PropTypes.func,
}

export default FeedbackSlider