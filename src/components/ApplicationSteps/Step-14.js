import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading, Container } from '@chakra-ui/react'

import FilePreview from 'components/FilePreview'

const StepFourteen = ({ user }) => {
  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 10 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        RESULT
      </Heading>

      {user?.resultDoc ? (
        <Box my={10}>
          <FilePreview src={user?.resultDoc} alt='applicant_result' />
        </Box>
      ) : (
        <Text>No Result Yet</Text>
      )}
    </Container>
  )
}

StepFourteen.propTypes = {
  user: PropTypes.object.isRequired,
  getScheduleTestLists: PropTypes.func.isRequired
}

export default StepFourteen
