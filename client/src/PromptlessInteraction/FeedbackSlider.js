import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Grid, IconButton, Button } from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

/**
 * The `FeedbackSlider` component renders a feedback slider for the user to rate the LLM response difficulty
 * @param {function} setFeedback - function from the parent component (App) to set the feedback state there
 *
 * @returns {JSX.Element} The JSX code for rendering the FeedbackSlider component.
 */
const FeedbackSlider = React.memo(({ setFeedback, feedback }) => {
    const [localFeedback, setLocalFeedback] = useState(0)

    const handleResetFeedback = useCallback(() => {
        setLocalFeedback(0)
        setFeedback(0)
    }, [setFeedback])

    const handleSetFeedback = useCallback(() => {
        setFeedback(localFeedback)
    }, [localFeedback, setFeedback])

    const levels = [
        { level: 1, label: 'Very Bad', icon: <SentimentVeryDissatisfiedIcon fontSize="large" />, key: 'very-dissatisfied' },
        { level: 2, label: 'Bad', icon: <SentimentDissatisfiedIcon fontSize="large" />, key: 'dissatisfied' },
        { level: 3, label: 'Neutral', icon: <SentimentNeutralIcon fontSize="large" />, key: 'neutral' },
        { level: 4, label: 'Good', icon: <SentimentSatisfiedIcon fontSize="large" />, key: 'satisfied' },
        { level: 5, label: 'Very Good', icon: <SentimentVerySatisfiedIcon fontSize="large" />, key: 'very-satisfied' },
    ]

    return (
        <Box sx={{ my: 4, px: 4 }}>
            <Typography id="discrete-slider" gutterBottom>
                Rate your understanding of the last explanation:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {levels.map((level) => (
                    <Grid item key={level.level}>
                        <IconButton
                            color={localFeedback === level.level ? 'info' : 'default'}
                            onClick={() => setLocalFeedback(level.level)}
                        >
                            {level.icon}
                        </IconButton>
                        <Typography variant="caption" display="block" align="center">
                            {level.label + (feedback === level.level ? ' (SET)' : '')}
                        </Typography>
                    </Grid>
                ))}
                <Button variant="contained" sx={{ marginLeft: 2 }} onClick={handleSetFeedback}>
                    Set
                </Button>
                <Button variant="contained" sx={{ marginLeft: 2 }} onClick={handleResetFeedback}>
                    Reset
                </Button>
            </Box>
        </Box>
    )
})

FeedbackSlider.propTypes = {
    setFeedback: PropTypes.func.isRequired,
    feedback: PropTypes.number.isRequired,
}

FeedbackSlider.displayName = 'FeedbackSlider'

export default FeedbackSlider
