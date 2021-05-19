import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, cores } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

    const navigation = useNavigation();

    const { signOut, user } = useContext(AuthContext);

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={style.bodyBackground}>
                <View style={style.root}>
                    <View style={style.menu}>
                        <TouchableOpacity style={style.menu_item} onPress={() => signOut()}>
                            <Ionicons name="exit-sharp" size={40} color={cores.color5} style={{ transform: [{ rotate: "180deg" }] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.menu_item} onPress={ () => {navigation.navigate('Conf')}}>
                            <Ionicons name="settings-sharp" size={40} color={cores.color5} />
                        </TouchableOpacity>
                    </View>

                    <Text style={style.textWelcome}>Bem vindo, {user.nome}!</Text>
                    
                    <Text style={style.text_menu}>MENU</Text>
                    <View style={style.section}>
                        <TouchableOpacity style={style.section_btn} onPress={ () => {navigation.navigate('ScannerQR')}}>
                            <Ionicons name="camera-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Abrir scanner</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn}>
                            <Ionicons name="checkmark-circle-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Cadastros Ativos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn}>
                            <Ionicons name="warning-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Verificar pendências</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn} onPress={ () => {navigation.navigate('Register')}}>
                            <Ionicons name="add-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Cadastrar veículos</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        </Background>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: 30,
    },
    menu: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
    },
    section: {
        flex: 10,
        backgroundColor: '#e1e1e105',
        width: '100%',
        borderTopColor: `${cores.color5}`,
        borderTopWidth: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },

    bodyBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textWelcome: {
        flex: 1,
        color: `${cores.color7}`,
        fontSize: 26,
    },
    text_menu: {
        fontSize: 20,
        color: `${cores.color7}`,
        transform: [{ translateY: 20 }],
        zIndex: 1,
        backgroundColor: `${cores.color3}`,
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        fontWeight: '900',
    },
    section_btn: {
        borderColor: `${cores.color3}10`,
        borderWidth: 5,
        marginBottom: 30,
        backgroundColor: `${cores.color1}`,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section_btn_text: {
        color: `${cores.color7}`,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '100',
    }
});