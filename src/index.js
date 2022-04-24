import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '@fontsource/belgrano'
import '@fontsource/acme'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import customTheme from './theme/index'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import { AppError } from './components/ErrorBoundary'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <ChakraProvider theme={customTheme}>
          <ColorModeScript
            initialColorMode={customTheme.config.initialColorMode}
          />
          <Router>
            <AppError>
              <App />
            </AppError>
          </Router>
        </ChakraProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
