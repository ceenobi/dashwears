const registerOptions = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'must be at least 2 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
  },
  confirmPassword: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
  },
  phone: {
    minLength: {
      value: 4,
      message: 'Phone must have at least 4 characters',
    },
  },
  address: {
    required: 'Address is required',
    minLength: {
      value: 4,
      message: 'Address must have at least 4 characters',
    },
  },
  city: {
    required: 'City is required',
    minLength: {
      value: 2,
      message: 'City must have at least 2 characters',
    },
  },
  postalCode: {
    required: 'Zip/Post code is required',
    minLength: {
      value: 1,
      message: 'Postal code must have at least 1 characters',
    },
  },
  state: {
    required: 'State is required',
    minLength: {
      value: 1,
      message: 'State must have at least 1 characters',
    },
  },
  country: {
    required: 'Country is required',
    minLength: {
      value: 1,
      message: 'Country must have at least 1 characters',
    },
  },
}

export default registerOptions
