import React, { useEffect } from 'react'
import { View, StyleSheet, BackHandler, Alert, Button } from 'react-native'
import RoomsList from './components/RoomsList'
import NewRoomButton from './components/NewRoomButton'
import { useNavigation } from '@react-navigation/native'
import CreateRoomLink from './components/CreateRoomLink'
import Temporary from './components/temporary'
import RegisterForm from '../Login/components/register-form'
import Logout from './components/logout'


export default function ListRoomsScreen() {
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

  const navigation = useNavigation() // Obtenha o objeto de navegação usando o hook useNavigation

  const handlePress = () => {
    // Navegue para a tela desejada quando o item for pressionado
    navigation.navigate('RequisitosDaSala')}

  return (
  <>
    <View style={styles.container}>
      <RoomsList />
      <Logout/>
      <NewRoomButton />
      <CreateRoomLink/>
      <Temporary/>
      <Button onPress={handlePress} title='ver requisitos'/>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
})