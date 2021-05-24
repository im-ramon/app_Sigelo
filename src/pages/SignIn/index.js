import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { color } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignIn() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    function handleLogin(){
        signIn(email, password);
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Logo source={require('../../assets/logo-1.png')} />

                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite o usuario"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
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
                            onChangeText={text => setPassword(text)}
                        />
                    </AreaInput>

                    <SubmitButton onPress={() => {
                        handleLogin()
                    }}>
                        <SubmitText>
                            Entrar
                    </SubmitText>
                    </SubmitButton>

                    <Link onPress={() => {
                        navigation.navigate('SignUp')
                    }}>
                        <LinkText>
                            Ainda não possui um perfil? Solicite seu cadastro.
                    </LinkText>
                    </Link>

                </Container>
            </ImageBackground>
        </Background>
    );
}