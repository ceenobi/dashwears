import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Breadcrum({ home, page1, page2 }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={'/'}>
          {home}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {page1 ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/products/${page1}`}>
            {page1}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{page2}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
