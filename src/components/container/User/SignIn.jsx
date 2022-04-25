import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Button,
  FormControl,
  Box,
  Text,
  Container,
  VStack,
  Icon,
} from '@chakra-ui/react'
import {
  // googleLogin,
  login,
  registerUser,
} from '../../../Redux/Actions/UserActions'

import Message from '../../SubComponents/Error'
import Loading from '../../SubComponents/Spinner'
// import { GoogleLogin } from 'react-google-login'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './Auth/FormInput'
import registerOptions from './Auth/InputValidation'
import { BsFillLockFill} from 'react-icons/bs'

export default function SignIn() {
  window.scrollTo(0, 0)
  const [isSignup, setIsSignup] = useState(false)

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const handleError = (errors) => {}

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector((state) => state.userLogin)
  const { error, loading, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const onSubmit = (data) => {
    if (isSignup) {
      dispatch(registerUser(data.name, data.email, data.password))
    } else {
      dispatch(login(data.email, data.password))
    }
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj
  //   const token = res?.tokenId
  //   try {
  //     dispatch(googleLogin(result, token))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const googleFailure = (error) => {
  //   console.log(error)
  //   console.log('Google sign in failed. Try again later')
  // }

  return (
    <Box mt={1} py={4} mb={6}>
      <Container maxW={['container.lg', '400px']}>
        {error && <Message status='error' error={error} />}
        {loading && <Loading />}
        <VStack alignItems='center' spacing={2} mb={4}>
          <Icon as={BsFillLockFill} />
          <Text textStyle={'p'} mb={4}>
            {isSignup ? 'Sign up' : 'Sign in'}
          </Text>
          {isSignup && (
            <Text textStyle='y' mb={4} textAlign='center'>
              Take advantage of a faster checkout and enjoy promotions for
              registered customers only
            </Text>
          )}
        </VStack>
        <FormProvider {...methods}>{/* errors */}</FormProvider>
        <form onSubmit={handleSubmit(onSubmit, handleError)}>
          {isSignup && (
            <>
              <FormControl>
                <FormInput
                  name='name'
                  placeholder='John Doe'
                  type='name'
                  label='NAME'
                  required
                  {...register('name', registerOptions.name)}
                />
                {errors?.name && errors.name.message}
              </FormControl>
            </>
          )}
          <FormControl>
            <FormInput
              name='email'
              placeholder='johndoe@email.com'
              type='email'
              label='EMAIL'
              required
              {...register('email', registerOptions.email)}
            />
            {errors?.email && errors.email.message}
          </FormControl>
          <FormControl>
            <FormInput
              name='password'
              placeholder='******'
              type='password'
              label='PASSWORD'
              required
              {...register('password', registerOptions.password)}
            />
            {errors?.password && errors.password.message}
          </FormControl>
          <Button
            mt={4}
            mb={4}
            type='submit'
            variant={'with-shadow'}
            isFullWidth
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {/* <GoogleLogin
            clientId='514422940912-frhq8vmv41h7tm7qrkh25e6t8v3kse1f.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                colorScheme='green'
                isFullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          /> */}
        </form>
        <Box onClick={switchMode}>
          {isSignup ? (
            <Text textStyle='p'>
              Already have an account? &nbsp;
              <Box as='span' textDecoration='underline' cursor='pointer'>
                Sign in
              </Box>
            </Text>
          ) : (
            <Text textStyle='y'>
              Are you new to Dash? &nbsp;
              <Box as='span' textDecoration='underline' cursor='pointer'>
                Register now
              </Box>
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  )
}
