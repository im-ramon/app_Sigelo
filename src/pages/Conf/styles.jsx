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
        fontSize: 22,
        color: cores.light,
        borderBottomColor: cores.color5,
        borderBottomWidth: 3,
        borderRadius: 10
    },
    main: {
        flex: 6,
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
})


export default styles