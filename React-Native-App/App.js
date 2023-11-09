import React from 'react'
import Nav from './Navigator'
import AuthProvider from './context/authContext'

export default function App() {

  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  )
}