import React, {useState} from "react"
import {Button, Card, TextField} from "@mui/material"
import PropTypes from "prop-types"
import SendIcon from '@mui/icons-material/Send'

/**
 * The `ManualInput` component renders the manual input component for manual prompts.
 *
 * @param {function} handleManualSend - sends the input to the parent component (LLMChat)
 * @returns {JSX.Element} The JSX code for rendering the ManualInput component.
**/
const ManualInput = ({handleManualSend}) => {

    // current manual input text state
    const [inputText, setInputText] = useState("")

    // send the input to the parent component
    const handleSubmitText = (e) => {
        e.preventDefault();
        handleManualSend(inputText)
        setInputText('')
    }

    return (
        <div>
            <Card className={"custom-border"} sx={{
                borderRadius:3,
                height: '11em',
                bgcolor: "secondary.main",
                px: 2,
                my: 3.4,
            }}>
                <TextField id="standard-basic" label="Enter your questions here" variant="standard" multiline fullWidth
                           minRows={3} maxRows={3}
                           InputProps={{
                        disableUnderline: true,
                        sx: { '& .MuiInputBase-input': { color: 'white' } }
                    }}
                    inputProps={{
                        maxLength: 600
                    }} value={inputText}
                           onChange={(event) => setInputText(event.target.value)}
                >
                </TextField>
                <Button sx={{marginTop: 1, bgcolor: "secondary.main", border: "7px outset black"}} variant="contained"
                        onClick={handleSubmitText} startIcon={<SendIcon/>}>Send</Button>
            </Card>
        </div>
    )
}

ManualInput.propTypes = {
    handleManualSend: PropTypes.func.isRequired,
}

export default ManualInput