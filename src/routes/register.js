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
        <Redirect exact from='/' to='/application-process' />
        <Route
          exact
          path='/application-process'
          component={Index.Application}
        />
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
        <PrivateRoute
          exact
          path='/admin/result-lists'
          component={Admin.ResultList}
        />
        <PrivateRoute
          exact
          path='/admin/incomplete-applications'
          component={Admin.Incomplete}
        />
        <PrivateRoute
          exact
          path='/admin/download-lists'
          component={Admin.DownloadList}
        />
        <PrivateRoute
          exact
          path='/admin/schedule-test'
          component={Admin.ScheduleTest}
        />
        <PrivateRoute exact path='/admin/result' component={Admin.Result} />
        <Route path='/404' component={Index.NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </React.Suspense>
  )
}

export default Router
