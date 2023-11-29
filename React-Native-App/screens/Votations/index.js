import { View, StyleSheet, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import VotationsList from './components/votationsList'

export default function Pendentes() {
  const navigation = useNavigation()
  const route = useRoute()

  // Acesse as props da rota
  const { data } = route.params

  return (
    <>
      <View style={styles.container}>
        <VotationsList id_sala={data._id} />
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