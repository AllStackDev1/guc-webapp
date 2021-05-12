import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading, Container } from '@chakra-ui/react'

const StepFifteen = ({ user }) => {
  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 10 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        ASMISSION STATUS
      </Heading>

      <Box my={10}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna
        </Text>
      </Box>

      {user.isAdmitted ? (
        <Text fontWeight={700} color='#219653' fontSize='5xl'>
          Admitted
        </Text>
      ) : (
        <Text fontWeight={700} color='red.300' fontSize='5xl'>
          Not Admitted
        </Text>
      )}
    </Container>
  )
}

StepFifteen.propTypes = {
  user: PropTypes.object.isRequired
}

export default StepFifteen
