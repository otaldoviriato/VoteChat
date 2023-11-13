import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
  <Tab.Navigator initialRouteName="Grupos" tabBarPosition="bottom">

    <Tab.Screen name="Grupos" component={RoomsStack} options={{
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="home" size={24} color={color} />
      )
    }} />

  </Tab.Navigator>
  );
}

export default TabNavigator;