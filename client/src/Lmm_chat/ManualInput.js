import React, {useState} from "react";
import {Button, Card, TextField, Typography} from "@mui/material";

function ManualInput() {

    const [inputText, setInputText] = useState("Test")

    const handleSubmitText = () => {
        console.log("Submit")
        console.log(inputText)
        //Send data to the component that makes the api requests to the llm
        setInputText("")
    }

    return (
        <div>
            <Typography variant={'h4'}> Write your description here</Typography>
            <Card sx={{height: '10em', bgcolor: "secondary.main", px: 2}}>
                <TextField id="standard-basic" label=">" variant="standard" multiline fullWidth minRows={1} maxRows={5}
                           InputProps={{disableUnderline: true}} value = {inputText} onChange={(event) => setInputText(event.target.value)}>
                </TextField>
            </Card>
            <Button sx={{marginTop: 2}} variant="contained" onClick={handleSubmitText}>Generate</Button>
        </div>
    )
}

export default ManualInput;