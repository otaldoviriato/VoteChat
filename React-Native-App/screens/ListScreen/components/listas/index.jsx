import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ContainerView = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 20px;
  min-height: 300px;
  width: 50%;
`

const Item = ({patriName, patriValue}) => (
  <ContainerView>
    <Text>{patriName}</Text>
    <Text>{patriValue}</Text>
  </ContainerView>
);

const FinancialDataList = () => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const response = await fetch('http://192.168.100.2:8080/buscapatrimonio');
      const data = await response.json();
      setFinancialData(data);
    } catch (error) {
      console.error('Error data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={financialData}
          renderItem={({item}) => <Item patriName={item.tipo} patriValue={item.valor} />}
          numColumns={2}
          keyExtractor={(item, index) => {
            return  index.toString();
          }}
          
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default FinancialDataList;