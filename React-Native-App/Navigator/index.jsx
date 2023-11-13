import React, { useEffect } from 'react'
import { BackHandler, Alert } from 'react-native'
import NewRoomButton from './components/NewRoomButton'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './components/StackNavigator'


function NavigatorComponent() {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Fechar o aplicativo', 'Tem certeza que deseja fechar o aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);



  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
      <NewRoomButton />
    </NavigationContainer>
  )
}

export default NavigatorComponent;