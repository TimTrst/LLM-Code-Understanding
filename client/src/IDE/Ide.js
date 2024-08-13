import React, {useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {MenuItem, Paper, Select} from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

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
        <Box>
            <Select sx={{color: "white", backgroundColor: "secondary.main", border: "7px outset black"}}
                    onChange={handleLanguageChange}
                    value={language}
            >
                <MenuItem value="python">Python</MenuItem>
            </Select>
            <Paper elevation={3} sx={{my: 4, px: 4, py: 4, backgroundColor: "fourthColor.main", borderRadius: 3}}>
                <Box className={"custom-border"}>
                    <Box sx={{backgroundColor: "black", padding: 1, borderRadius: 2}}>
                        <CodeMirror
                            value={inputCode}
                            height="500px"
                            theme={vscodeDark}
                            extensions={[languageExtensions[language]({})]}
                            onChange={(value) => handleCodeChange(value)}
                        >
                        </CodeMirror>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

Ide.propTypes = {
    inputCode: PropTypes.string,
    setInputCode: PropTypes.func.isRequired,
}
export default Ide
