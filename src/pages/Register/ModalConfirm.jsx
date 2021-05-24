import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import cores from '../../styles/colors'

export default function ModalConfirm() {

    const [modalActive, setModalActive] = useState(true)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalActive}
            style={styles.modalContainer}
        >
            <View style={styles.viewBody}>
                <TouchableOpacity style={styles.btnClose} onPress={() => { setModalActive(false) }}>
                    <AntDesign name="close" size={24} color="#F27405" />
                </TouchableOpacity>

                <Text style={styles.modalText}>
                    <AntDesign name="check" size={24} color={cores.success} style={styles.btnCheck} />
                    <Text>Dados inseridos com sucesso!</Text>
                </Text>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    viewBody: {
        backgroundColor: '#121212',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        marginVertical: '78%',
        borderColor: `${cores.success}`,
        borderWidth: 2,
        flexDirection: 'row'
    },
    btnClose: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    btnCheck: {
        marginRight: 100,
    },
    modalText: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginBottom: 40,
        marginLeft: 10,
        borderTopWidth: 2,
    }
})
