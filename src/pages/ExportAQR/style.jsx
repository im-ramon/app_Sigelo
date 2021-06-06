import { StyleSheet } from 'react-native'
import minhascores from '../../styles/colors'

export const style = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    area1: {
        backgroundColor: minhascores.color1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    area2: {
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 4,
        paddingTop: 15,
    },
    header: {
        height: 40,
        fontSize: 24,
        color: minhascores.light,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 25,
        borderBottomWidth: 3,
        borderBottomColor: '#F27405',
        paddingHorizontal: 10,
    },
    flatList: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    btnImprimir: {
        width: '80%',
        height: 50,
        marginVertical: 20,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: minhascores.color3,
    },
    btnImprimirText: {
        color: minhascores.light,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    btnIcons: {
        color: minhascores.light,
        marginHorizontal: 5,
    },
    qrCodeArea: {
        width: 350,
        height: 400,
        borderColor: '#00000020',
        borderWidth: 3,
        marginTop: 5,
        alignItems: 'center'
    },
    qrCodeImage: {
        width: '80%',
        height: '80%',
    },
    informationArea: {
        backgroundColor: '#00000010',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center'
    },
    informationText: {
        fontSize: 16
    },
})