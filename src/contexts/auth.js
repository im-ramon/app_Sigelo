import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    function cathError(error) {
        Alert.alert(
            `Ocorreu um erro.`,
            `Verifique os dados digitados e tente novamente.\n\nDescrição do erro:${error}`,
            [
                { text: "Verificar", onPress: () => console.log('erro') }
            ],
            { cancelable: false }
        );
    }

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
    async function signIn(email, password, keepConnected) {
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).once('value')
                    .then((snapshot) => {
                        let data = {
                            uid,
                            nome: snapshot.val().nome,
                            sobrenome: snapshot.val().sobrenome,
                            tipoUser: snapshot.val().tipoUser,
                            email: value.user.email,
                        };
                        setUser(data);
                        keepConnected && storageUser(data)
                        setLoading(false)
                    })
            })
            .catch((error) => {
                cathError(error)
                setLoading(false)
            })
    }

    //cadastrar usuário
    async function signUp(email, password, nome, sobrenome, tipoUser) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('tempUsers').child(uid).set({
                    email, nome, sobrenome, tipoUser
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