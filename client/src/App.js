import React, { useState} from 'react'
import Ide from "./IDE/Ide"
import Sidebar from "./Sidebar/Sidebar"
import LmmChat from "./Lmm_chat/LmmChat"
import "./App.css"
import {Container, Typography} from "@mui/material";


function App() {
const [isCompilable, setIsCompilable] = useState(false);

    return (
        <div className="App" style={{display: "flex", flexDirection: "row"}}>
            <Sidebar/>
            <Container sx={{display:"flex", flexDirection:"column", height: "100%", mt: 10}}>
                <Typography variant="h1" sx={{ my: 4, textAlign: 'center', color: "primary.main"}}>
                    Code Understanding
                </Typography>
                <Ide isCompilable={isCompilable} setIsCompilable={setIsCompilable}/>
                {
                    isCompilable ? <LmmChat/>  : <div></div>
                }
            </Container>
        </div>
    );
}

export default App;
