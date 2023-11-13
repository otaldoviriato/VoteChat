import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListRoomsScreen from '../../../screens/Home'
import RoomDetailsScreen from '../../../screens/RoomDetails'
import ListPendingScreen from '../../../screens/Pending'
import RoomRequirementsScreen from '../../../screens/RoomRequirementsScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="ListaDeSalas" component={ListRoomsScreen} options={{
          title: 'Vote Chat',
          headerStyle: {
            backgroundColor: '#1B96F6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
          <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{title: 'Grupo X'}} />
          <Stack.Screen name="ListaDePendentes" component={ListPendingScreen} options={{title: 'Pendentes'}} />
          <Stack.Screen name="RequisitosDaSala" component={RoomRequirementsScreen} options={{title: 'Requisitos para entrar na Sala'}} />
          {/* Adicione outras telas que deseja navegar aqui, se necessário */}
        </Stack.Navigator>
      )
}

export default StackNavigator;