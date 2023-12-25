import React from 'react';
import { View, Image, Button, Text, Touchable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
// Import das screens
import Home from '../../../screens/Home'
import RoomHomeScreen from '../../../screens/RoomHome'
import RoomProfile from '../../../screens/RoomProfile'
import ListVotationsScreen from '../../../screens/Votations'
import RoomRequirementsScreen from '../../../screens/RoomRequirements'
import UserProfile from '../../../screens/UserProfile'
import MenuHome from '../../../screens/Home/components/MenuButton'
import MenuRoom from '../../../screens/RoomDetails/components/menuButton'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const navigation = useNavigation()

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
      }} />
      <Stack.Screen name="HomeDaSala" component={RoomHomeScreen} options={({ route }) => ({
        title: '',
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
        headerLeft: () => (
          <>
            <Fontisto name="arrow-left" size={18} color="white" onPress={() => navigation.navigate('ListaDeSalas')} />
            <GestureHandlerRootView>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={() => navigation.navigate('PerfilDoGrupo', route )}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 20, marginRight: 10 }}
                  source={require('../../../assets/default-group.jpg')}
                />
                <Text>{route.params.data.name}</Text>
              </TouchableOpacity>
            </GestureHandlerRootView>
          </>
        ),
      })} />
      <Stack.Screen name="ListaDeVotações" component={ListVotationsScreen} options={{ title: 'Votações Pendentes' }} />
      <Stack.Screen name="RequisitosDaSala" component={RoomRequirementsScreen} options={{ title: 'Requisitos para entrar na Sala' }} />
      <Stack.Screen name="PerfilDoUsuario" component={UserProfile} options={{ title: 'Perfil' }} />
      <Stack.Screen name="PerfilDoGrupo" component={RoomProfile} options={{ title: 'Dados do Grupo' }} />
    </Stack.Navigator>
  )
}
export default StackNavigator;