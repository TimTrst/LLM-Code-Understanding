import React from "react";
import {Paper, Card, Typography} from "@mui/material";
import ManualInput from "./ManualInput";

function LmmChat() {
    return (
        <Paper elevation={3} sx={{height: '49em', my:4, py: 2, px:2, bgcolor: "fourthColor.main"}}>
            <Card sx={{height: '30em', my: 2, py:2, px:2 ,bgcolor: "secondary.main"}}>
                <Typography>

                </Typography>
            </Card>
            <ManualInput/>
        </Paper>
    );
}

export default LmmChat;
