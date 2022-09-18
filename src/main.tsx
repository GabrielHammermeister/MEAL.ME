import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import "./styles/global.css";
import { MuiCustomTheme } from "./styles/MuiCustomTheme";

const muiCustomTheme = createTheme(MuiCustomTheme);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={muiCustomTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
