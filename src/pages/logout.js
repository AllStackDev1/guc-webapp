import React from 'react'

import Splash from 'components/Loading/Splash'

const LogOut = () => {
  React.useEffect(() => {
    setTimeout(async () => {
      sessionStorage.clear()
    }, 200)
  })

  return <Splash text='logging off' />
}

export default LogOut
