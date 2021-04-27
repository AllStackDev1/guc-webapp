import React from 'react'

import useAuth from 'context/auth'

import Splash from 'components/Loading/Splash'

const LogOut = () => {
  const { setSession } = useAuth()

  React.useEffect(() => {
    setTimeout(() => {
      sessionStorage.clear()
      setSession(false)
    }, 200)
  })

  return <Splash text='logging off' />
}

export default LogOut
