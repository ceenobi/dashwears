import React from 'react'
import { Box, Image, Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { gallery } from '../../Helpers'
import SubHeading from '../../SubComponents/SubHeading'

export default function Hero({color}) {
  return (
    <Box
      maxW={{ base: 'none', md: 'container.xl' }}
      m='auto'
      position={'relative'}
    >
      <Image
        src={gallery[0]}
        alt='clothing'
        width={1280}
        height={600}
        objectFit='cover'
      />
      <Box
        position={'absolute'}
        bg='paint.300'
        bottom={10}
        left={{ base: 5, md: 10 }}
        p={5}
        w={{ base: 'inherit', md: '300px' }}
      >
        <SubHeading title='Discover Trends' color={color} />
        <Text textStyle={'y'} mb={2} color={color}>
          See the latest in store
        </Text>
        <Text
          textStyle={'p'}
          textDecoration='underline'
          textTransform='uppercase'
          as={Link}
          to='/products/shop'
          color={color}
        >
          Shop Now
        </Text>
      </Box>
    </Box>
  )
}
