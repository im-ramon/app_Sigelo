import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'; 

export default function Conf() {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Configurações</Text>
            </View>

            <View style={styles.main}>
                <Text style={styles.text}>Implementação pendente.</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textVersion}>Versão 1.0.0</Text>
                <Text style={styles.textVersion}>Desenvolvido por Ramon Oliveira</Text>
                <View style={styles.viewGit}><AntDesign name="github" size={22} color="#ffffff50" /><Text style={styles.textGit}> /im-ramon</Text></View>
            </View>

        </View>
    )
}
