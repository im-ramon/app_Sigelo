import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ScannerQR from '../pages/ScannerQR';
import Conf from '../pages/Conf';
import Register from '../pages/Register';
import UserList from '../pages/UserList';

const AppSatck = createStackNavigator();

function AppRoutes() {
    
const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
    return (
        <AppSatck.Navigator>
            <AppSatck.Screen name="Home" component={Home} options={{ headerShown: false }} />

            <AppSatck.Screen
                name="ScannerQR"
                component={ScannerQR}
                options={{
                    headerShown: true,
                    title: 'Voltar',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff'
                }}
            />

            <AppSatck.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: true,
                    title: 'Voltar',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff',
                    transitionSpec: {
                        open: config,
                        close: config,
                      },
                }}
            />

            <AppSatck.Screen
                name="UserList"
                component={UserList}
                options={{
                    headerShown: true,
                    title: 'Voltar',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff'
                }}
            />

            <AppSatck.Screen
                name="Conf"
                component={Conf}
                options={{
                    headerShown: true,
                    title: 'Voltar',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff'
                }}
            />
        </AppSatck.Navigator>
    );
}

export default AppRoutes;