import react from 'react'
import { StyleSheet } from 'react-native'


export const style = StyleSheet.create({
    textH1: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        marginTop: 30,
        borderBottomWidth: 3,
        borderBottomColor: '#F27405',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10
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
    datePiker: {
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        width: '80%',
        height: 35,
        marginBottom: 23,
        borderBottomColor:'#3C74A6',
        borderBottomWidth: 3,
        paddingBottom: 5,
        alignItems: 'center'
    },
    btnEnviar: {
        flex: 1,
        alignSelf: 'center',
        marginBottom: 50,
    },
    piker: {
        backgroundColor: '#00000050',
        borderBottomWidth: 3,
        borderBottomColor: '#3C74A6',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        height: 40,
        marginBottom: 20,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
    },
})