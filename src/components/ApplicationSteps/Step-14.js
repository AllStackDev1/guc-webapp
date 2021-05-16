import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading, Container } from '@chakra-ui/react'

import FetchCard from 'components/FetchCard'
import FilePreview from 'components/FilePreview'
import useFetch from 'hooks/useFetch'

const StepFourteen = ({ user, getApplicantResultFile }) => {
  const [reload, setReload] = React.useState(0)

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading } = useFetch(
    null,
    getApplicantResultFile,
    reload,
    {
      applicant: user._id
    }
  )

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
      {isLoading || error ? (
        <FetchCard
          h='60vh'
          align='center'
          justify='center'
          direction='column'
          error={error}
          loading={isLoading}
          reload={triggerReload}
          text='Loading'
        />
      ) : data ? (
        <Box my={10}>
          <FilePreview src={data} alt='applicant_result' />
        </Box>
      ) : (
        <Text>No Result Yet</Text>
      )}
    </Container>
  )
}

StepFourteen.propTypes = {
  user: PropTypes.object.isRequired,
  getApplicantResultFile: PropTypes.func.isRequired
}

export default StepFourteen
