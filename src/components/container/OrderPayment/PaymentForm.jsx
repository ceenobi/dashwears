import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react'
import SubHeading from '../../SubComponents/SubHeading'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../../../Redux/Actions/CartActions'

import Footer from '../../Footer'

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const goBack = () => {
    navigate('/shipping')
  }

  const cart = useSelector((state) => state.cart)
  const { shippingDetails } = cart

  useEffect(() => {
    if (!shippingDetails) {
      navigate('/shipping')
    }
  }, [shippingDetails, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!paymentMethod) {
      toast({
        title: 'Payment method is required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }
  }
  return (
    <>
      <Container maxW={['container.xl', '400px']} py={5} mt={5}>
        <Flex justify='center'>
          <SubHeading title='Select Payment Method' />
        </Flex>
        <Flex justify='center' mt={5} mb={4}>
          <form onSubmit={submitHandler}>
            <RadioGroup
              value={paymentMethod}
              onChange={setPaymentMethod}
              name='payment-name'
            >
              <Stack
                spacing={5}
                direction='row'
                bg='paint.200'
                boxShadow='base'
                borderWidth='1px'
                p={8}
              >
                <Radio colorScheme='blue' value='Paypal' size='lg'>
                  Paypal
                </Radio>
                <Radio colorScheme='green' value='Cash' size='lg'>
                  Cash
                </Radio>
              </Stack>
            </RadioGroup>
            <Stack
              direction={['column', 'row']}
              spacing='20px'
              justify='space-between'
              mt={5}
            >
              <Button onClick={goBack}>Back</Button>
              <Button variant='with-shadow' type='submit'>
                Next
              </Button>
            </Stack>
          </form>
        </Flex>
      </Container>
      <Footer/>
    </>
  )
}