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
  StepTwelve
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
      default:
        return null
    }
  }

  const display = getStep(app.step)
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

  return (
    display && (
      <Box bg='white'>
        <AuthNavbar
          value={display.value}
          step={app.step}
          setStep={app.setStep}
        />
        {[5, 12].includes(app.step) && (
          <Confetti
            width={width}
            numberOfPieces={500}
            height={height}
            recycle={false}
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
