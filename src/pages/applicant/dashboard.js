import React from 'react'
// import { Box, } from '@chakra-ui/react'

import Layout from 'container/Layout'

// import useAuth from 'context/auth'

const Dashboard = () => {
  document.title = 'Dashboard | The GCU Application Portal'
  // const { isAuthenticated } = useAuth()
  // const { user } = isAuthenticated()

  return <Layout>Hello Dashboard</Layout>
}

export default Dashboard
