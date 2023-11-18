import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { DevSupport } from '@react-buddy/ide-toolbox'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IngredientProvider } from '@/context/Ingredient.provider'
import { UserProvider } from '@/context/User.provider'
import './styles/global.css'
import { MuiCustomTheme } from './styles/MuiCustomTheme'
import Router from '@/router/Router'
import { ComponentPreviews } from '@/dev'
import { UserProvider as TestProvider } from '@/context/user'

const muiCustomTheme = createTheme(MuiCustomTheme)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={muiCustomTheme}>
        <IngredientProvider>
          <UserProvider>
            <TestProvider>
              <BrowserRouter>
                <DevSupport ComponentPreviews={ComponentPreviews}>
                  <Router />
                </DevSupport>
              </BrowserRouter>
            </TestProvider>
          </UserProvider>
        </IngredientProvider>
      </ThemeProvider>
    </React.StrictMode>
  </StyledEngineProvider>,
)
