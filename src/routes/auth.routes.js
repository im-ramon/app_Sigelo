import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingIn from '../pages/SingIn';

const AuthSatck = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthSatck.Navigator>
            <AuthSatck.Screen
            name="SingIn"
            component={SingIn}
            options={{headerShown: false}}
            />
        </AuthSatck.Navigator>
    );
}

export default AuthRoutes;