import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'

function Routes() {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#121212" />
        </View>
    }

    return (
        signed ? <AuthRoutes /> : <AppRoutes />
    );
}

export default Routes;