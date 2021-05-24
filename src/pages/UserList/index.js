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


export default function UserList() {

    const navigation = useNavigation();

    //dados do formulário: 
    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)

    const { setLoading } = useContext(AuthContext)
    const { pageName, today, setPageName, setToday } = useContext(AppContext);


    useEffect(() => {
        async function listarUsuarios() {
            await firebase.database().ref('veiculos').on('value', snapshot => {
                let arrayVeiculos = []
                setUsers([])
                snapshot.forEach(itens => {
                    let data = {
                        key: itens.key,
                        cor: itens.val().cor,
                        documentoIdentidade: itens.val().documentoIdentidade,
                        modelo: itens.val().modelo,
                        nomeCompleto: itens.val().nomeCompleto,
                        nomeGuerra: itens.val().nomeGuerra,
                        observacoes: itens.val().observacoes,
                        placa: itens.val().placa,
                        postGrad: itens.val().postGrad,
                        tipoAcesso: itens.val().tipoAcesso,
                        validade: itens.val().validade,
                    }

                    arrayVeiculos.push(data)

                })
                arrayVeiculos = arrayVeiculos.sort((a, b) => a.postGrad - b.postGrad)
                setUsers(arrayVeiculos)
                setLoadingList(false)
            })
        }

        listarUsuarios()
    }, [])


    return (
            <Background>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                    <Container>
                        
                        <Text style={style.textH1}>{pageName}</Text>

                        {loadingList ?

                            (<ActivityIndicator color="#3C74A6" size={45} />)

                            : (
                                <FlatList
                                    keyExtractor={item => item.key}
                                    data={users}
                                    renderItem={({ item }) => (<Lista data={item} />)}
                                />

                            )}

                    </Container>
                </ImageBackground>
            </Background>
    );
}


