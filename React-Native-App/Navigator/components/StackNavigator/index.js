import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons'

// Import das screens
import ListRoomsScreen from '../../../screens/Home'
import RoomDetailsScreen from '../../../screens/RoomDetails'
import ListVotationsScreen from '../../../screens/Votations'
import RoomRequirementsScreen from '../../../screens/RoomRequirements'
import UserProfile from '../../../screens/UserProfile'
import MenuBtn from '../../../screens/Home/components/MenuButton';

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
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <MenuBtn >
              <AntDesign name="bars" size={24} color="white" />
            </MenuBtn>
          </View>
        ),
      }} />
      <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{ title: 'Grupo X' }} />
      <Stack.Screen name="ListaDeVotações" component={ListVotationsScreen} options={{ title: 'Votações Pendentes' }} />
      <Stack.Screen name="RequisitosDaSala" component={RoomRequirementsScreen} options={{ title: 'Requisitos para entrar na Sala' }} />
      <Stack.Screen name="PerfilDoUsuario" component={UserProfile} options={{ title: 'Perfil' }} />
      {/* Adicione outras telas que deseja navegar aqui, se necessário */}
    </Stack.Navigator>
  )
}

export default StackNavigator;