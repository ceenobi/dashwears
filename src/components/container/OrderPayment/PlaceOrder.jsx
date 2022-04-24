import React, { useEffect } from 'react'
import {
  Container,
  HStack,
  Stack,
  Box,
  Flex,
  Icon,
  Text,
  Grid,
  Image,
  Button,
} from '@chakra-ui/react'
import { BsPersonCircle } from 'react-icons/bs'
import { FiTruck } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SubHeading from '../../SubComponents/SubHeading'
import Message from '../../SubComponents/Error'
import { ORDER_CREATE_RESET } from '../../../Redux/Constants/actionTypes'
import { createOrder } from '../../../Redux/Actions/OrderActions'

export default function PlaceOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const round2 = (num) =>
    (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)
  cart.itemsPrice = round2(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = round2(cart.itemsPrice > 1000 ? 0 : 3)
  cart.taxPrice = round2(Number((cart.itemsPrice * 0.015).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success, navigate, dispatch, order])

  const placeOrderHandler = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingDetails: cart.shippingDetails,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <Box mt={1} py={4}>
      <Container maxW='container.lg'>
        <Flex justify='center' mb={4}>
          <SubHeading title='Order Details' />
        </Flex>
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
          gap={3}
          borderBottom='1px'
          borderColor='grey.400'
          py={2}
        >
          <Flex alignItems='center' px={2}>
            <Box>
              <Icon as={BsPersonCircle} w={12} h={12} color='red.500' />
            </Box>
            <Box ml={3}>
              <SubHeading title='Customer' />
              <Text textStyle='p'>{userInfo.name}</Text>
              <Text textStyle='y'>{userInfo.email}</Text>
            </Box>
          </Flex>
          <Flex alignItems='center' px={2}>
            <Box>
              <Icon as={FiTruck} w={12} h={12} color='red.500' />
            </Box>
            <Box ml={3}>
              <SubHeading title='Order Info' />
              <Text textStyle='p'>
                Shipping: {cart.shippingDetails.country}
              </Text>
              <Text textStyle='p'>Pay method: {cart.paymentMethod}</Text>
              <Text textStyle='p'>Phone: {cart.shippingDetails.phone}</Text>
            </Box>
          </Flex>
          <Flex alignItems='center' px={2}>
            <Box>
              <Icon as={GoLocation} w={12} h={12} color='red.500' />
            </Box>
            <Box ml={3}>
              <SubHeading title='Deliver To' />
              <Text textStyle='p'>
                Address: {cart.shippingDetails.address},
                {cart.shippingDetails.city}, {cart.shippingDetails.state}
              </Text>
            </Box>
          </Flex>
        </Grid>
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(1, 1fr)',
            xl: 'repeat(1, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
          gap={12}
          borderColor='grey.400'
          py={3}
          px={2}
        >
          {cart.cartItems.length === 0 ? (
            <Message
              status='info'
              error='Your cart is empty'
              msg='Please go back to shopping in order to purchase'
            />
          ) : (
            <Box>
              {cart.cartItems.map((item, index) => (
                <Flex
                  flexDirection={{ base: 'column', sm: 'row' }}
                  justify='space-between'
                  alignItems='center'
                  py={3}
                  key={index}
                  borderColor='grey.400'
                >
                  {' '}
                  <HStack spacing='5px' w={['full', '300px']} mb={2}>
                    <Link as={Link} to={`/products/${item.product}`}>
                      <Image
                        src={item.image[0]}
                        boxSize='100px'
                        objectFit='cover'
                        alt={item.name}
                      />
                    </Link>
                    <Box as={Link} to={`/products/${item.product}`}>
                      <Text textStyle='p'>{item.name}</Text>
                      <Text textStyle='y'>{item.slug}</Text>
                    </Box>
                  </HStack>
                  <Box display='flex'>
                    <Stack direction='row' spacing='40px'>
                      <Box>
                        <Text textStyle='p'>QTY:</Text>
                        <Text textStyle='p'>{item.qty}</Text>
                      </Box>
                      <Box>
                        <Text textStyle='p'>SUBTOTAL:</Text>
                        <Text textStyle='p'>${item.qty * item.price}</Text>
                      </Box>
                    </Stack>
                  </Box>
                </Flex>
              ))}
            </Box>
          )}
          <Box
            border='1px'
            p={5}
            mt={['null']}
            borderColor='grey.400'
            boxShadow='base'
          >
            <Flex borderBottom='1px' justify='space-between'>
              <Text textStyle='p'>Products</Text>
              <SubHeading title={`$${cart.itemsPrice}`} />
            </Flex>
            <Flex borderBottom='1px' justify='space-between'>
              <Text textStyle='p'>Shipping</Text>
              <SubHeading title={`$${cart.shippingPrice}`} />
            </Flex>
            <Flex borderBottom='1px' justify='space-between'>
              <Text textStyle='p'>Tax</Text>
              <SubHeading title={`$${cart.taxPrice}`} />
            </Flex>
            <Flex justify='space-between'>
              <Text textStyle='p'>Total</Text>
              <SubHeading title={`$${cart.totalPrice}`} />
            </Flex>
          </Box>
        </Grid>
        {cart.cartItems.length === 0 ? null : (
          <Flex justify='end' mt={5}>
            <Button
              variant='with-shadow'
              type='submit'
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </Flex>
        )}
        {error && <Message status='error' error={error} />}
      </Container>
    </Box>
  )
}
