import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from 'context/auth'

import Splash from 'components/Loading/Splash'

const LogOut = () => {
  const { setSession } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    setTimeout(() => {
      sessionStorage.clear()
      setSession(false)
      history.push('/')
    }, 200)
  })

  return <Splash text='logging off' />
}

export default LogOut
