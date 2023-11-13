import { View, StyleSheet } from 'react-native'
import RoomsList from './components/RoomsList'

export default function ListRoomsScreen() {

  return (
  <>
    <View style={styles.container}>
      <RoomsList />
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