import react from 'react'
import { StyleSheet } from 'react-native'


export const style = StyleSheet.create({
    textH1: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        marginTop: 30,
    },
    viewTextArea: {
        width: '80%',
    },
    viewText: {
        color: '#dedede',
        textAlign: 'center',
    },
    imgLogo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    containerScrollView: {
        width: '100%',
    },
    areaInput: {
        width: '80%',
        flex: 1,
        alignSelf: 'center'
    },
    btnEnviar: {
        flex: 1,
        alignSelf: 'center'
    },
    piker: {
        backgroundColor: '#121212',
        borderBottomWidth: 3,
        borderBottomColor: '#3C74A6',
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        height: 35,
        marginBottom: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
})