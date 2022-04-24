import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Button,
  Stack,
  Text,
  HStack,
  Image,
  Select,
} from '@chakra-ui/react'
import SubHeading from '../../SubComponents/SubHeading'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../../Redux/Actions/CartActions'
import { MdDelete } from 'react-icons/md'
import EmptyCart from './EmptyCart'

export default function CartDisplay() {
  window.scrollTo(0, 0)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { productId } = useParams()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const total = cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const goBackShopping = () => {
    navigate('/products/shop')
  }

  const orderHandler = () => {
    navigate('/auth?redirect=/shipping')
  }

  const removeCartItems = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Box mt={1} py={4}>
      <Container maxW='container.lg'>
        {cartItems.length === 0 ? (
          <Box>
            <EmptyCart />
          </Box>
        ) : (
          <>
            <Flex justifyContent={['space-between', 'center']} mt={2} mb={4}>
              <SubHeading title='Shopping Cart' />
              <Text textStyle={'p'} display={['block', 'none']}>
                ITEMS: {cartItems.length}
              </Text>
            </Flex>
            <Flex
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent= 'space-between'
              borderBottom={['0px', '1px']}
              borderColor={['none', 'grey.400']}
            >
              <Button
                mb={4}
                display={['none', 'block']}
                variant='unstyled'
                onClick={goBackShopping}
              >
                Back To Shopping
              </Button>
              <Stack
                direction={['column-reverse', 'null', 'row']}
                spacing={['10px', '24px']}
              >
                <Button disabled>PAYPAL CHECKOUT</Button>
                <Button variant='with-shadow' onClick={orderHandler}>
                  PROCEED TO ORDER
                </Button>
              </Stack>
            </Flex>
            <Box mt={4} mb={4}>
              <Text textStyle={'p'} display={['none', 'block']} mb={4}>
                ITEMS ADDED TO YOUR SHOPPING CART ({cartItems.length})
              </Text>
              {cartItems.map((item) => (
                <Flex
                  flexDirection={{ base: 'column', md: 'row' }}
                  justifyContent='space-between'
                  py={2}
                  alignItems='center'
                  key={item.slug}
                >
                  <HStack spacing='5px' w={['full', '500px']}>
                    <Link as={Link} to={`/products/${item.product}`}>
                      <Image
                        src={item.image[0]}
                        boxSize='150px'
                        objectFit='cover'
                        alt={item.name}
                      />
                    </Link>
                    <Box as={Link} to={`/products/${item.product}`}>
                      <Text textStyle='p'>{item.name}</Text>
                      <Text textStyle='p'>{item.slug}</Text>
                    </Box>
                  </HStack>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    w={['250px', '300px']}
                  >
                    <Stack direction={['row', 'column']}>
                      <Select
                        variant='flushed'
                        size='sm'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>

                      <Button
                        leftIcon={<MdDelete />}
                        variant='unstyled'
                        size='sm'
                        onClick={() => removeCartItems(item.product)}
                      >
                        REMOVE
                      </Button>
                    </Stack>
                    <Box>
                      <Text textStyle='p'> &#x24; {item.price}</Text>
                    </Box>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Flex
              justifyContent='space-between'
              mt={2}
              mb={4}
              borderBottom='1px'
              borderColor='grey.400'
            >
              <SubHeading title='Total items' />
              <SubHeading title={`$${total}`} />
            </Flex>
            <>
              {total > 1000 ? (
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mb={4}
                >
                  <Box>
                    <SubHeading title='Shipping fee' />
                    <Text>Final amount will depend on total</Text>
                  </Box>
                  <Text textStyle={'p'}>Free</Text>
                </Box>
              ) : (
                <Box display='flex' justifyContent='space-between' mb={4}>
                  <SubHeading title='Shipping fee' />
                  <Text textStyle='p'>&#x24;3</Text>
                </Box>
              )}
              <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                justifyContent='space-between'
              >
                <Button mb={4} variant='unstyled' onClick={goBackShopping}>
                  Back To Shopping
                </Button>
                {total > 0 && (
                  <Stack
                    direction={['column-reverse', 'null', 'row']}
                    spacing={['10px', '24px']}
                  >
                    <Button disabled>PAYPAL CHECKOUT</Button>
                    <Button variant='with-shadow' onClick={orderHandler}>
                      PROCEED TO ORDER
                    </Button>
                  </Stack>
                )}
              </Flex>
            </>
          </>
        )}
      </Container>
    </Box>
  )
}
