import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, TextInput, TouchableOpacity, CheckBox, View, Text, Alert } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import minhasCores from '../../styles/colors'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { color } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignIn() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [textSecure, setTextSecure] = useState(true);
    const [textSecureIcon, setTextSecureIcon] = useState('eyeo');

    const [keepConnected, setKeepConnected] = useState(false);

    const { signIn } = useContext(AuthContext);

    const contato = () => {
        Alert.alert(
            'Tem alguma dúvida?',
            'Entre em contato com o desenvolvedor pelo e-mail:\n\t- ramon.santos11@outlook.com\n',
            [{ text: "Voltar", onPress: () => { }, style: "cancel" }],
            { cancelable: true }
        )
    }

    function handleLogin() {
        signIn(email, password, keepConnected);
    }

    function toggleSecureIcon() {
        if (textSecure) return setTextSecureIcon('eye')
        if (!textSecure) return setTextSecureIcon('eyeo')
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Logo source={require('../../assets/logo-1.png')} />

                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite seu e-mail"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            keyboardType="email-address"
                            autoCompleteType='email'
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput >
                        <Ionicons name="lock-closed" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite sua senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={password}
                            autoCompleteType='password'
                            secureTextEntry={textSecure}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity style={{ marginLeft: 2 }} onPress={() => { setTextSecure(!textSecure); toggleSecureIcon() }}>
                            <AntDesign name={textSecureIcon} size={20} color="#dedede" />
                        </TouchableOpacity>
                    </AreaInput>

                    <SubmitButton onPress={() => {
                        handleLogin()
                    }}>
                        <SubmitText>
                            Entrar
                    </SubmitText>
                    </SubmitButton>

                    <View style={styles.checkboxArea}>
                        <Text style={styles.textCheckbox}>Manter conectado? </Text>
                        <CheckBox
                            value={keepConnected}
                            onValueChange={() => { setKeepConnected(!keepConnected) }}
                            style={styles.checkbox}
                            tintColors={{ true: minhasCores.color3, false: '#ff00ff' }}
                        />
                    </View>

                    <Link onPress={() => {
                        navigation.navigate('PassawordReset')
                    }}>
                        <LinkText>
                            Esqueci minha senha
                    </LinkText>
                    </Link>

                    <Link onPress={() => {
                        navigation.navigate('SignUp')
                    }}>
                        <LinkText style={{ color: '#ffffff35' }}>
                            Solicitar acesso ao aplicativo
                    </LinkText>
                    </Link>

                </Container>

                {/* 
                    // Está deixando a tela de login muito cheia. Vou procurar uma forma de a deixar mais limpa.
                    
                <TouchableOpacity style={styles.helpBtn} onPress={()=> {contato()}}>
                    <Ionicons name="help" size={20} style={styles.helpIcon} />
                </TouchableOpacity> */}

            </ImageBackground>
        </Background>
    );
}