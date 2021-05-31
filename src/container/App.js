import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import { AppContextProvider } from 'context/app'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'

import Router from 'routes/register'

const App = () => {
  React.useEffect(() => {
    ReactGA.initialize('GTM-MWRGK65')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
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
}

export default App
