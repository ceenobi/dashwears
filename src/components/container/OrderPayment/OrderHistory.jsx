import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Container,
  Button,
  VStack
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Loading from '../../SubComponents/Spinner'
import Message from '../../SubComponents/Error'
import SubHeading from '../../SubComponents/SubHeading'
import moment from 'moment'

export default function OrderHistory({ orders, loading, error }) {
  return (
    <Box mt={1} py={4} h='80vh'>
      <Container maxW='container.lg'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message status='error' error={error} />
        ) : (
          <Box>
            {orders.length === 0 ? (
              <VStack spacing='10px' justify='center'>
                <SubHeading title='No Orders' />
                <Button variant='with-shadow' as={Link} to='/'>
                  START SHOPPING
                </Button>
              </VStack>
            ) : (
              <TableContainer py={5}>
                <Table variant='stripped' colorScheme='teal'>
                  <TableCaption>Orders generated</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map((order) => (
                      <Tr key={order._id}>
                        <Td>
                          <Link to={`/order/${order._id}`}>{order._id}</Link>
                        </Td>
                        <Td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</Td>
                        <Td>
                          {order.isPaid
                            ? moment(order.paidAt).calendar()
                            : moment(order.createdAt).calendar()}
                        </Td>
                        <Td>${order.totalPrice}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Container>
    </Box>
  )
}
