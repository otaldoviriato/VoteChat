import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons'
// Import das screens
import Home from '../../../screens/Home'
import RoomProfileScreen from '../../../screens/RoomProfile'
import ListVotationsScreen from '../../../screens/Votations'
import RoomRequirementsScreen from '../../../screens/RoomRequirements'
import UserProfile from '../../../screens/UserProfile'
import MenuHome from '../../../screens/Home/components/MenuButton'
import MenuRoom from '../../../screens/RoomDetails/components/menuButton'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaDeSalas" component={Home} options={{
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
            <MenuHome >
              <AntDesign name="bars" size={24} color="white" />
            </MenuHome>
          </View>
        ),
      }} />
      <Stack.Screen name="DetalhesDaSala" component={RoomProfileScreen} options={({ route }) => ({
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
            {/* Passe a prop 'data' para o componente MenuRoom */}
            <MenuRoom data={route.params.data}>
              <AntDesign name="bars" size={24} color="white" />
            </MenuRoom>
          </View>
        ),
      })} />
      <Stack.Screen name="ListaDeVotações" component={ListVotationsScreen} options={{ title: 'Votações Pendentes' }} />
      <Stack.Screen name="RequisitosDaSala" component={RoomRequirementsScreen} options={{ title: 'Requisitos para entrar na Sala' }} />
      <Stack.Screen name="PerfilDoUsuario" component={UserProfile} options={{ title: 'Perfil' }} />
      {/* Adicione outras telas que deseja navegar aqui, se necessário */}
    </Stack.Navigator>
  )
}
export default StackNavigator;