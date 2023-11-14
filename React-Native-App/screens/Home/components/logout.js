import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../../context/authContext'

const Logout = () => {
  const { setUser, user } = useContext(AuthContext)
  async function deslogar () {
    await AsyncStorage.removeItem('user1')
    setUser(null)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={deslogar} style={styles.button}>
        <Text>Deslogar</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 30,
    bottom: 100,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edc618',
    borderRadius: 100,
  },
});
export default Logout;