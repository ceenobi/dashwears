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
  LinkBox,
  LinkOverlay,
  useToast,
} from '@chakra-ui/react'
import { BsPersonCircle } from 'react-icons/bs'
import { FiTruck } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import SubHeading from '../../SubComponents/SubHeading'
import { getOrderDetails, payOrder } from '../../../Redux/Actions/OrderActions'
import moment from 'moment'
import Loading from '../../SubComponents/Spinner'
import Message from '../../SubComponents/Error'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../../../Redux/Constants/actionTypes'

export default function Order() {
  const toast = useToast()
  const { orderId } = useParams()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading) {
    const round2 = (num) => {
      return (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)
    }
    order.itemsPrice = round2(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!order || successPay) {
      dispatch(getOrderDetails(orderId))
      if (successPay) {
        dispatch({ type: ORDER_PAY_RESET })
      }
    } else {
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/config/paypal')
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'USD' },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      addPayPalScript()
    }
  }, [dispatch, orderId, successPay, order, paypalDispatch])

  // useEffect(() => {
  //   if (!order || successPay) {
  //     dispatch({ type: ORDER_PAY_RESET })
  //     dispatch(getOrderDetails(orderId))
  //   } else {
  //     const addPayPalScript = async () => {
  //       const { data: clientId } = await axios.get('/config/paypal')
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: { 'client-id': clientId, currency: 'USD' },
  //       })
  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
  //     }
  //     addPayPalScript()
  //   }
  // }, [dispatch, orderId, successPay, order, paypalDispatch])

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Your purchase details',
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (paymentResult) {
      dispatch(payOrder(orderId, paymentResult))
    })
  }

  const displayError = () => {
    return <Message status='error' error={error} />
  }

  useEffect(() => {
    if (!successPay) {
      return null
    } else {
      toast({
        title: 'Payment successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [successPay, toast])

  return (
    <Box mt={1} py={4}>
      <Container maxW='container.lg'>
        <Flex justifyContent='center'>
          <SubHeading title='Order Summary' />
        </Flex>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message status='error' error={error} />
        ) : (
          <Box mt={10}>
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
              {' '}
              <Flex alignItems='center' px={2}>
                <Box>
                  <Icon as={BsPersonCircle} w={12} h={12} color='red.500' />
                </Box>
                <Box ml={3}>
                  <SubHeading title='Customer' />
                  <Text textStyle='p'>{order.user.name}</Text>
                  <LinkBox>
                    <Text>
                      {' '}
                      <LinkOverlay href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </LinkOverlay>
                    </Text>
                  </LinkBox>
                </Box>
              </Flex>
              <Flex alignItems='center' px={2}>
                <Box>
                  <Icon as={FiTruck} w={12} h={12} color='red.500' />
                </Box>
                <Box ml={3}>
                  <SubHeading title='Order Info' />
                  <Text textStyle='p'>
                    Shipping:&nbsp;{order.shippingDetails.country}
                  </Text>
                  <Text textStyle='p'>
                    Pay method:&nbsp;{order.paymentMethod}
                  </Text>
                  {order.isPaid ? (
                    <Text textStyle='p'>
                      Paid on:{moment(order.paidAt).calendar()}
                    </Text>
                  ) : (
                    <Text textStyle='p'>Not Paid</Text>
                  )}
                </Box>
              </Flex>
              <Flex alignItems='center' px={2}>
                <Box>
                  <Icon as={GoLocation} w={12} h={12} color='red.500' />
                </Box>
                <Box ml={3}>
                  <SubHeading title='Deliver To' />
                  <Text textStyle='p'>
                    {' '}
                    Address:&nbsp;{order.shippingDetails.address},{' '}
                    {order.shippingDetails.city},{order.shippingDetails.state}
                  </Text>
                  {order.isDelivered ? (
                    <Text textStyle='p'>
                      Delivered:{moment(order.deliveredAt).calendar()}
                    </Text>
                  ) : (
                    <Text textStyle='p'>Not Delivered</Text>
                  )}
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
              {order.orderItems.length === 0 ? (
                <Message
                  status='info'
                  error='Your order is empty'
                  msg='Please go make a purchase'
                />
              ) : (
                <Box>
                  {order.orderItems.map((item, index) => (
                    <Flex
                      flexDirection={{ base: 'column', md: 'row' }}
                      justify='space-between'
                      alignItems='center'
                      key={index}
                      py={3}
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
                        <Box>
                          <Text textStyle='p'>{item.name}</Text>
                          <Text textStyle='p'>{item.slug}</Text>
                        </Box>
                      </HStack>
                      <Box display='flex'>
                        {' '}
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
              <Box border='1px' p={5} borderColor='grey.400' boxShadow='base'>
                <Flex borderBottom='1px' justifyContent='space-between'>
                  <Text textStyle='p'>Products</Text>
                  <SubHeading title={`$${order.itemsPrice}`} />
                </Flex>
                <Flex borderBottom='1px' justifyContent='space-between'>
                  <Text textStyle='p'>Shipping</Text>
                  <SubHeading title={`$${order.shippingPrice}`} />
                </Flex>
                <Flex borderBottom='1px' justifyContent='space-between'>
                  <Text textStyle='p'>Tax</Text>
                  <SubHeading title={`$${order.taxPrice}`} />
                </Flex>
                <Flex justifyContent='space-between'>
                  <Text textStyle='p'>Total</Text>
                  <SubHeading title={`$${order.totalPrice}`} />
                </Flex>
              </Box>
            </Grid>
            {!order.isPaid && (
              <Flex justifyContent='end' mt={5}>
                {loadingPay && <Loading />}
                {isPending ? (
                  <Loading />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={displayError}
                  />
                )}
              </Flex>
            )}
          </Box>
        )}
      </Container>
    </Box>
  )
}
