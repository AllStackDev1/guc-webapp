import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppContextProvider } from 'context/app'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'

import Router from 'routes/register'

const App = () => (
  <BrowserRouter>
    <AppContextProvider>
      <ApiContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ApiContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)

export default App
