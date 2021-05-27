import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { cores, arrayPostGrad } from '../Register/listas'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Picker } from '@react-native-picker/picker'
import { style } from './style'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../services/firebaseConnection';
import { AppContext } from '../../contexts/appContexts';
import minhascores from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient';

export default function Lista({ data }) {

    const [key, setKey] = useState(data.key)
    const [email, setEmail] = useState(data.email)
    const [nome, setNome] = useState(data.nome)
    const [sobrenome, setSobrenome] = useState(data.sobrenome)
    const [tipoUser, setTipoUser] = useState(data.tipoUser)

    function myAlert(type, key, email, nome, sobrenome, tipoUser) {

        if (type == 'insert') {
            Alert.alert(
                "Atenção",
                `Ao confirmar, você estará concedendo ao usuário acesso ao aplicativo. \n\nDeseja continuar?`,
                [
                    {
                        text: "Voltar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => aproverOnFirebase(key, email, nome, sobrenome, tipoUser) }
                ],
                { cancelable: false }
            );
            return;
        }

        if (type == 'delete') {
            Alert.alert(
                "Atenção",
                `Ao confirmar, você estará rejeitando a solicitação de acesso ao aplicativo. \n\nDeseja continuar?`,
                [
                    {
                        text: "Voltar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => deleteOnFirebase(key) }
                ],
                { cancelable: false }
            );
            return;
        }
    }

    async function aproverOnFirebase(key, email, nome, sobrenome, tipoUser) {
        await firebase.database().ref('users').child(key).set({ email, nome, sobrenome, tipoUser }).then(() => {
            deleteOnFirebase(key)
        })
    }

    async function deleteOnFirebase(key) {
        await firebase.database().ref('tempUsers').child(key).remove()
    }

    const perfil = ['_', 'Administrador', 'Operador', 'Fiscalizador']

    return (
        <View style={LocalStyle.container}>
            <View style={LocalStyle.header}>
                <LinearGradient colors={['transparent', '#00000035']} style={LocalStyle.linearGradient} />
                <Text style={LocalStyle.textHeader}>{nome + ' ' + sobrenome}</Text>
            </View>

            <View style={LocalStyle.sectionDadosCarro}>
                <Text style={LocalStyle.textDestaque}>E-mai: <Text style={LocalStyle.textSimples}>{email}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Perfil: <Text style={LocalStyle.textSimples}>{perfil[tipoUser]}</Text></Text>
            </View>

            <View style={LocalStyle.footer}>
                <TouchableOpacity style={LocalStyle.btnEdit} onPress={() => { myAlert('insert', key, email, nome, sobrenome, tipoUser) }}>
                    <LinearGradient colors={['transparent', '#00000050']} style={LocalStyle.linearGradient} />
                    <AntDesign name="check" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={LocalStyle.btnDelete} onPress={() => { myAlert('delete', key) }}>
                    <LinearGradient colors={['transparent', '#00000050']} style={LocalStyle.linearGradient} />
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const LocalStyle = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#3C74A6',
        backgroundColor: `${minhascores.color1}`,
        width: 350,
        marginTop: 20,
        paddingBottom: 60,
        marginBottom: 50,
        zIndex: 2,
    },
    header: {
        borderWidth: 3,
        borderRadius: 15,
        borderColor: minhascores.black,
        transform: [{ translateY: -20 }],
        backgroundColor: minhascores.color5,
        marginHorizontal: 30
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        color: '#dedede',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    textDestaque: {
        color: '#3C74A6',
        fontWeight: 'bold',
        fontSize: 16
    },
    textSimples: {
        color: '#dedede',
        fontWeight: '100',
        fontSize: 14
    },
    sectionDadosCarro: {
        borderRadius: 11,
        paddingHorizontal: 10,
        paddingBottom: 10,
        overflow: 'hidden'
    },
    btnEdit: {
        backgroundColor: minhascores.success,
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderLeftWidth: 3,
        borderWidth: 3, borderRadius: 11,
    },
    btnDelete: {
        backgroundColor: minhascores.danger,
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3, borderRadius: 11,
    },
    footer: {
        flex: 1,
        borderRadius: 10,
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        backgroundColor: minhascores.color1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 10,
        width: "100%",
    }
})

const styleModal = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#141414',
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginTop: 13,
        backgroundColor: '#141414',
        flexDirection: 'row'
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 12,
    },
})
