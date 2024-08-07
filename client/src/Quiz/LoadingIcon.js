import Box from "@mui/material/Box";
import LoopIcon from "@mui/icons-material/Loop";
import {Typography} from "@mui/material";
import React from "react";

const LoadingIcon = () => {
        return (
            <Box>
                <Box display="flex"
                     justifyContent="center"
                     alignItems="center"
                     minHeight="40vh">
                    <LoopIcon fontSize="large" sx={{
                        animation: "spin 2s linear infinite",
                        "@keyframes spin": {
                            "0%": {
                                transform: "rotate(360deg)",
                            },
                            "100%": {
                                transform: "rotate(0deg)",
                            },
                        },
                    }}/>
                </Box>
                <Typography sx={{display: "clear"}}>
                    Answers are currently being processed...
                </Typography>
            </Box>
        )
    }
    export default LoadingIcon