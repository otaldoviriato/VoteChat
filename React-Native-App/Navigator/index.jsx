import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './components/StackNavigator'

function NavigatorComponent() {

  return (
    <NavigationContainer  style={styles.container} independent={true}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default NavigatorComponent


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AD1FB',
  },
})