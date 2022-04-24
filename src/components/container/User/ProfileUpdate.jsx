import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, FormControl, Container, useToast, Box } from '@chakra-ui/react'
import Message from '../../SubComponents/Error'
import Loading from '../../SubComponents/Spinner'
import { updateUserProfile } from '../../../Redux/Actions/UserActions'
import FormInput from './Auth/FormInput'
import registerOptions from './Auth/InputValidation'

export default function ProfileUpdate() {
  const dispatch = useDispatch()
  const toast = useToast()
  const toastId = React.useRef(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { loading: updateLoading } = userUpdateProfile
  const methods = useForm()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods
  const handleError = (errors) => {}

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [dispatch, user, setValue])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toast({
          title: 'Passwords do not match',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast({
          title: 'Profile updated successfuly!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <Box mt={1} py={4}>
      <Container maxW={['container.xl', '400px']} h='80vh'>
        {error && <Message status='error' error={error} />}
        {loading && <Loading />}
        {updateLoading && <Loading />}
        <FormProvider {...methods}>{/* errors */}</FormProvider>
        <form onSubmit={handleSubmit(submitHandler, handleError)}>
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
          <FormControl mb={3}>
            <FormInput
              name='password'
              placeholder='******'
              type='password'
              label='CONFIRM PASSWORD'
              required
              {...register('confirmPassword', registerOptions.confirmPassword)}
            />
            {errors?.confirmPassword && errors.confirmPassword.message}
          </FormControl>
          <Button
            mt={4}
            mb={4}
            type='submit'
            variant='with-shadow'
            w='full'
            loadingText='updating'
          >
            Update Profile
          </Button>
        </form>
      </Container>
    </Box>
  )
}
