import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Splash from 'components/Loading/Splash'

import Index from 'pages'
import Admin from 'pages/admin'
import Applicant from 'pages/applicant'

import PrivateRoute from './private'

const Router = () => {
  return (
    <React.Suspense fallback={<Splash />}>
      <Switch>
        <Route exact path='/' component={Index.Auth} />
        <Route path='/logout' component={Index.Logout} />
        <Route exact path='/login' component={Index.Login} />
        <PrivateRoute
          exact
          path='/applicant/dashboard'
          component={Applicant.Dashboard}
        />
        <PrivateRoute
          exact
          path='/admin/dashboard'
          component={Admin.Dashboard}
        />
        <Route path='/404' component={Index.NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </React.Suspense>
  )
}

export default Router
