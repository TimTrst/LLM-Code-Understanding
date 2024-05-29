import React, {useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {MenuItem, Paper, Select} from "@mui/material";

function Ide() {
    const [code, setCode] = useState("console.log('Code Mirror!');");
    const [language, setLanguage] = useState("javascript");

    // Language extensions based on the selected language
    const languageExtensions = {
        javascript,
        python,
        java,
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    return (
        <div>
            <Select sx={{ color:"white", backgroundColor:"secondary.main" }}
                    onChange={handleLanguageChange}
                    value={language}
            >

                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
            </Select>
            <Paper elevation={3} sx = {{my: 2, px: 4, py: 4, backgroundColor: "fourthColor.main"}}>
                <CodeMirror
                    value={code}
                    height="500px"
                    theme={vscodeDark}
                    extensions={[languageExtensions[language]({})]}
                    onChange={(value) => setCode(value)}
                />
            </Paper>
        </div>
    );
}

export default Ide;
