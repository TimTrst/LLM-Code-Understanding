import React, { useState } from 'react'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

function FeedbackSlider({ setFeedback }) {
    const [localFeedback, setLocalFeedback] = useState(0)

    function handleResetFeedback(){
        setLocalFeedback( 0)
        setFeedback(0)
    }

     function handleSetFeedback() {
        setFeedback(localFeedback)
    }

    return (
        <Box sx={{my: 4, px:4}}>
            <Typography id="discrete-slider" gutterBottom>
                Rate your understanding of the last explanation:
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Slider
                    value={localFeedback}
                    onChange={(e, newValue) => setLocalFeedback(newValue)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
                <Button variant={'outlined'} sx={{marginLeft:2}} onClick={handleSetFeedback}>Set</Button>
                <Button variant={'outlined'} sx={{marginLeft:2}} onClick={handleResetFeedback}>Reset</Button>
            </Box>
        </Box>
    )
}

FeedbackSlider.propTypes = {
    feedback: PropTypes.number,
    setFeedback: PropTypes.func,
}

export default FeedbackSlider