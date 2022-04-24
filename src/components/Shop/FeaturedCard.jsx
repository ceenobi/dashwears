import React from 'react'
import {
  Box,
  Image,
  VStack,
  Text,
  useStyleConfig,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function FeaturedCard({ product }) {
  const color = useColorModeValue('paint.500', 'paint.500')

  function Card(props) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Card', { variant })
    return <Box __css={styles} {...rest} borderWidth='1px' />
  }

  return (
    <Card as={Link} to={`/products/${product._id}`} variant='smooth'>
      <Image
        src={product.image[0]}
        alt={product.name}
        title={product.name}
        placeholder='blur'
        boxSize='250px'
      />

      <VStack alignItems='center' spacing='4px' color={color}>
        {' '}
        <Text textStyle='y'>
          {product.name}{' '}
        </Text>
        <Text textStyle='y'>
          {product.category}{' '}
        </Text>
        <Text textStyle='p'>&#x24;{product.price}</Text>{' '}
      </VStack>
    </Card>
  )
}
