import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import firebase from './src/services/firebaseConnection';

import AuthProvider from './src/contexts/auth';
import Routes from './src/routes/index';

export default function App() {

  return (
    <NavigationContainer style={{ marginTop: 150 }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar style="inverted" />
    </NavigationContainer>
  );
}