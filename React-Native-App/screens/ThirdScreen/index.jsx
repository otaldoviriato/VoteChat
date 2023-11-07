import { View , StyleSheet} from 'react-native';
import ValueComponent from './components/patrimony-value';

export default function App() {
  
  return (
    <View style={styles.container}>
        <ValueComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});