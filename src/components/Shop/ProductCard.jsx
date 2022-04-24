import React from 'react'
import { Box, Image, Text, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Box
      as={Link}
      to={`/products/${product._id}`}
      className='product-card'
      textAlign='center'
    >
      <Center>
        <Box borderBottom='1px' boxSize={{ base: '250px', sm: '220px' }}>
          <Image
            src={product.image[0]}
            alt={product.name}
            title={product.name}
            placeholder='blur'
          />
        </Box>
        <Box className='cover' boxSize={{ base: '250px', sm: '220px' }}>
          <Image
            src={product.image[1]}
            alt={product.name}
            title={product.name}
            placeholder='blur'
          />
        </Box>
      </Center>
      <Box>
        {' '}
        <Text textStyle='y'>{product.name} </Text>
        <Text textStyle='y'>{product.category} </Text>
        <Text textStyle='p'>&#x24;{product.price}</Text>{' '}
      </Box>
    </Box>
  )
}
