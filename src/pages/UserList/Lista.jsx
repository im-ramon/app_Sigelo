import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { cores, arrayPostGrad } from '../Register/listas'
import { AntDesign } from '@expo/vector-icons';


export default function Lista({ data }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> {`${data.modelo} - ${data.placa.toUpperCase()}`} </Text>

            <View style={styles.sectionDadosCarro}>
                <Text style={styles.textDestaque}>Titular: <Text style={styles.textSimples}>{arrayPostGrad[data.postGrad].pg} {data.nomeGuerra}</Text></Text>
                <Text style={styles.textDestaque}>Nome completo: <Text style={styles.textSimples}>{data.nomeCompleto}</Text></Text>
                <Text style={styles.textDestaque}>Identidade: <Text style={styles.textSimples}>{data.documentoIdentidade}</Text></Text>
                <Text style={styles.textDestaque}>Cor do veículo: <Text style={styles.textSimples}>{cores[data.cor].cor}</Text></Text>
                <Text style={styles.textDestaque}>Validade do selo: <Text style={styles.textSimples}>{data.validade}</Text></Text>
                <Text style={styles.textDestaque}>Áreas de acesso permitido: <Text style={styles.textSimples}>{data.tipoAcesso}</Text></Text>
                <Text style={styles.textDestaque}>Observações: <Text style={styles.textSimples}>{data.observacoes}</Text></Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnEdit}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnDelete}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#3C74A6',
        backgroundColor: '#121212',
        width: 350,
        marginTop: 20,
        marginBottom: 80,
        zIndex: 2,
    },
    header: {
        borderWidth: 3,
        borderColor: '#F27405',
        transform: [{ translateY: -15 }],
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        paddingVertical: 3,
        backgroundColor: '#121212',
        marginHorizontal: 30
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
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#121212'
    },
    btnEdit: {
        backgroundColor: '#28A745',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3,
    },
    btnDelete: {
        backgroundColor: '#DC3545',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3,
    },
    footer: {
        borderWidth: 5,
        borderColor: '#121212',
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        backgroundColor: '#3C74A6',
        position: 'absolute',
        bottom: '-25%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
})