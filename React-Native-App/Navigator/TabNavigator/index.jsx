import React, {useEffect} from 'react';
import { BackHandler, Alert } from 'react-native';
import OpenModalButton  from './components/OpenModalButton';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Importe os componentes de tela que você deseja navegar
import HomeScreen from '../../screens/HomeScreen';
import ListScreen from '../../screens/ListScreen';
import PatrimonyScreen from '../../screens/PatrimonyScreen';

const Tab = createMaterialTopTabNavigator();

function TabNavigatorComponent() {

    useEffect(() => {
      const backAction = () => {
        Alert.alert('Fechar o aplicativo', 'Tem certeza que deseja fechar o aplicativo?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Sim', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    
      return () => backHandler.remove();
    }, []);
    
    return (
      <NavigationContainer independent={true}>     
          <Tab.Navigator initialRouteName="Início" tabBarPosition="bottom">
              <Tab.Screen name="Histórico" component={ListScreen} options={{
              tabBarIcon: ({color}) => (
                  <MaterialIcons name="list" size={24} color={color} />
              ),
              headerStyle: {
                  backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                  fontWeight: 'bold',
              }
              }}/>
  
              <Tab.Screen name="Início" component={HomeScreen} options={{
              tabBarIcon: ({color}) => (
                  <MaterialIcons name="home" size={24} color={color} />
              )
              }}/>
              
              <Tab.Screen name="Patrimônio" component={PatrimonyScreen} options={{
              tabBarIcon: ({color}) => (
                  <MaterialIcons name="attach-money" size={24} color={color} />
              )
              }}/>
          </Tab.Navigator>
        <OpenModalButton />
      </NavigationContainer>
    );
  };

  export default TabNavigatorComponent;