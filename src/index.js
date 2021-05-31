import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from 'container/App'
import { theme } from 'theme/theme'

import 'assets/styles/globals.css'
import 'assets/fonts/fonts.css'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
