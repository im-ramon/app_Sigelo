import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ScannerQR from '../pages/ScannerQR';
import Conf from '../pages/Conf';

const AppSatck = createStackNavigator();

function AppRoutes() {
    return (
        <AppSatck.Navigator>
            <AppSatck.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AppSatck.Screen
                name="ScannerQR"
                component={ScannerQR}
                options={{
                    headerShown: true,
                    title: 'Pesquisar dados do selo',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff'
                }} />
                
                <AppSatck.Screen
                name="Conf"
                component={Conf}
                options={{
                    headerShown: true,
                    title: 'Pesquisar dados do selo',
                    headerStyle: {
                        backgroundColor: '#121212',
                        borderBottomColor: '#F27405',
                        borderBottomWidth: 2
                    },
                    headerTintColor: '#fff'
                }} />
        </AppSatck.Navigator>
    );
}

export default AppRoutes;