import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function Conf() {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Configurações</Text>
            </View>

            <View style={styles.main}>
                <Text style={styles.text}>Implentação pendente.</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textVersion}>Versão 1.0.0</Text>
                <Text style={styles.text}>Desenvolvido por Ramon Oliveira</Text>
            </View>

        </View>
    )
}
