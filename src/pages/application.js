/* eslint-disable no-console */
import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

import AuthNavbar from 'container/AuthNavbar'
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSixOne,
  StepSixTwo,
  StepSeven,
  StepEightOne,
  StepEightTwo,
  StepNine,
  StepTen,
  StepSix,
  StepEleven,
  StepTwelve,
  StepThirteen,
  StepFourteen,
  StepFifteen
} from 'components/ApplicationSteps'

import useApp from 'context/app'
import useAuth from 'context/auth'
import useApi from 'context/api'

import BgShape from 'assets/images/bg-shape.png'

const Auth = () => {
  document.title = 'GCU | Application Portal'
  const apis = useApi()
  const auth = useAuth()
  const app = useApp()

  const { width, height } = useWindowSize()
  const user = auth.isAuthenticated()?.user

  React.useEffect(() => {
    if (app.step >= 5) {
      if (!user) {
        app.setStep(3)
      }
    }
    if (user) {
      if (app.step < 5) {
        app.setStep(user.stage)
      }
    }
  }, [app, auth, user])

  const getStep = key => {
    switch (key) {
      case 1:
        return { value: 0, Step: StepOne }
      case 2:
        return { value: 8.33, Step: StepTwo }
      case 3:
        return { value: 16.67, Step: StepThree }
      case 4:
        return { value: 25, Step: StepFour }
      case 5:
        return { value: 33.33, Step: StepFive }
      case 6:
        return { value: 41.67, Step: StepSix }
      case 6.1:
        return { value: 50, Step: StepSixOne }
      case 6.2:
        return { value: 50, Step: StepSixTwo }
      case 7:
        return { value: 58.33, Step: StepSeven }
      case 8.1:
        return { value: 66.67, Step: StepEightOne }
      case 8.2:
        return { value: 66.67, Step: StepEightTwo }
      case 9:
        return { value: 75, Step: StepNine }
      case 10:
        return { value: 83.33, Step: StepTen }
      case 11:
        return { value: 91.67, Step: StepEleven }
      case 12:
        return { value: 100, Step: StepTwelve }
      case 13:
        return { value: 100, Step: StepThirteen }
      case 14:
        return { value: 100, Step: StepFourteen }
      case 15:
        return { value: 100, Step: StepFifteen }
      default:
        return null
    }
  }

  const display = getStep(app.step)

  return (
    display && (
      <Box bg='white'>
        <AuthNavbar
          value={display.value}
          step={app.step}
          setStep={app.setStep}
        />
        {([5, 12].includes(app.step) ||
          (user.isAdmitted && app.step === 15)) && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
          />
        )}
        <Flex
          w='100%'
          as='main'
          minH='100vh'
          flexDir='column'
          py={{ base: '', lg: 16 }}
        >
          <display.Step {...app} {...apis} {...auth} user={user} />
        </Flex>
        <Box
          right={0}
          bottom={0}
          pos='absolute'
          bgSize='cover'
          bgPos='center'
          bgRepeat='no-repeat'
          bgImage={`url('${BgShape}')`}
          w={{ base: '5rem', lg: '15rem' }}
          h={{ base: '5rem', lg: '15rem' }}
        />
      </Box>
    )
  )
}

export default Auth
