import React, { useEffect } from 'react'
import {
  FormControl,
  Box,
  Flex,
  Text,
  Container,
  Stack,
  Button,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingDetails } from '../../../Redux/Actions/CartActions'
import { useNavigate } from 'react-router-dom'

import SubHeading from '../../SubComponents/SubHeading'
import FormInput from '../User/Auth/FormInput'
import registerOptions from '../User/Auth/InputValidation'

export default function Shipping() {
  window.scrollTo(0, 0)
  const cart = useSelector((state) => state.cart)
  const { shippingDetails } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const methods = useForm()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods
  const handleError = (errors) => {}

  useEffect(() => {
    setValue('name', shippingDetails.name)
    setValue('email', shippingDetails.email)
    setValue('phone', shippingDetails.phone)
    setValue('address', shippingDetails.address)
    setValue('city', shippingDetails.city)
    setValue('postalCode', shippingDetails.postalCode)
    setValue('state', shippingDetails.state)
    setValue('country', shippingDetails.country)
  }, [
    setValue,
    shippingDetails.name,
    shippingDetails.email,
    shippingDetails.phone,
    shippingDetails.address,
    shippingDetails.city,
    shippingDetails.postalCode,
    shippingDetails.state,
    shippingDetails.country,
  ])

  const submitHandler = ({
    name,
    email,
    phone,
    address,
    city,
    state,
    postalCode,
    country,
  }) => {
    dispatch(
      saveShippingDetails({
        name,
        email,
        phone,
        address,
        city,
        state,
        postalCode,
        country,
      })
    )
    navigate('/paymentform')
  }

  return (
    <Container maxW={['container.xl', '800px']} py={5} mt={5}>
      <Flex justifyContent='center'>
        <SubHeading title='Delivery Info' />
      </Flex>
      <FormProvider {...methods}>{/* errors */}</FormProvider>
      <form onSubmit={handleSubmit(submitHandler, handleError)}>
        <Stack
          direction={['column', 'row']}
          spacing='24px'
          justifyContent='space-between'
        >
          <Box>
            <Box display='flex' justifyContent='center' mt={5} mb={4}>
              <Text textStyle='p'>Customer: Who are we shipping this to?</Text>
            </Box>
            <FormControl>
              <FormInput
                name='name'
                placeholder='John Doe'
                type='text'
                label='NAME'
                required
                {...register('name', registerOptions.name)}
              />
              {errors?.name && errors.name.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='email'
                placeholder='EMAIL'
                type='email'
                label='EMAIL'
                required
                {...register('email', registerOptions.email)}
              />
              {errors?.email && errors.email.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='phone'
                placeholder='PHONE NO:'
                type='number'
                label='PHONE'
                {...register('phone', registerOptions.phone)}
              />
              {errors?.phone && errors.phone.message}
            </FormControl>
          </Box>
          <Box>
            <Box display='flex' justifyContent='center' mt={5} mb={4}>
              <Text textStyle='p'>
                Shipping: Where are we shipping this to?
              </Text>
            </Box>
            <FormControl>
              <FormInput
                name='address'
                placeholder='ADDRESS'
                type='text'
                label='ADDRESS'
                required
                {...register('address', registerOptions.address)}
              />
              {errors?.address && errors.address.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='city'
                placeholder='CITY'
                type='text'
                label='CITY'
                required
                {...register('city', registerOptions.city)}
              />
              {errors?.city && errors.city.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='postalCode'
                placeholder='POST CODE'
                type='text'
                label='POSTAL CODE'
                required
                {...register('postalCode', registerOptions.postalCode)}
              />
              {errors?.postalCode && errors.postalCode.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='state'
                placeholder='STATE'
                type='text'
                label='STATE'
                required
                {...register('state', registerOptions.state)}
              />
              {errors?.state && errors.state.message}
            </FormControl>
            <FormControl>
              <FormInput
                name='country'
                placeholder='COUNTRY'
                type='text'
                label='COUNTRY'
                required
                {...register('country', registerOptions.country)}
              />
              {errors?.country && errors.country.message}
            </FormControl>
          </Box>
        </Stack>
        <Flex justify='center'>
          {' '}
          <Button type='submit' variant='with-shadow' mt={5}>
            Next
          </Button>
        </Flex>
      </form>
    </Container>
  )
}
