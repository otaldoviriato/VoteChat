import { View, StyleSheet, Button } from 'react-native'
import ListaPendentes from './components/ListaPendentes'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Pendentes() {
  const navigation = useNavigation()
  const route = useRoute()

  // Acesse as props da rota
  const { data } = route.params

  return (
  <>
    <View style={styles.container}>
      <ListaPendentes data={data}/>
      <Button
              title="Voltar"
              onPress={() => navigation.goBack()}
          />
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