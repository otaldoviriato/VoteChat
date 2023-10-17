import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LoginComponent from './components/login-form';
import SignInComponent from './components/register-form';


const LoginScreenComponent = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
                style={styles.tinyLogo}
                source={require('../../assets/logo-lamp.png')}
            />
        </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'login' ? styles.activeTab : null,
          ]}
          onPress={() => handleTabPress('login')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'login' ? styles.activeTabText : null,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'cadastro' ? styles.activeTab : null,
          ]}
          onPress={() => handleTabPress('cadastro')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'cadastro' ? styles.activeTabText : null,
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 'login' ? (
          <LoginComponent />
        ) : (
          <SignInComponent />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "white",
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  activeTab: {
    color: '#3117EB',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  activeTabText: {
    color: '#3117EB',
    borderColor: "#3117EB",
    borderBottomWidth: 3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
  },
  tinyLogo: {
    width: 120,
    height: 160,
  },
});

export default LoginScreenComponent;