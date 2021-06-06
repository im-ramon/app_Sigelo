import { StyleSheet } from 'react-native'
import minhascores from '../../styles/colors'

export const style = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    area1: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    area2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6,
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
    }
})