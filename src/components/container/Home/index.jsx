import React from 'react'
import Hero from './Hero'
import PosterA from './PosterA'
import ProductA from './ProductA'
import SliderA from './SliderA'
import { useColorModeValue } from '@chakra-ui/react'
import Footer from '../../Footer'

export default function Home() {
  window.scrollTo(0, 0)
  const color = useColorModeValue('paint.500', 'paint.100')
  const colorProductA = useColorModeValue('paint.500', 'paint.500')

  return (
    <>
      <Hero color={color} />
      <ProductA color={colorProductA} />
      <SliderA />
      <PosterA color={colorProductA} />
      <Footer/>
    </>
  )
}
