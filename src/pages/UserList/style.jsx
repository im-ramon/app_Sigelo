import react from 'react'
import { StyleSheet } from 'react-native'
import minhasCores from '../../styles/colors'


export const style = StyleSheet.create({
    textH1: {
        fontSize: 28,
        color: '#ffffff',
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 25,
        borderBottomWidth: 3,
        borderBottomColor: '#F27405',
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    viewTextArea: {
        width: '80%',
    },
    viewText: {
        color: '#dedede',
        textAlign: 'center',
    },
    searchArea: {
        backgroundColor: minhasCores.color1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        flexDirection: 'row',
        borderTopColor: minhasCores.color5,
        borderWidth: 5,
    },
    btnSearch:{
        backgroundColor: minhasCores.color1,
        height: '100%',
        width: '18%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    }, 
    inputSearch: {
        backgroundColor: minhasCores.color1,
        width: '80%',
        height: '100%',
        fontSize: 16,
        color: minhasCores.light,
        paddingLeft: 5,
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
        backgroundColor: '#00000050',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '80%',
        height: 40,
        marginBottom: 23,
        borderBottomColor: minhasCores.color3,
        borderBottomWidth: 3,
        paddingBottom: 5,
        paddingTop: 5,
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
        borderBottomColor:  minhasCores.color3,
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        height: 40,
        marginBottom: 20,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingRight: 8,
    },
})