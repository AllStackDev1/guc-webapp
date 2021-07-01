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
        {/* APPLICANT */}
        <Redirect exact from='/' to='/applicant/start' />
        <Redirect exact from='/applicant' to='/applicant/start' />
        <Route exact path='/applicant/start' component={Applicant.Start} />
        <Route exact path='/applicant/signup' component={Applicant.Signup} />
        <Route exact path='/applicant/login' component={Applicant.Login} />

        {/* APPLICANT Authenticated */}
        <PrivateRoute
          exact
          path='/applicant/payment'
          component={Applicant.Authenticated.Payment}
        />

        <PrivateRoute
          exact
          path='/applicant/initial-enquiry'
          component={Applicant.Authenticated.InitialEnquiry}
        />

        <PrivateRoute
          exact
          path='/applicant/previous-schools'
          component={Applicant.Authenticated.PreviousSchool}
        />

        <PrivateRoute
          exact
          path='/applicant/student-background'
          component={Applicant.Authenticated.StudentBackground}
        />

        <PrivateRoute
          exact
          path='/applicant/siblings'
          component={Applicant.Authenticated.Siblings}
        />

        <PrivateRoute
          exact
          path='/applicant/health-and-medical'
          component={Applicant.Authenticated.HealthMedical}
        />

        <PrivateRoute
          exact
          path='/applicant/guardian-info'
          component={Applicant.Authenticated.GuardianInfo}
        />

        <PrivateRoute
          exact
          path='/applicant/emergency-contact'
          component={Applicant.Authenticated.EmergencyContact}
        />

        <PrivateRoute
          exact
          path='/applicant/success'
          component={Applicant.Authenticated.Success}
        />

        <PrivateRoute
          exact
          path='/applicant/exam-scheduled'
          component={Applicant.Authenticated.ExamScheduled}
        />

        <PrivateRoute
          exact
          path='/applicant/result'
          component={Applicant.Authenticated.Result}
        />

        <PrivateRoute
          exact
          path='/applicant/admission-status'
          component={Applicant.Authenticated.AdmissionStatus}
        />

        {/* ADMIN */}

        <Route exact path='/auth/logout' component={Index.Logout} />
        <Route exact path='/auth/login' component={Index.Login} />
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
