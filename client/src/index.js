import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import "./App.css"

const theme = createTheme({

    palette: {
        primary: {
            main: "#005792",
        },
        secondary: {
            main: "#2e74c9",
        },
        thirdColor: {
            main: "#00bbf0"
        },
        fourthColor: {
            main: "#fdb44b"
        }
    },
    typography: {
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
        <App />
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
