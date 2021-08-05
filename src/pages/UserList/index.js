import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import firebase from '../../services/firebaseConnection'
import Lista from './Lista'
import { AuthContext } from '../../contexts/auth';
import { AppContext } from '../../contexts/appContexts';
import minhasCores from '../../styles/colors'

export default function UserList() {

    const navigation = useNavigation();
    const [search, setSearch] = useState(null)

    //dados do formulário: 
    const [totalUsers, setTotalUsers] = useState([])
    const [filterUsers, setFilterUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)

    const { setLoading } = useContext(AuthContext)
    const { pageName, today, setPageName, setToday } = useContext(AppContext);

    async function listarUsuarios() {
        await firebase.database().ref('veiculos').on('value', snapshot => {
            let arrayVeiculos = []
            setTotalUsers([])
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
            setTotalUsers(arrayVeiculos)
            setFilterUsers(arrayVeiculos)
        })
    }

    useEffect(() => {
        listarUsuarios()
            .then(setLoadingList(false))
    }, [])

    useEffect(() => {
        search === '' ? setFilterUsers(totalUsers) : search != null && setFilterUsers(totalUsers.filter(item => item.nomeCompleto.toLowerCase().indexOf(search.toLowerCase()) > - 1 || item.placa.toLowerCase().indexOf(search.toLowerCase()) > - 1 ))
    }, [search])


    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <View style={style.searchArea}>
                    <TouchableOpacity style={style.btnSearch}>
                        <FontAwesome name="search" size={32} color={minhasCores.color5} />
                    </TouchableOpacity>

                    <TextInput
                        style={style.inputSearch}
                        value={search}
                        placeholder="Digite nome ou placa"
                        placeholderTextColor="#ffffff30"
                        onChangeText={(text) => { setSearch(text) }}
                        autoCapitalize='none'
                    />
                </View>
                <Container>

                    <Text style={style.textH1}>{pageName}</Text>

                    {loadingList ?

                        (<ActivityIndicator color="#3C74A6" size={45} />)

                        : (
                            <FlatList
                                keyExtractor={item => item.key}
                                data={filterUsers}
                                renderItem={({ item }) => (<Lista data={item} />)}
                            />

                        )}

                </Container>
            </ImageBackground>
        </Background>
    );
}


