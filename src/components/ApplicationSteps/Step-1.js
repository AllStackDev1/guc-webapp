import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  List,
  Button,
  Heading,
  ListItem,
  ListIcon
} from '@chakra-ui/react'

const CircleCheckIcon = () => (
  <svg
    width='22'
    height='21'
    viewBox='0 0 22 21'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M17.6 5.8667L9.53337 13.9334L5.8667 10.2667'
      stroke='#C82B38'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18.0962 10.9999C18.6322 10.9999 19.0718 11.4355 19.0173 11.9687C18.8364 13.74 18.162 15.4323 17.0618 16.8486C15.7623 18.5213 13.9427 19.7136 11.8903 20.2373C9.83789 20.7609 7.66953 20.5862 5.72748 19.7406C3.78542 18.895 2.18029 17.4267 1.16544 15.5675C0.150594 13.7083 -0.216171 11.564 0.123041 9.47318C0.462252 7.38235 1.48812 5.46404 3.03872 4.02103C4.58931 2.57803 6.57632 1.69252 8.6861 1.50427C10.4724 1.34489 12.2606 1.69305 13.8483 2.49895C14.3262 2.74155 14.4548 3.34693 14.1649 3.79773C13.875 4.24854 13.2765 4.37264 12.7924 4.14257C11.573 3.56297 10.2151 3.3165 8.85859 3.43754C7.17835 3.58745 5.59589 4.29268 4.36099 5.44189C3.12609 6.59111 2.30908 8.11887 2.03893 9.78401C1.76878 11.4492 2.06087 13.1568 2.86911 14.6375C3.67734 16.1182 4.95567 17.2876 6.50233 17.961C8.04899 18.6345 9.77589 18.7736 11.4104 18.3566C13.045 17.9395 14.4941 16.99 15.529 15.6578C16.3645 14.5823 16.8917 13.3069 17.0638 11.9677C17.1321 11.4361 17.5602 10.9999 18.0962 10.9999Z'
      fill='#C82B38'
    />
  </svg>
)

const StepOne = ({ setStep }) => {
  const textStyle = {
    my: 4,
    fontSize: { base: 'xs', lg: 'sm' },
    lineHeight: '25px'
  }

  const lists = [
    {
      id: 1,
      text: '2 recent passport photographs (not more than 6 months old)'
    },
    {
      id: 2,
      text:
        'Photocopy of candidate’s birth certificate or international passport data page'
    },
    {
      id: 3,
      text:
        'Immunization record and medical report (after the admission is offered)'
    }
  ]

  return (
    <Box>
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Application Process
      </Heading>

      <Box textAlign='left'>
        <Text {...textStyle}>
          Please be advised that we are only admitting JSS1/Year 7 students. To
          be eligible for admission, prospective students must be between 10.5
          and 11.5 years of age by September in the year of admission.
        </Text>
        <Text {...textStyle}>
          Purchase the electronic online application form for ₦10,000 by
          clicking on the button below.
        </Text>
        <Text {...textStyle}>
          Submit the completed application form with the following documents:
        </Text>

        <List spacing={3}>
          {lists.map(list => (
            <ListItem key={list.id} d='flex'>
              <ListIcon as={CircleCheckIcon} boxSize={6} />
              <Text fontSize={{ base: 'xs', lg: 'sm' }} ml={2}>
                {list.text}
              </Text>
            </ListItem>
          ))}
        </List>

        <Text {...textStyle}>
          Applicants will undergo a test according to their age category, please
          click here (GL assessments link)
        </Text>
      </Box>

      <Box mt={8} align='center'>
        <Button
          w='100%'
          rounded='0'
          type='button'
          color='#fff'
          fontSize='md'
          boxShadow='lg'
          fontWeight={400}
          colorScheme='gcuButton'
          h={{ base: '3.375rem' }}
          onClick={_ => setStep(2)}
          _focus={{ outline: 'none' }}
        >
          Apply Now !!
        </Button>
      </Box>
    </Box>
  )
}

StepOne.propTypes = {
  setStep: PropTypes.func.isRequired
}

export default StepOne
