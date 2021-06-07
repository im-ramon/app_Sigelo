import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});

function AppContextProvider({ children }) {

    const [pageName, setPageName] = useState('buscando...')
    const [today, setToday] = useState(new Date())
    const [background, setBackground] = useState(require('../assets/background.jpg'))
    // background-light.jpg

    return (
        <AppContext.Provider value={{pageName, today, background, setPageName, setToday, setBackground}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;