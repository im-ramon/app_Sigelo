//Adicionar StatusBar
import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import firebase from './src/services/firebaseConnection';

import Routes from './src/routes/index';

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function App() {
  return (
    <NavigationContainer style={{ marginTop: 150 }}>
      <ImageBackground source={image} style={styles.image}>

        <Routes />
      
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
