import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './app/App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './app/MaterialTheme'
import { BrowserRouter as Router } from 'react-router-dom'
import ContextProvider from './app/context/ContextProvider'
import { SocketProvider } from './app/context/SocketContext'
import './css/index.css'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ContextProvider>
          <SocketProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <App />
              </Router>
            </ThemeProvider>
          </SocketProvider>
        </ContextProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
