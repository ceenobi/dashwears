import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Text,
  Divider,
  Image,
  Button,
  Select,
  useToast,
  Stack,
  Textarea,
  Grid,
  FormControl,
  VStack,
  Center,
} from '@chakra-ui/react'
import { HiHome } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext,
// } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/lazy'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css'
import { Lazy, Navigation } from 'swiper'
import Breadcrum from '../../SubComponents/Breadcrumb'
import SubHeading from '../../SubComponents/SubHeading'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProductReview,
  getProductId,
  getProducts,
} from '../../../Redux/Actions/ProductActions'
import Loading from '../../SubComponents/Spinner'
import Message from '../../SubComponents/Error'
import Rating from '@material-ui/lab/Rating'
import { CREATE_REVIEW_RESET } from '../../../Redux/Constants/actionTypes'
import moment from 'moment'

export default function SingleProduct() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productReview = useSelector((state) => state.productReview)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  useEffect(() => {
    if (successReview) {
      toast({
        title: 'Review Submitted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setRating(0)
      setComment('')
      dispatch({ type: CREATE_REVIEW_RESET })
    }
    dispatch(getProductId(productId))
  }, [dispatch, productId, successReview, toast])

  useEffect(() => {
    if (product) {
      dispatch(getProducts())
    }
  }, [dispatch, product])

  const relatedTo = products.filter(({ _id }) => _id !== product._id)

  const openRelatedTo = (_id) => navigate(`/products/${_id}`)

  const saveProductHandler = (e) => {
    e.preventDefault()
    toast({
      title: 'Product saved successfuly',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const addToCartHandler = (e) => {
    e.preventDefault()
    toast({
      title: 'Product added successfuly',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    navigate(`/cart/${productId}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    )
  }
  const productImages = [product.image]

  return (
    <Container maxW='container.lg' m='auto' mb={10}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message status='error' error={error} />
      ) : (
        <Box>
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
              xl: 'repeat(2, 1fr)',
              base: 'repeat(1, 1fr)',
            }}
            gap={6}
            justify='space-between'
          >
            <Box>
              {/* <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={2}
              >
                <Slider>
                  <Slide index={0}>{product.image}</Slide>
                  <Slide index={1}>{product.image[1]}</Slide>
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </CarouselProvider> */}

              <Swiper
                style={{ '--swiper-navigation-color': 'paint.100' }}
                lazy={true}
                navigation={true}
                modules={[Lazy, Navigation]}
              >
                {productImages.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={item}
                      width={{ base: '250px', md: '400px' }}
                      height={400}
                      alt={product.name}
                      className='swiper-lazy'
                    />
                    <div className='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box>
              <Box alignItems='flex-start' p={{ base: 2, md: 4 }}>
                <Box mt={4}>
                  <SubHeading title={product.title} />
                  <Text textStyle='p'>Brand:&nbsp;{product.brand}</Text>
                  {product.countInStock > 0 ? (
                    <Text textStyle={'p'} mt={2}>
                      Stock:&nbsp;Available
                    </Text>
                  ) : (
                    <Text textStyle={'p'} mt={2}>
                      Out of stock
                    </Text>
                  )}
                  <Box display='flex' mt='2' mb={4} alignItems='center'>
                    <Rating
                      value={product.rating}
                      name='simple-controlled'
                      precision={0.5}
                      readOnly
                    />
                    <Box as='span' ml='2'>
                      {product.numReview} reviews
                    </Box>
                  </Box>
                  <Text textStyle={'p'} mt={2} mb={2}>
                    &#x24;{product.price}
                  </Text>
                  {product.countInStock > 0 ? (
                    <>
                      <Box mb={3}>
                        <Select
                          variant='flushed'
                          size='sm'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      <Button
                        variant='with-shadow'
                        isFullWidth
                        onClick={addToCartHandler}
                        mb={2}
                      >
                        ADD TO CART
                      </Button>
                    </>
                  ) : null}
                  <Button
                    isFullWidth
                    onClick={saveProductHandler}
                    mb={2}
                    disabled
                  >
                    Save for later
                  </Button>
                </Box>
                {product.price > 400 ? (
                  <Text textStyle='y' flexWrap='wrap'>
                    This item is eligible for free shipping
                  </Text>
                ) : (
                  <Text textStyle='y' flexWrap='wrap' mb={4}>
                    Additional shipping fee is included at checkout
                  </Text>
                )}
              </Box>
              {userInfo ? null : (
                <Box alignItems='flex-start' p={{ base: 2, md: 4 }}>
                  <SubHeading title='Looking for great offers?' />
                  <Text textStyle='y' flexWrap='wrap'>
                    Dash customers can{' '}
                    <Box
                      as='span'
                      onClick={() => navigate('/auth')}
                      color='paint.300'
                      cursor='pointer'
                    >
                      log in
                    </Box>{' '}
                    and get great offers. If you do not yet have a login, please{' '}
                    <Box
                      as='span'
                      onClick={() => navigate('/auth')}
                      color='paint.300'
                      cursor='pointer'
                    >
                      sign up
                    </Box>
                    &nbsp;here.
                  </Text>
                </Box>
              )}
            </Box>
          </Grid>
          <Breadcrum
            home={<HiHome />}
            page1={'Shop'}
            page2={product.category}
          />
          <Divider orientation='horizontal' mb={4} borderBottom='1px' />
          <Box>
            <Box display='flex' justifyContent='center'>
              <SubHeading title='Details' />
            </Box>
            <Text textStyle='y' textAlign='center' p={{ base: 2, md: 4 }}>
              {product.description}
            </Text>
          </Box>
          <Divider orientation='horizontal' mb={4} borderBottom='1px' />
          <Stack
            direction={['column', 'row']}
            spacing='30px'
            justifyContent='space-between'
            mt={10}
            p={{ base: 2, md: 4 }}
          >
            <Box w={{ base: '100%', md: '50%' }}>
              <SubHeading title='Reviews' />
              {product.reviews.length === 0 && (
                <Text textStyle='p'>No reviews yet.</Text>
              )}
              {product.reviews.map((review) => (
                <Box key={review._id} py={3}>
                  <Text textStyle='p'>{review.name}</Text>
                  <Rating value={review.rating} precision={0.5} readOnly />
                  <Box>
                    {' '}
                    <Box as='span'>{moment(review.createdAt).calendar()}</Box>
                  </Box>

                  <Text bg='teal' p={2}>
                    {review.comment}
                  </Text>
                </Box>
              ))}
            </Box>
            <Box w={{ base: '100%', md: '30%' }}>
              <SubHeading title='Write a review' />
              <Box>
                {loadingReview && <Loading />}
                {errorReview && <Message status='error' error={errorReview} />}
              </Box>
              <Box>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <FormControl>
                      <Box>
                        <Text textStyle='p'>Rating</Text>
                        <Rating
                          value={rating}
                          name='rate-product'
                          precision={0.5}
                          onChange={(e) => setRating(e.target.value)}
                        />
                      </Box>
                    </FormControl>
                    <FormControl>
                      <Box mt={4}>
                        <Text textStyle='p'>Add a Comment</Text>
                        <Textarea
                          placeholder='Enter your comment'
                          size='sm'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Box>
                    </FormControl>
                    <Button
                      type='submit'
                      variant='with-shadow'
                      disabled={loadingReview}
                      mt={4}
                    >
                      Submit
                    </Button>
                  </form>
                ) : (
                  <Box>
                    <Text textStyle='p'>
                      Please &nbsp;
                      <Box
                        as='span'
                        color='teal'
                        onClick={() => navigate('/auth')}
                        cursor='pointer'
                      >
                        Login
                      </Box>{' '}
                      to write a review
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
          <Divider orientation='horizontal' mb={4} borderBottom='1px' />
          <Box display='flex' justifyContent='center' mt={10}>
            <SubHeading title='Products you might like' textAlign='center' />
          </Box>
          {relatedTo.length && (
            <Box mt={10}>
              <Grid
                templateColumns={{
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                  base: 'repeat(1, 1fr)',
                }}
                gap={1}
                mt={5}
              >
                <>
                  {relatedTo.map(({ image, _id, category, price, name }) => (
                    <Box
                      onClick={() => openRelatedTo(_id)}
                      key={_id}
                      textAlign='center'
                      cursor='pointer'
                    >
                      <Center>
                        <Image
                          src={image[0]}
                          alt={name}
                          title={name}
                          placeholder='blur'
                          boxSize='220px'
                        />
                      </Center>
                      <VStack alignItems='center' spacing='4px'>
                        {' '}
                        <Text textStyle='y' mb={2}>
                          {name}{' '}
                        </Text>
                        <Text textStyle='y' mb={2}>
                          {category}{' '}
                        </Text>
                        <Text textStyle='p'>&#x24;{price}</Text>{' '}
                      </VStack>
                    </Box>
                  ))}
                </>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Container>
  )
}
