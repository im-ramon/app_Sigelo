import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import firebase from '../../services/firebaseConnection'
import Lista from './Lista'
import { AuthContext } from '../../contexts/auth';
import { AppContext } from '../../contexts/appContexts';


export default function Profiles() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function listarUsuarios() {
            await firebase.database().ref('users').on('value', snapshot => {
                let arrayUsers = []
                setUsers([])
                snapshot.forEach(itens => {
                    let data = {
                        key: itens.key,
                        email: itens.val().email,
                        nome: itens.val().nome,
                        tipoUser: itens.val().tipoUser,
                        sobrenome: itens.val().sobrenome,
                    }
                    arrayUsers.push(data)
                })
                setUsers(arrayUsers)
            })
        }

        listarUsuarios()
    }, [])


    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Text style={style.textH1}>Gerenciar usuários</Text>
                    {
                        users.length == 0 ?
                            (
                                <Text style={{color: '#dedede', fontSize: 20, textAlign: 'center'}}>Não há usuários aguardando aprovação.</Text>
                            )
                            :
                            (
                                <FlatList
                                    keyExtractor={item => item.key}
                                    data={users}
                                    renderItem={({ item }) => (<Lista data={item} />)}
                                />
                            )
                    }
                </Container>
            </ImageBackground>
        </Background>
    );
}


