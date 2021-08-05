import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import styles from './styles'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../../contexts/appContexts'
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth'

export default function Conf() {

    const { background, setBackground } = useContext(AppContext);

    const { user } = useContext(AuthContext);

    // const setLightMode = () => {
    //     setBackground(require('../../assets/background-light.jpg'))
    //     styles.text.color = '#000'
    // }

    // const setDarkMode = () => {
    //     setBackground(require('../../assets/background.jpg'))
    //     styles.text.color = '#fff'
    // }

    // useEffect(() => {
    //     Alert.alert(
    //         `Em construção...`,
    //         `Esta página ainda está em desenvolvimento.\n\nPor ora, as funcionalidades que serão implantadas nesta página ainda estão instáveis ou incompletas, portanto, estão apenas listadas e serão implantadas futuramente.`,
    //         [
    //             { text: "Entendi", onPress: () => {} }
    //         ],
    //         { cancelable: false }
    //     );
    // }, []);

    return (
        <ImageBackground source={background} style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Configurações</Text>
            </View>

            <View style={styles.main}>
                <Text style={styles.text}>Págima em desenvolvimento...</Text>
                {/* <View style={{ borderColor: 'white', borderWidth: 1, padding: 10, marginBottom: 50, width: '80%' }}>
                    <Text style={{ ...styles.text, fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Dados do usuário logado:</Text>
                    <Text style={{ ...styles.text, fontSize: 16, textAlign: 'left' }}> - Nome: {user.nome}</Text>
                    <Text style={{ ...styles.text, fontSize: 16, textAlign: 'left' }}> - E-mail: {user.email}</Text>
                    <Text style={{ ...styles.text, fontSize: 16, textAlign: 'left' }}> - Id: {user.uid.slice(0, 8)}...</Text>
                </View>

                <View style={{ borderColor: 'white', borderWidth: 1, padding: 10, width: '80%' }}>
                    <Text style={{ ...styles.text, fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Pendências:</Text>
                    <Text style={styles.text}>1. Alteração de senha</Text>
                    <Text style={styles.text}>2. Alteração do email</Text>
                    <Text style={styles.text}>3. Escolha entre os temas Dark e Light</Text>
                    <Text style={styles.text}>4. Excluir minha conta</Text>
                </View>


                <View style={styles.themeArea}>
                    <Text style={{ ...styles.text, fontSize: 18 }}>Tema (Em implementação)</Text>

                    <View style={styles.themeAreaBtn}>
                        <TouchableOpacity style={{ ...styles.themeBtn, backgroundColor: '#ffffff', borderColor: '#00000020', }} onPress={() => { setLightMode() }}>
                            <FontAwesome name="sun-o" size={24} color="#121212" />
                            <Text style={{ color: '#121212', fontSize: 28, textTransform: 'uppercase', marginLeft: 15 }}>Light</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...styles.themeBtn, backgroundColor: '#121212', borderColor: '#ffffff10' }} onPress={() => { setDarkMode() }}>
                            <FontAwesome name="moon-o" size={24} color="white" />
                            <Text style={{ color: '#fff', fontSize: 28, textTransform: 'uppercase', marginLeft: 15 }}>Dark</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text>Alterar senha</Text> */}
            </View>


            <View style={styles.footer}>
                <Text style={styles.textVersion}>Versão 1.2.2</Text>
                <Text style={styles.textVersion}>Desenvolvido por Ramon Oliveira</Text>
                <View style={styles.viewGit}><AntDesign name="github" size={22} color="#ffffff50" /><Text style={styles.textGit}> /im-ramon</Text></View>
            </View>
        </ImageBackground>
    )
}