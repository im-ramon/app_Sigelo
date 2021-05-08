import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';

const AppSatck = createStackNavigator();

function AppRoutes() {
    return (
        <AppSatck.Navigator>
            <AppSatck.Screen name="Home" component={Home} />
        </AppSatck.Navigator>
    );
}

export default AppRoutes;