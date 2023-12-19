import React, { useEffect } from 'react'
import AuthProvider from './context/authContext'
import NavigatorComponent from './navigator'

export default function App() {

  return (
    <AuthProvider>
      <NavigatorComponent />
    </AuthProvider>
  )
}