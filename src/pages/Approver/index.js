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


export default function Approver() {

    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)

    useEffect(() => {
        async function listarUsuarios() {
            await firebase.database().ref('tempUsers').on('value', snapshot => {
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
                setLoadingList(false)
            })
        }
        listarUsuarios()

    }, [])

    

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Text style={style.textH1}>Aprovar usuários</Text>
                    
                    {
                        loadingList ?

                        (<ActivityIndicator color="#3C74A6" size={45} />)
                    :
                        users.length == 0 ?
                            (
                                <Text style={{color: '#dedede', fontSize: 20, textAlign: 'center', width: '90%'}}>Não há novos usuários aguardando aprovação.</Text>
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


