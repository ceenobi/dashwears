import React, { useEffect, useRef } from 'react'
import { Box, Flex, Icon, Container, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../../../Redux/Actions/ProductActions'

import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import SubHeading from '../../SubComponents/SubHeading'
import Loading from '../../SubComponents/Spinner'
import Message from '../../SubComponents/Error'
import FeaturedCard from '../../Shop/FeaturedCard'

export default function SliderA() {
  const dispatch = useDispatch()
  const productFeature = useSelector((state) => state.productFeature)
  const { loading, error, products } = productFeature

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [dispatch])

  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const { current } = scrollRef

    if (direction === 'left') {
      current.scrollLeft -= 300
    } else {
      current.scrollLeft += 300
    }
  }

  return (
    <Box mt={'20'}>
      <Container maxW='container.xl'>
        <Flex
          pt={8}
          pb={4}
          pl={4}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            minW={{ sm: '100%', md: '200px', lg: '310px', xl: '400px' }}
            pr={{ base: 2, lg: 8 }}
          >
            <SubHeading title='New Arrivals' fontSize='xl' />
            <Text
              textStyle='p'
              as={Link}
              to='/the'
              textTransform='uppercase'
              textDecoration='underline'
              mt={2}
            >
              View all
            </Text>
          </Box>
          <Flex
            maxW={{ base: '100%', md: '65%' }}
            display='flex'
            flex='1'
            // flexDirection='row'
            position='relative'
            my={{ base: 5, lg: 0 }}
          >
            {loading ? (
              <Loading />
            ) : error ? (
              <Message status='error' error={error} />
            ) : (
              <>
                <Box
                  ref={scrollRef}
                  display='flex'
                  flexDirection='row'
                  width='max-content'
                  overflowX='scroll'
                  className='rolling'
                >
                  {products.map((product, index) => (
                    <Box
                      position={'relative'}
                      minW={{ base: '220px', sm: '250px', md: '250px' }}
                      mr={6}
                      key={`product.name${index + 1}`}
                    >
                      <FeaturedCard product={product} />
                    </Box>
                  ))}
                </Box>
                <Flex
                  width='100%'
                  display={{ base: 'none', lg: 'block' }}
                  justifyContent='space-between'
                  alignItems='center'
                  py={1}
                  position='absolute'
                  bottom='40%'
                >
                  <Icon
                    as={BsArrowLeftShort}
                    fontSize={{ base: '2xl', md: '3xl' }}
                    color='paint.600'
                    cursor='pointer'
                    bgColor='paint.500'
                    borderRadius='25px'
                    onClick={() => scroll('left')}
                    style={{ transform: 'translateX(-10px)' }}
                  />
                  <Icon
                    as={BsArrowRightShort}
                    fontSize={{ base: '2xl', md: '3xl' }}
                    color='paint.600'
                    cursor='pointer'
                    bgColor='paint.500'
                    borderRadius='25px'
                    onClick={() => scroll('right')}
                    style={{ transform: 'translateX(10px)' }}
                  />
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
