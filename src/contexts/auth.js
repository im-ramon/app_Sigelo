import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadStorage()
    }, [])

    //login
    async function signIn(email, password) {
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).once('value')
                    .then((snapshot) => {
                        let data = {
                            uid,
                            nome: snapshot.val().nome,
                            email: value.user.email
                        };
                        setUser(data);
                        storageUser(data);
                        setLoading(false)
                    })
            })
            .catch((error) => {
                alert(error.code)
            })
    }

    //cadastrar usuário
    async function signUp(email, password, nome) {
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).set({
                    nome
                })
                    .then(() => {
                        let data = {
                            uid,
                            nome,
                            email: value.user.email
                        };
                        setUser(data);
                    })
                    .catch((error) => {
                        alert(error.code)
                    })
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    async function signOut() {
        await firebase.auth().signOut();
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !user, user, loading, signUp, signIn, signOut, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;