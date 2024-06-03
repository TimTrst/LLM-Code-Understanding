import React, {useState} from "react"
import {Button, Card, TextField, Typography} from "@mui/material"
import PropTypes from "prop-types"

const ManualInput = ({ onSend }) => {

    const [inputText, setInputText] = useState("")

    const handleSubmitText = (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return
        onSend(inputText)
        setInputText('')
    }

    return (
        <div>
            <Typography variant={'h4'}> Write your description here</Typography>
            <Card sx={{height: '10em', bgcolor: "secondary.main", px: 2}}>
                <TextField id="standard-basic" label=">" variant="standard" multiline fullWidth minRows={1} maxRows={5}
                           InputProps={{disableUnderline: true}} value = {inputText} onChange={(event) => setInputText(event.target.value)}
                >
                </TextField>
            </Card>
            <Button sx={{marginTop: 2}} variant="contained" onClick={handleSubmitText}>Generate</Button>
        </div>
    )
}

ManualInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ManualInput;