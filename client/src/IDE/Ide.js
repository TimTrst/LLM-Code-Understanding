import React, {useEffect, useState} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {Button, MenuItem, Paper, Select} from "@mui/material";
import axios from "axios";
import initialCode from "./initialCode";
import PropTypes from "prop-types";

function Ide({ setIsCompilable }) {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState("python");
    const [output, setOutput] = useState('');

    useEffect(() => {
        // Set the initial code when the component mounts
        setCode(initialCode)
    }, []);


    // Language extensions based on the selected language
    const languageExtensions = {
        javascript,
        python,
        java,
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    const handleCompile = async () => {
        try {
            const response = await axios.post('api/compile', { code, language });
            setOutput(response.data.output || response.data.errors);
            response.data.status === "success" ? setIsCompilable(true) : setIsCompilable(false)
        } catch (error) {
            setOutput('Error communicating with the server');
        }
    };

    return (
        <div>
            <Select sx={{ color:"white", backgroundColor:"secondary.main" }}
                    onChange={handleLanguageChange}
                    value={language}
            >
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="javascript">JavaScript</MenuItem>
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
            <Button onClick={handleCompile} variant="contained">Compile</Button>
            <pre>{output}</pre>
        </div>
    );
}
Ide.propTypes = {
  setIsCompilable: PropTypes.func.isRequired,
};
export default Ide;
