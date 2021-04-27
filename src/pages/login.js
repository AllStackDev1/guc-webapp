import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useHistory, Link as ReactLink } from 'react-router-dom'
import {
  Box,
  Text,
  Flex,
  Link,
  Grid,
  Button,
  Heading,
  useToast,
  GridItem,
  Container
} from '@chakra-ui/react'

import useAuth from 'context/auth'
import useApi from 'context/api'

import CustomInput from 'components/Forms/CustomInput'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'
import LogoBGImage from 'assets/images/login-side-bg-img.png'
import PasswordInput from 'components/Forms/PasswordInput'

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email!').required('Email is required!'),
  password: yup
    .string()
    // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    //   message:
    //     ' Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    // })
    .required('Password is Required!')
})

const Login = () => {
  document.title = 'Login | The GCU Application Portal'
  const { store } = useAuth()
  const { login } = useApi()

  const history = useHistory()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await login(values)
        store(res.data)
        // toast({
        //   description: res.message,
        //   status: 'success',
        //   duration: 5000,
        //   position: 'top-right'
        // })
        return history.push('/admin/dashboard')
      } catch (error) {
        toast({
          title: 'Error occured',
          description:
            error?.message ||
            error?.data?.message ||
            'Unexpected network error.',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit
  } = formik

  return (
    <Grid
      h='100vh'
      templateRows='repeat(1, 1fr)'
      templateColumns={{ lg: '25% 75%' }}
    >
      <GridItem
        bgSize='cover'
        bgPos='center'
        bgRepeat='no-repeat'
        bgImage={`url('${LogoBGImage}')`}
      />
      <GridItem bg='white'>
        <Container ml={{ lg: 44 }} my={{ lg: 10 }}>
          <Box
            bgSize='cover'
            bgPos='center'
            bgRepeat='no-repeat'
            bgImage={{
              base: `url('${Logo1}')`,
              lg: `url('${Logo2}')`
            }}
            w={{ base: '3.125rem', lg: '5.875rem' }}
            h={{ base: '3.063rem', lg: '5.688rem' }}
          />

          <Box
            as='form'
            onSubmit={handleSubmit}
            mt={{ lg: 40 }}
            mr={{ lg: 20 }}
          >
            <Heading
              letterSpacing='0.0115em'
              fontSize={{ lg: '2.875rem' }}
              lineHeight='54px'
              color='gcu.100'
              mb={5}
            >
              Hello
            </Heading>
            <Text
              color='rgba(100, 100, 108, 0.4)'
              lineHeight='26px'
              fontSize='lg'
            >
              Welcome to GCU Admin
            </Text>

            <Box my={{ lg: 8 }}>
              <CustomInput
                type='text'
                isRequired
                name='email'
                label='Email address'
                onBlur={handleBlur}
                error={errors.email}
                onChange={handleChange}
                touched={touched.email}
                defaultValue={values.email}
                placeholder='Enter your Email'
              />
            </Box>
            <Box mb={{ lg: 8 }}>
              <PasswordInput
                isRequired
                name='password'
                label='Password'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.password}
                touched={touched.password}
                defaultValue={values.password}
                placeholder='Enter your Password'
              />
            </Box>

            <Flex align='center' justify='space-between'>
              <Button
                rounded='0'
                type='submit'
                color='#fff'
                fontSize='md'
                boxShadow='lg'
                fontWeight={400}
                colorScheme='gcuButton'
                h={{ base: '3.375rem' }}
                _focus={{ outline: 'none' }}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Login into your account
              </Button>

              <Link
                as={ReactLink}
                color='gcu.100'
                href='#/forgot-password'
                _hover={{ textDecor: 'none', fontWeight: '500' }}
                _focus={{ textDecor: 'none', fontWeight: '500' }}
              >
                Forgot Password ?
              </Link>
            </Flex>
          </Box>
        </Container>
      </GridItem>
    </Grid>
  )
}

export default Login
