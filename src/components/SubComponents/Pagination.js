import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Box, HStack } from '@chakra-ui/react'

export default function Pagination({page, pages, keyword = ''}) {
  return (
    pages > 1 && (
      <Flex justifyContent='center' className='pagination' mt={12} mb={6}>
        <HStack spacing='12px'>
          {[...Array(pages).keys()].map((x) => (
            <Box
              w='40px'
              h='40px'
              key={x + 1}
              className={`page-item ${x + 1 === page ? 'active' : ''}`}
            >
              <Link
                className='page-link'
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/products/shop/page/${x + 1}`
                }
              >
                {' '}
                {x + 1}
              </Link>
            </Box>
          ))}
        </HStack>
      </Flex>
    )
  )
}
