import React from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router-dom'

import useAuth from 'context/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, session } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    if (!session) {
      return history.push('/logout')
    }
  }, [session, history])

  const getPage = props => {
    if (isAuthenticated()) {
      return <Component {...props} />
    }
    return history.replace('/')
  }

  return <Route {...rest} render={getPage} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any
}

export default PrivateRoute
