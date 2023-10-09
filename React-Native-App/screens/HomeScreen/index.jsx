import  PieChartComponent  from './components/graficos';
import { StyleSheet, View } from 'react-native';

export default function App() {
  
  return (
    <View style={styles.container}>
      <PieChartComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
