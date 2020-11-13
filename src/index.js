import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1c2e40",
    },
    secondary: {
      main: "#cc8963",
    },
    background: {
      default: "#f7f1f0",
    },
  },
  typography: {
    h1: { fontFamily: "'Montserrat', sans-serif", fontSize: "40px" },
    h2: { fontFamily: "'Montserrat', sans-serif", fontSize: "40px" },
    fontFamily: "'Montserrat', sans-serif",
  },
  shape: { borderRadius: 0 },
  card: {
    backgroundColor: "#f7f1f0",
  },
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
