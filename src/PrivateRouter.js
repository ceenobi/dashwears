import React from 'react'
import { Navigate } from 'react-router-dom'

const useAuth = () => {
  const user = window.localStorage.getItem('userInfo')
  if (user) {
    return true
  } else {
    return false
  }
}

export default function PrivateRouter({ children }) {
  const auth = useAuth()
  return <>{auth ? children : <Navigate to='/auth' />};</>
}
