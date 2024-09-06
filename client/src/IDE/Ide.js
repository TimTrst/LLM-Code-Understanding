import React, {useState} from "react"
import CodeMirror from "@uiw/react-codemirror"
import {vscodeDark} from "@uiw/codemirror-theme-vscode"
import {python} from "@codemirror/lang-python"
import {MenuItem, Paper, Select} from "@mui/material"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import recursiveCodeExamples from "./CodeExamples";

/**
 * The `Ide` component renders an IDE for python code
 *
 * @param {string} inputCode - The code state string coming from a code examples or by user input
 * @param {function} setInputCode - The code state function that updates the code in the parent component
 *
 * @returns {JSX.Element} The JSX code for rendering the Ide component.
 */
function Ide({inputCode, setInputCode}) {
    const [selectedExample, setSelectedExample] = useState('factorial')
    const language = "python"

    // Language extensions based on the selected language
    const languageExtensions = {
        python,
    }

    // updates the code state in the parent App component
    const handleCodeChange = (value) => {
        setInputCode(value)
    }

    // sets the code to an example code snippet
    const handleExampleChange = (event) => {
        const exampleKey = event.target.value
        setSelectedExample(exampleKey)
        setInputCode(recursiveCodeExamples[exampleKey].code)
    }

    // IDE component
    return (
        <Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Select
                    sx={{color: "white", backgroundColor: "secondary.main", border: "7px outset black"}}
                    onChange={handleExampleChange}
                    value={selectedExample}
                >
                    {Object.keys(recursiveCodeExamples).map((key) => (
                        <MenuItem key={key} value={key}>{recursiveCodeExamples[key].name}</MenuItem>
                    ))}
                </Select>
            </Box>
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
    )
}

Ide.propTypes = {
    inputCode: PropTypes.string,
    setInputCode: PropTypes.func.isRequired,
}
export default Ide
