import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importe os componentes de tela que você deseja navegar
import ListRoomsScreen from '../screens/ListRoomsScreen'
import RoomDetailsScreen from '../screens/RoomDetailsScreen'
import ListPendingScreen from '../screens/ListPendingScreen'


const Tab = createMaterialTopTabNavigator();

function NavigatorComponent() {

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