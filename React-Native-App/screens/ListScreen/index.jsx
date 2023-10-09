import { View, StyleSheet } from 'react-native';
import  FinancialDataList  from './components/listas'

export default function App() {
  
  return (
    <View style={styles.container}>
        <FinancialDataList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
  },
});