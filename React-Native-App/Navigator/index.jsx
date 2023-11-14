import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './components/StackNavigator'

function NavigatorComponent() {

  const linking = {
    prefixes: ['exp://192.168.100.2:19000/--'],
    config: {
      screens: {
        RequisitosDaSala: {
          path: 'group-inviation/:id',
          parse: {
            id: (id) => id
          }
        }
      }
    },
  };

  return (
    <NavigationContainer linking={linking} style={styles.container} independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default NavigatorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AD1FB',
  },
});