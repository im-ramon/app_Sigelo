import React, { useState, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import { AuthContext } from '../../contexts/auth';
import { Picker } from '@react-native-picker/picker';
import cores from '../../styles/colors'

export default function SignUp() {

    const { signUp } = useContext(AuthContext);

    const navigation = useNavigation();

    const [nomeUser, setNomeUser] = useState('')
    const [sobrenomeUser, setSobrenomeUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [senhaAdm, setSenhaAdm] = useState('')
    const [tipoUser, setTipoUser] = useState('99')

    const [loading, setLoading] = useState(false)

    const validacaoEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)$/


    function alert(type) {
        if (type == 'erro') {
            Alert.alert(
                `Atenção!`,
                `Preencha corretamente todos os campos solicitados para continuar.\n\nTente novamente.`,
                [
                    { text: "Continuar", onPress: () => console.log('erro') }
                ],
                { cancelable: false }
            );
        }

        if (type == 'success') {
            Alert.alert(
                `Cadastro concluído!`,
                `Os dados foram remetidos para análise.\n\nAguarde a aprovação.`,
                [
                    { text: "Continuar", onPress: () => navigation.navigate('SignIn') }
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Logo source={require('../../assets/logo-1.png')} />

                    <Text style={style.textHeader}>Cadastrar usuários</Text>
                    
                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Primeiro nome"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={nomeUser}
                            onChangeText={text => setNomeUser(text)}
                        />
                        <Ionicons name={nomeUser && nomeUser.length >= 2 ? "checkmark" : "close"} size={20} color={nomeUser === '' ? '#00000000' : (nomeUser && nomeUser.length >= 2 ? cores.success : cores.danger)} style={{ marginLeft: -5 }} />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Sobrenome"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={sobrenomeUser}
                            onChangeText={text => setSobrenomeUser(text)}
                        />
                        <Ionicons name={sobrenomeUser && sobrenomeUser.length >= 2 ? "checkmark" : "close"} size={20} color={sobrenomeUser === '' ? '#00000000' : (sobrenomeUser && sobrenomeUser.length >=2 ? cores.success : cores.danger)} style={{ marginLeft: -5 }} />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="mail" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Email"
                            autoCorrect={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={emailUser}
                            onChangeText={text => setEmailUser(text)}
                        />
                        <Ionicons name={!validacaoEmail.test(emailUser) ? "close" : "checkmark"} size={20} color={emailUser === '' ? '#00000000' : (!validacaoEmail.test(emailUser) ? cores.danger : cores.success)} />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="lock-closed-sharp" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Senha de (oito) dígitos"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={senhaUser}
                            onChangeText={text => setSenhaUser(text)}
                            secureTextEntry={true}
                        />
                        <Ionicons name={senhaUser.length <= 7 ? "close" : "checkmark"} size={20} color={senhaUser == '' ? '#00000000' : (senhaUser.length <= 7 ? cores.danger : cores.success)} style={{ marginLeft: -5 }} />
                    </AreaInput>

                    <View style={style.piker}>
                        <MaterialIcons name="table-chart" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                        <Picker
                            selectedValue={tipoUser}
                            onValueChange={value => { setTipoUser(value) }}
                            dropdownIconColor={tipoUser == '99' ? cores.light : cores.success} size={20} color={senhaAdm == '' ? cores.danger : cores.success}
                            style={{ color: tipoUser === '' || tipoUser == '99' ? '#484848' : '#dedede', fontSize: 20, width: '95%', height: '100%' }}
                        >
                            <Picker.Item key={99} value={99} label={' - Selecione um perfil de usuário'} />
                            <Picker.Item key={1} value={1} label={'Administrador'} />
                            <Picker.Item key={2} value={2} label={'Operador'} />
                            <Picker.Item key={3} value={3} label={'Fiscalizador'} />
                        </Picker>
                    </View>
                    {loading ?
                        (<ActivityIndicator color={cores.color3} size={45} />)
                        :
                        (
                            <SubmitButton style={{borderRadius: 10}} onPress={() => {
                                if (!!validacaoEmail.test(emailUser) && senhaUser.length >= 8 && !!nomeUser && !!sobrenomeUser && !!tipoUser) {
                                    setLoading(true)
                                    signUp(emailUser, senhaUser, nomeUser, sobrenomeUser, tipoUser)
                                    setLoading(false)
                                    alert('success')
                                } else {
                                    alert('erro')
                                }
                            }}>
                                <SubmitText>
                                    Enviar
                                </SubmitText>
                            </SubmitButton>
                        )
                    }

                </Container>
            </ImageBackground>
        </Background >
    );
}

const style = StyleSheet.create({
    viewTextArea: {
        width: '80%',
    },
    viewText: {
        color: '#dedede',
        textAlign: 'center',
    },
    textHeader: {
        color: colors.light,
        fontSize: 20,
        marginBottom: 30,
        marginTop: -20
    },
    piker: {
        backgroundColor: '#00000050',
        borderBottomWidth: 3,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomColor: '#3C74A6',
        width: '65%',
        // flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        height: 40,
        marginBottom: 20,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        paddingRight: 15,
    },
})