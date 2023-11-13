import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListRoomsScreen from '../../../screens/Home'
import RoomDetailsScreen from '../../../screens/RoomDetails'
import ListPendingScreen from '../../../screens/Pending'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="ListaDeSalas" component={ListRoomsScreen} options={{title: 'Minhas Salas'}} />
          <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{title: 'Grupo X'}} />
          <Stack.Screen name="ListaDePendentes" component={ListPendingScreen} options={{title: 'Pendentes'}} />
          {/* Adicione outras telas que deseja navegar aqui, se necessário */}
        </Stack.Navigator>
      )
}

export default StackNavigator;