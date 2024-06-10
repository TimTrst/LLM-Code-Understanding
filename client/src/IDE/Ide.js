import React, { useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {MenuItem, Paper, Select} from "@mui/material";
import PropTypes from "prop-types";

function Ide({inputCode, setInputCode}) {
    const [language, setLanguage] = useState("python");

    // Language extensions based on the selected language
    const languageExtensions = {
        javascript,
        python,
        java,
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const handleCodeChange = (value) => {
        setInputCode(value)
    }

    return (
        <div>
            <Select sx={{color: "white", backgroundColor: "secondary.main"}}
                    onChange={handleLanguageChange}
                    value={language}
            >
                <MenuItem value="python">Python</MenuItem>
            </Select>
            <Paper elevation={3} sx={{my: 2, px: 4, py: 4, backgroundColor: "fourthColor.main"}}>
                <CodeMirror
                    value={inputCode}
                    height="500px"
                    theme={vscodeDark}
                    extensions={[languageExtensions[language]({})]}
                    onChange={(value) => handleCodeChange(value)}
                />
            </Paper>
        </div>
    );
}

Ide.propTypes = {
    inputCode: PropTypes.string,
    setInputCode: PropTypes.func.isRequired,
};
export default Ide;
