import React, { useEffect } from 'react'
import { Box, Grid, Container, Flex, Text} from '@chakra-ui/react'
import { HiHome } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Breadcrum from '../SubComponents/Breadcrumb'
import SubHeading from '../SubComponents/SubHeading'
import ProductCard from './ProductCard'
import Loading from '../SubComponents/Spinner'
import Message from '../SubComponents/Error'
import Pagination from '../SubComponents/Pagination'
import { getProducts } from '../../Redux/Actions/ProductActions'

export default function Shop() {
  const { keyword } = useParams()
  const { pagenumber } = useParams()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(getProducts(keyword, pagenumber))
  }, [dispatch, keyword, pagenumber])

  return (
    <Box mt={1} py={5}>
      <Container maxW='container.lg'>
        <Flex justify='center'>
          <Breadcrum home={<HiHome />} page2='Shop' />
        </Flex>
        <Flex justify='center' mt={4}>
          <SubHeading title='Shop' />
        </Flex>
        <Flex justify='center' mt={4} flexWrap='wrap' mb={4}>
          <Text textStyle='y' textAlign='center'>
            There's a wide selection of different materials, designs, and
            patterns to choose from, like classic low-top, solid-color laced
            canvas sneakers, or soft leather models with fancy prints or even
            wedge heels. Extremely simple or rich in taste and quality.
          </Text>
        </Flex>
        <Box mt={10} mb={4}>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message status='error' error={error} />
          ) : (
            <Grid
              templateColumns={{
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(3, 1fr)',
                base: 'repeat(1, 1fr)',
              }}
              gap={6}
             
            >
              <>
                {products.map((product) => (
                  <Box key={product._id}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </>
            </Grid>
          )}
        </Box>
        <Pagination
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
        />
      </Container>
    </Box>
  )
}
