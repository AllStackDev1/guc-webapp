import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Splash from 'components/Loading/Splash'

import Pages from 'pages'

// import PrivateRoute from './private'

const Router = () => {
  return (
    <React.Suspense fallback={<Splash />}>
      <Switch>
        <Route exact path='/' component={Pages.Auth} />
        <Route path='/logout' component={Pages.Logout} />
        <Route exact path='/login' component={Pages.Login} />
        {/* <PrivateRoute exact path='/dashboard' component={Pages.Dashboard} /> */}
        <Route path='/404' component={Pages.NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </React.Suspense>
  )
}

export default Router
