import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Background, cores } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { AppContext } from '../../contexts/appContexts'
import { LinearGradient } from 'expo-linear-gradient';
import myCores from '../../styles/colors'

export default function Home() {

    const navigation = useNavigation();

    const { signOut, user, setLoading } = useContext(AuthContext);
    const { setPageName, setToday } = useContext(AppContext);


    const navigateTo = (pageType) => {
        pageType === 'all' ? setPageName('Cadastros ativos') : setPageName('Cadastros vencidos')

        setToday(new Date())
        navigation.navigate('UserList')
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={style.bodyBackground}>
                <View style={style.root}>

                    <View style={style.menu}>
                        <TouchableOpacity style={style.menuItem} onPress={() => signOut()}>
                            <Ionicons name="exit-sharp" size={40} color={cores.color5} style={{ transform: [{ rotate: "180deg" }] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.menuItem} onPress={() => { navigation.navigate('Conf') }}>
                            <Ionicons name="settings-sharp" size={40} color={cores.color5} />
                        </TouchableOpacity>
                    </View>

                    <Text style={style.textWelcome}>Bem vindo, {user.nome}!</Text>

                    <LinearGradient
                        colors={[myCores.color3, `${myCores.color1}25`]}
                        style={style.headerMenu}>
                        <Text style={style.textHeaderMenu}>MENU</Text>
                    </LinearGradient>

                    <View style={style.section}>
                        <TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('ScannerQR') }}>
                            <Ionicons name="camera-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Escanear selo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn}>
                            <Ionicons name="checkmark-circle-sharp" size={64} color={cores.color3} onPress={() => { navigateTo('all') }} />
                            <Text style={style.section_btn_text}>Gerenciar cadastros</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn}>
                            <Ionicons name="warning-sharp" size={64} color={cores.color3} onPress={() => { navigateTo('expired') }} />
                            <Text style={style.section_btn_text}>Cadastros vencidos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.section_btn} onPress={() => { navigation.navigate('Register') }}>
                            <Ionicons name="add-sharp" size={64} color={cores.color3} />
                            <Text style={style.section_btn_text}>Cadastrar veículos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </Background>
    );
}

const style = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: 30,
    },
    menu: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
    },
    menuItem: {
        backgroundColor: `${myCores.light}09`,
        borderRadius: 10,
        width: 70,
        height: 70,
        borderWidth: 5,
        borderColor: '#00000020',
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        flex: 10,
        backgroundColor: '#e1e1e105',
        width: '100%',
        borderTopColor: `${cores.color5}`,
        borderTopWidth: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 30,
    },

    bodyBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textWelcome: {
        flex: 1,
        color: `${cores.color7}`,
        fontSize: 26,
        marginBottom: 40,
    },
    headerMenu: {
        color: `${cores.color7}`,
        transform: [{ translateY: 25 }],
        position: 'absolute',
        top: 133,
        width: 200,
        height: 60,
        borderRadius: 25,
        zIndex: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${cores.color3}`,
        borderColor: `${myCores.black}`,
        borderWidth: 10,
    },
    textHeaderMenu: {
        color: `${myCores.light}`,
        fontWeight: '900',
        fontSize: 22,
    },
    section_btn: {
        borderColor: `${cores.color3}30`,
        borderWidth: 2.5,
        marginBottom: 30,
        backgroundColor: `${cores.color1}`,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    section_btn_text: {
        color: `${cores.color7}`,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '100',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
});