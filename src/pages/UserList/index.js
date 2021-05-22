import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import firebase from '../../services/firebaseConnection'
import Lista from './Lista'
import { AuthContext } from '../../contexts/auth';

export default function UserList() {

    const navigation = useNavigation();

    //dados do formulário: 
    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)

    const [modalActive, setModalActive] = useState(false)

    const { setLoading } = useContext(AuthContext)


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
                        {/* <Image style={style.imgLogo} source={require('../../assets/logo-1.png')} /> */}

                        <Text style={style.textH1}>Cadastros ativos</Text>

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

                {/* //Modal de edição */}
                <Modal animationType="slide" visible={modalActive} >
                    <View style={stylesModal.modalContainer}>

                        <View style={stylesModal.header}>
                            <TouchableOpacity onPress={() => { setModalActive(false) }}>
                                <Ionicons name="close-circle-sharp" size={32} color="#F27405" />
                            </TouchableOpacity>
                        </View>


                        <View style={stylesModal.modalBody}>

                            <Text>TESTE</Text>

                        </View>

                    </View>
                </Modal>
            </Background>
    );
}


const stylesModal = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#141414',
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginTop: 10,
        backgroundColor: '#141414',
        flexDirection: 'row'
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 12,
    },
})
