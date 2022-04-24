import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Input } from '@chakra-ui/react'

const FormInput = forwardRef(
  ({ type, name, required, label, placeholder, ...props }, ref) => {
    return (
      <>
      {label ? (
        <label htmlFor={name}>
          {label} <span> {required && '*'}</span>
        </label>
        ): null}
        <Input
          {...props}
          name={name}
          id={name}
          placeholder={placeholder}
          _placeholder={{ color: 'paint.100' }}
          color='paint.100'
          type={type}
          ref={ref}
          focusBorderColor='paint.100'
          bg='gray.300'
          mb={2}
        />
      </>
    )
  }
)

export default FormInput

FormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  register: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

FormInput.defaultProps = {
  type: 'text',
  name: 'text',
  label: '',
  placeholder: '',
}
