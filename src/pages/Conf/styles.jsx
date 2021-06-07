import { StyleSheet } from 'react-native'
import cores from '../../styles/colors'

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: cores.color1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    header: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    textHeader: {
        fontSize: 24,
        color: cores.light,
        borderBottomColor: cores.color5,
        borderBottomWidth: 3,
        borderRadius: 10,
        marginBottom: 15,
    },
    main: {
        flex: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        color: cores.light,
    },  
    textVersion: {
        color: `${cores.light}30`,
    }, 
    viewGit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textGit: {
        color: `${cores.light}30`,
        fontSize: 18,
    },
    themeArea: {
        height: '25%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeAreaBtn:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeBtn: {
        width: '45%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 5,
        marginVertical: 10,
        marginHorizontal: 10,
    }
})


export default styles