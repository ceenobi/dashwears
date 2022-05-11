import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Stack,
  Text,
  Icon,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  useColorModeValue,
  Center,
  useToast,
  Grid
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDash, AiFillMail } from 'react-icons/ai'
import SubHeading from '../SubComponents/SubHeading'
import FormInput from '../container/User/Auth/FormInput'
import { registerMail, saveGenderMethod } from '../../Redux/Actions/MailActions'
import Message from '../SubComponents/Error'

export default function FooterLinks() {
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const bg = useColorModeValue('paint.600', 'paint.700')
  const bgA = useColorModeValue('paint.400', 'paint.100')
  const colorA = useColorModeValue('paint.500', 'paint.600')
  const dispatch = useDispatch()
  const toast = useToast()
  const form = useRef()

  const mailClient = useSelector((state) => state.mailClient)
  const { loading, error, mailInfo } = mailClient

  const options = [
    { title: 'Woman', name: 'woman' },
    { title: 'Man', name: 'man' },
  ]
  const handleRadio = (e) => {
    const gender = e.target.value
    setGender(gender)
  }

  useEffect(() => {
    dispatch(saveGenderMethod(gender))
  }, [dispatch, gender])

  useEffect(() => {
    if (!mailInfo) {
      return null
    } else {
      toast({
        title: 'Subscribed!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [mailInfo, toast])

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(registerMail(email, gender))
  }

  return (
    <Box mt={1} py={4} borderBottom='1px' bg={bg}>
      <Container maxW='container.lg'>
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(5, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(5, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
          gap={4}
        >
          <Stack direction='column' spacing='10px' p={3}>
            <Box align='center' mb={2}>
              <SubHeading title='New to Dash' />
              <Icon as={AiOutlineDash} w={6} />
            </Box>
            <Stack direction='column' spacing='10px' textAlign='center'>
              <Text textStyle='y' as={Link} to='/#'>
                Shopping guide
              </Text>
              <Text textStyle='y' as={Link} to='/products/shop'>
                Browse all Designers
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Browse all Categories
              </Text>
            </Stack>
          </Stack>
          <Stack direction='column' spacing='10px' p={3}>
            <Box align='center' mb={2}>
              <SubHeading title='Help' />
              <Icon as={AiOutlineDash} w={6} />
            </Box>
            <Stack direction='column' spacing='10px' textAlign='center'>
              <Text textStyle='y' as={Link} to='/#'>
                Shopping times & cost
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Product quality
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Track your order
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Return & refunds
              </Text>
            </Stack>
          </Stack>
          <Center>
            <Stack
              direction='column'
              spacing='10px'
              w='300px'
              bg={bgA}
              color={colorA}
              p={3}
            >
              <Box align='center' mb={2}>
                <Icon as={AiFillMail} w={6} h={8} />
                <SubHeading title='Dash News' />
              </Box>
              <Text textStyle='y' mb={4} textAlign='center'>
                Sign up for the newsletter and discover the latest arrivals and
                promotions
              </Text>
              {error && <Message status='error' error={error} />}
              <form align='center' ref={form} onSubmit={submitHandler}>
                <FormControl>
                  <FormInput
                    name='email'
                    placeholder='Insert your email address'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <RadioGroup
                  value={gender}
                  onChange={setGender}
                  mb={4}
                  name='form-gender'
                  isRequired
                >
                  <Stack spacing={5} direction='row' justify='center'>
                    {options.map((key, index) => (
                      <Radio
                        colorScheme='blue'
                        size='sm'
                        bg='paint.100'
                        value={key.title}
                        key={index}
                        onChange={(e) => handleRadio(e)}
                      >
                        {key.title}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                <Stack spacing={5} direction='row' mb={4}>
                  <Checkbox colorScheme='red' isRequired>
                    <small>
                      I consent to receive DASH newsletters via email. For
                      further information, please consult the Privacy Policy.
                    </small>
                  </Checkbox>
                </Stack>

                {loading ? (
                  <Button type='submit' variant='with-shadow' isLoading>
                    LOADING
                  </Button>
                ) : (
                  <Button type='submit' variant='with-shadow'>
                    SIGN UP
                  </Button>
                )}
              </form>
            </Stack>
          </Center>

          <Stack direction='column' spacing='10px' p={3}>
            <Box align='center' mb={2}>
              <SubHeading title='My Dash' />
              <Icon as={AiOutlineDash} w={6} />
            </Box>
            <Stack direction='column' spacing='10px' textAlign='center'>
              <Text textStyle='y' as={Link} to='/auth'>
                Login
              </Text>
              <Text textStyle='y' as={Link} to='/orders'>
                My Orders
              </Text>
              <Text textStyle='y' as={Link} to='/profile'>
                My Details
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Promo
              </Text>
            </Stack>
          </Stack>
          <Stack direction='column' spacing='10px' p={3}>
            <Box align='center' mb={2}>
              <SubHeading title='Help' />
              <Icon as={AiOutlineDash} w={6} />
            </Box>
            <Stack direction='column' spacing='10px' textAlign='center'>
              <Text textStyle='y' as={Link} to='/#'>
                Company info
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Press
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Affiliation
              </Text>
              <Text textStyle='y' as={Link} to='/#'>
                Careers
              </Text>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Box>
  )
}
