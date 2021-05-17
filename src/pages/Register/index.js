import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const navigation = useNavigation();

    const [user, setUser] = useState('')
    const [pg, setPg] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Logo source={require('../../assets/logo-1.png')} />

                    <Text>Cadastrado de usuário</Text>

                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite o nome de usuario"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={user}
                            onChangeText={text => setUser(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="hand-left" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Escolhar o P/G"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite o nome completo"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="mail" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite o e-mail"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Ionicons name="lock-closed" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                        <Input
                            placeholder="Digite uma senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </AreaInput>

                    <SubmitButton onPress={() => {
                        alert('x')
                    }}>
                        <SubmitText>
                            Enviar
                    </SubmitText>
                    </SubmitButton>
                </Container>
            </ImageBackground>
        </Background>
    );
}

const style = StyleSheet.create({
    viewTextArea: {
        width: '80%',
    },
    viewText: {
        color: '#dedede',
        textAlign: 'center',
    }
})