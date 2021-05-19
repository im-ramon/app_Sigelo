import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import firebase from '../../services/firebaseConnection'

export default function Register() {
    const navigation = useNavigation();

    const [nomeCompleto, setNomeCompleto] = useState('')
    const [postGrad, setPostGrad] = useState('')
    const [nomeGuerra, setNomeGuerra] = useState('')
    const [modelo, setModelo] = useState('')
    const [placa, setPlaca] = useState('')
    const [cor, setCor] = useState('')
    const [tipoAcesso, setTipoAcesso] = useState('')
    const [validade, setValidade] = useState('')
    const [observacoes, setObservacoes] = useState('')

    async function insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes){
        let cadastros = await firebase.database().ref('users');
        let chave = cadastros.push().key

        cadastros.child(chave).set({
            nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes
        })
    }

    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    {/* <Image style={style.imgLogo} source={require('../../assets/logo-1.png')} /> */}

                    <Text style={style.textH1}>Cadastrar novos veículos</Text>
                    <ScrollView style={style.containerScrollView}>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Nome completo"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={nomeCompleto}
                                onChangeText={text => setNomeCompleto(text)}
                            />
                        </AreaInput>
                        <AreaInput style={style.areaInput}>
                            <MaterialIcons name="military-tech" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Posto ou Graduação"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={postGrad}
                                onChangeText={text => setPostGrad(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <MaterialIcons name="military-tech" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Nome de guerra"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={nomeGuerra}
                                onChangeText={text => setNomeGuerra(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="car" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Modelo do veículo"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={modelo}
                                onChangeText={text => setModelo(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <MaterialCommunityIcons name="scoreboard" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Placa do veículo"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={placa}
                                onChangeText={text => setPlaca(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="color-palette-sharp" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Cor do veículo"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={cor}
                                onChangeText={text => setCor(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="hand-left" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Tipo de acesso"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={tipoAcesso}
                                onChangeText={text => setTipoAcesso(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="calendar-sharp" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Validade do selo"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={validade}
                                onChangeText={text => setValidade(text)}
                            />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="add" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Observações"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={observacoes}
                                onChangeText={text => setObservacoes(text)}
                            />
                        </AreaInput>
                        <SubmitButton style={style.btnEnviar} onPress={() => {
                            if(nomeCompleto != '' && postGrad != '' && nomeGuerra != '' && modelo != '' && placa != '' && cor != '' && tipoAcesso != '' && validade != '' && observacoes){
                                insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes)
                            } else {
                                alert('Preencha todos os campos')
                            }
                        }}>
                            <SubmitText>
                                Enviar
                    </SubmitText>
                        </SubmitButton>
                    </ScrollView>
                </Container>
            </ImageBackground>
        </Background>
    );
}