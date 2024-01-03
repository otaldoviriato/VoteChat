import { View, StyleSheet, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import VotationsList from './components/votationsList'
import { backgroundColor, backgroundDraft } from '../../styles'
import { ImageBackground } from 'react-native'

export default function Pendentes() {
  const navigation = useNavigation()
  const route = useRoute()

  // Acesse as props da rota
  const data = route.params

  return (
    <>
      <View style={backgroundColor}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={backgroundDraft}>
            <VotationsList id_sala={data.id_sala} />
        </ImageBackground>
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