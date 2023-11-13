import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './components/StackNavigator'

function NavigatorComponent() {

  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default NavigatorComponent;