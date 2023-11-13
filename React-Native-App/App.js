import React from 'react'
import LoginLogic from './screens/Login/components/login-logic'
import AuthProvider from './context/authContext'

export default function App() {

  return (
    <AuthProvider>
      <LoginLogic />
    </AuthProvider>
  )
}