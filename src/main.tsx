import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IngredientProvider } from "./providers/Ingredient.provider";
import { UserProvider } from "./providers/User.provider";
import Router from "./router/Router";
import { SpoonacularInterceptor } from "./services/spoonacular/SpoonacularInterceptor";
import "./styles/global.css";
import { MuiCustomTheme } from "./styles/MuiCustomTheme";

const muiCustomTheme = createTheme(MuiCustomTheme);
SpoonacularInterceptor();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={muiCustomTheme}>
      <IngredientProvider>
        <UserProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserProvider>
      </IngredientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
