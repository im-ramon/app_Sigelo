import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});

function AppContextProvider({ children }) {

    const [pageName, setPageName] = useState('buscando...')
    const [today, setToday] = useState(new Date())

    return (
        <AppContext.Provider value={{pageName, today, setPageName, setToday}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;