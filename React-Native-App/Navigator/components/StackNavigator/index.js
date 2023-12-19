import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign, Fontisto } from '@expo/vector-icons'
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
        title: 'VoteChat',
        headerStyle: {
          backgroundColor: '#295B80',
        },
        headerTintColor: '#EEF8FF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <View className="w-81 h-23 top-26 left-40">
              <MenuHome >
                <Fontisto name="more-v-a" size={18} color="white" />
              </MenuHome>
            </View>
          </View>
        ),
        headerLeft: () => (
          <View style={{ marginRight: 40 }}>

          </View>
        ),
      }} />
      <Stack.Screen name="DetalhesDaSala" component={RoomProfileScreen} options={({ route }) => ({
        title: 'Vote Chat',
        headerStyle: {
          backgroundColor: '#295B80',
        },
        headerTintColor: '#EEF8FF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <MenuRoom data={route.params.data}>
              <Fontisto name="more-v-a" size={18} color="white" />
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