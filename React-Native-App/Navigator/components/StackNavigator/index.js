import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

// Import das screens
import ListRoomsScreen from '../../../screens/Home'
import RoomDetailsScreen from '../../../screens/RoomDetails'
import ListPendingScreen from '../../../screens/Pending'
import RoomRequirementsScreen from '../../../screens/RoomRequirements'
import UserProfile from '../../../screens/Home/components/UserProfile'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const navigation = useNavigation();

  const openConfig = () => {
    navigation.navigate('PerfilDoUsuario')
  }

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
            <TouchableOpacity onPress={openConfig} >
              <AntDesign name="bars" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="DetalhesDaSala" component={RoomDetailsScreen} options={{ title: 'Grupo X' }} />
      <Stack.Screen name="ListaDePendentes" component={ListPendingScreen} options={{ title: 'Pendentes' }} />
      <Stack.Screen name="RequisitosDaSala" component={RoomRequirementsScreen} options={{ title: 'Requisitos para entrar na Sala' }} />
      <Stack.Screen name="PerfilDoUsuario" component={UserProfile} options={{ title: 'Perfil' }} />
      {/* Adicione outras telas que deseja navegar aqui, se necessário */}
    </Stack.Navigator>
  )
}

export default StackNavigator;