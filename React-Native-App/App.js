import React from 'react'
import AuthProvider from './context/authContext'
import NavigatorComponent from './Navigator'

export default function App() {

  return (
    <AuthProvider>
      <NavigatorComponent />
    </AuthProvider>
  )
}