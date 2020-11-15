import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1200,
      lg: 1793,
      xl: 1920,
    },
  },
  overrides: {
    components: {
      cardContent: {
        padding: 0,
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: "14px",
        whiteSpace: "nowrap",
      },
    },
  },
  palette: {
    primary: {
      main: "#1c2e40",
    },
    secondary: {
      main: "#cc8963",
    },
    third: {
      main: "rgb(247, 241, 240)",
    },
    background: {
      default: "#F7F1F0",
      dark: "eee2db",
    },
  },
  typography: {
    h1: { fontFamily: "'Unna', sans-serif", fontSize: "40px" },
    h2: { fontFamily: "'Montserrat', sans-serif", fontSize: "40px" },
    body1: { lineHeight: "1.5" },
    fontFamily: "'Montserrat', sans-serif",
    body2: { family: "'Unna', sans-serif" },
  },
  shape: { borderRadius: 0 },

  shadows: [0],
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
