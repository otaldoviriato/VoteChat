import React, { useEffect } from 'react'
import { BackHandler, Alert } from 'react-native'
import NewRoomButton from './components/NewRoomButton'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importe os componentes de tela que você deseja navegar
import ListRoomsScreen from '../screens/Home'
import RoomDetailsScreen from '../screens/RoomDetails'
import ListPendingScreen from '../screens/Pending'


const Tab = createMaterialTopTabNavigator();

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

  const Stack = createNativeStackNavigator();

  function StackNaigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ListaDeSalas" component={ListRoomsScreen} options={{title: 'Minhas Salas'}} />
        <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{title: 'Grupo X'}} />
        <Stack.Screen name="ListaDePendentes" component={ListPendingScreen} options={{title: 'Pendentes'}} />
        {/* Adicione outras telas que deseja navegar aqui, se necessário */}
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer independent={true}>
      <StackNaigator />
      {/*<Tab.Navigator initialRouteName="Grupos" tabBarPosition="bottom">

         <Tab.Screen name="Grupos" component={RoomsStack} options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          )
        }} /> 

      </Tab.Navigator>*/}
      <NewRoomButton />
    </NavigationContainer>
  )
}

export default NavigatorComponent;