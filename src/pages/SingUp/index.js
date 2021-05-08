import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function SingIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
            <Background>
                <Container>
                    <Logo source={require('../../assets/logo-1.png')} />
                    <AreaInput>
                        <Ionicons name="person" size={15} color="#dedede" />
                        <Input
                            placeholder="Digite o usuario"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="lock-closed" size={15} color="#dedede" />
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
            </Background>
    );
}