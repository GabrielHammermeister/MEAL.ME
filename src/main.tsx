import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { DevSupport } from '@react-buddy/ide-toolbox'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IngredientProvider } from './providers/Ingredient.provider'
import { UserProvider } from './providers/User.provider'
import './styles/global.css'
import { MuiCustomTheme } from './styles/MuiCustomTheme'
import Router from '@/router/Router'
import { ComponentPreviews } from '@/dev'

const muiCustomTheme = createTheme(MuiCustomTheme)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={muiCustomTheme}>
        <IngredientProvider>
          <UserProvider>
            <BrowserRouter>
              <DevSupport ComponentPreviews={ComponentPreviews}>
                <Router />
              </DevSupport>
            </BrowserRouter>
          </UserProvider>
        </IngredientProvider>
      </ThemeProvider>
    </React.StrictMode>
  </StyledEngineProvider>,
)
