import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import "./App.css"

const theme = createTheme({
        components: {
            MuiSelect: {
                styleOverrides: {
                    select: {
                        '&:focus': {
                            backgroundColor: 'transparent', // Disable color on focus
                        },
                    },
                    root: {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent', // Disable border color on focus
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            color: "hsl(0,12%,92%)", // Default label color
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'grey', // Label color when focused
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'red', // Label color when error
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: '#2c2a2a', // Hover color
                        },
                        '&:active': {
                            backgroundColor: '#383535', // Active color
                        },
                        border:'7px outset black',
                        backgroundColor: '#545252',
                        color: "white"
                    },
                },
            },
            // Add other components as needed
        },
        palette: {
            primary: {
                main: "hsl(39, 36%, 80%)",
            },
            secondary: {
                main: "#545252",
            },
            thirdColor: {
                main: "#090808"
            },
            fourthColor: {
                main: "hsl(39, 36%, 80%)"
            }
        },
        typography: {
            fontFamily: "'Courier New', Courier, monospace",
            h1: {
                fontSize: "3rem",
                fontWeight: "600",
            },
            h2: {
                fontSize: "1.75rem",
                fontWeight: "600",
            },
            h3: {
                fontSize: "1.5rem",
                fontWeight: "600",
            },
            h4: {
                fontSize: "1.2rem",
                fontWeight: "300",
            }
        },
    }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
