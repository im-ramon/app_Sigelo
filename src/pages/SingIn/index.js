import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function SingIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

                    <AreaInput>
                        <Ionicons name="lock-closed" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite sua senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </AreaInput>

                    <SubmitButton>
                        <SubmitText>
                            Entrar
                    </SubmitText>
                    </SubmitButton>

                    <Link>
                        <LinkText>
                            Ainda não possui um perfil? Solicite seu cadastro.
                    </LinkText>
                    </Link>

                </Container>
            </ImageBackground>
        </Background>
    );
}
