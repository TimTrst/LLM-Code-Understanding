import React from 'react'
import Ide from "./IDE/Ide"
import Sidebar from "./Sidebar/Sidebar"
import Output from "./Output/Output"
import "./App.css"
import {Container, Typography} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <Typography variant="h1" sx={{my:4, textAlign: 'center', color: "primary.main"}}>Coder Understanding</Typography>
            <Container>
                <Ide/>
                <Output/>
            </Container>
        </div>
    );
}

export default App;
