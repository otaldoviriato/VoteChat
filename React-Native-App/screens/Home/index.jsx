import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, BackHandler, Alert, Button } from 'react-native';
import RoomsList from './components/RoomsList';
import NewRoomButton from './components/NewRoomButton';
import { useNavigation } from '@react-navigation/native'
import Logout from './components/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';

export default function ListRoomsScreen() {
  const { setUser, user } = useContext(AuthContext);
  const [refreshRooms, setRefreshRooms] = useState(false);
  const navigation = useNavigation();

  async function verifyToken() {
    const userToken = await AsyncStorage.getItem('user1');
    setUser(userToken);
  }

  useEffect(() => {
    verifyToken();
  }, []);

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

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  const handlePress = () => {
    navigation.navigate('RequisitosDaSala');
  };

  const handleRoomCreation = () => {
    setRefreshRooms((prev) => !prev);
  };

  return (
    <>
      <View style={styles.container}>
        <RoomsList key={refreshRooms} />
        <Logout />
        <NewRoomButton onRoomCreation={handleRoomCreation} />
        <Button onPress={handlePress} title="ver requisitos" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AD1FB',
  },
});
