import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './styles'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../../contexts/appContexts'

export default function Conf() {

    const { background, setBackground } = useContext(AppContext);

    const setLightMode = () => {
        setBackground(require('../../assets/background-light.jpg'))
        styles.text.color = '#000'
    }
    
    const setDarkMode = () => {
        setBackground(require('../../assets/background.jpg'))
        styles.text.color = '#fff'
    }

    return (
        <ImageBackground source={background} style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Configurações</Text>
                <Text style={styles.text}>Págima em desenvolvimento</Text>
            </View>

            <View style={styles.main}>

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
            </View>


            <View style={styles.footer}>
                <Text style={styles.textVersion}>Versão 1.0.0</Text>
                <Text style={styles.textVersion}>Desenvolvido por Ramon Oliveira</Text>
                <View style={styles.viewGit}><AntDesign name="github" size={22} color="#ffffff50" /><Text style={styles.textGit}> /im-ramon</Text></View>
            </View>
        </ImageBackground>
    )
}