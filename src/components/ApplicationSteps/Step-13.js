import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Text, Heading, Container, Flex } from '@chakra-ui/react'

import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import { getformattedDate } from 'utils/mics'

const StepThirteen = ({ user, getScheduleTestLists }) => {
  const [reload, setReload] = React.useState(0)

  const triggerReload = () => setReload(prevState => prevState + 1)
  const { data, error, isLoading } = useFetch(
    null,
    getScheduleTestLists,
    reload,
    { code: user.code }
  )

  return isLoading || error ? (
    <FetchCard
      h='20vh'
      align='center'
      justify='center'
      direction='column'
      error={error}
      loading={isLoading}
      reload={triggerReload}
      text='Loading'
    />
  ) : (
    <Container
      align='center'
      mt={{ base: 8, lg: 10 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        EXAM SCHEDULED
      </Heading>

      <Text
        mt={8}
        w={{ lg: 110 }}
        align='center'
        fontWeight='300'
        fontSize={{ base: 'sm', lg: 'lg' }}
        lineHeight={{ base: '4', lg: '30px' }}
      >
        Your exam has been scheduled sucessfully , below is the link to your
        entrance exam
      </Text>

      <Box mt={16} />
      <Link
        fontSize='xl'
        color='#2F80ED'
        target='_blank'
        href='https://www.testingforschools.com/GCU9680/Account?ReturnUrl=%2F'
      >
        https://www.testingforschools.com/GCU9680/Account?ReturnUrl=%2F
      </Link>

      <Flex mt={16} justify='center'>
        <Text mr={1}>Access Code :</Text>
        <Text color='gcu.100'>{data?.[0]?.accessCode}</Text>
      </Flex>

      <Text>Exam Date : {getformattedDate(data?.[0]?.examDate)}</Text>
      <Text>
        Exam Time : {new Date(data?.[0]?.examDate).toLocaleTimeString('en-US')}
      </Text>
    </Container>
  )
}

StepThirteen.propTypes = {
  user: PropTypes.object.isRequired,
  getScheduleTestLists: PropTypes.func.isRequired
}

export default StepThirteen
