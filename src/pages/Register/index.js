import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import { Picker } from '@react-native-picker/picker'
import firebase from '../../services/firebaseConnection'
import { arrayPostGrad, cores } from './listas'

export default function Register() {

    const navigation = useNavigation();

    //dados do formulário: 
    const [nomeCompleto, setNomeCompleto] = useState('')
    const [postGrad, setPostGrad] = useState(0)
    const [nomeGuerra, setNomeGuerra] = useState('')
    const [modelo, setModelo] = useState('')
    const [placa, setPlaca] = useState('')
    const [cor, setCor] = useState(0)
    const [tipoAcesso, setTipoAcesso] = useState('')
    const [validade, setValidade] = useState('')
    const [documentoIdentidade, setDocumentoIdentidade] = useState('')
    const [observacoes, setObservacoes] = useState('')

    let itemPostGrad = arrayPostGrad.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.pg} />
    })
    
    let itemCor = cores.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.cor} color={value.codigoCor} />
    })

    async function insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes) {
        let cadastros = await firebase.database().ref('veiculos');
        let chave = cadastros.push().key

        cadastros.child(chave).set({
            nomeCompleto, postGrad: postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes, documentoIdentidade
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

                        <View style={style.piker}>
                            <MaterialIcons name="military-tech" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Picker
                                selectedValue={postGrad}
                                onValueChange={value => { setPostGrad(value) }}
                                dropdownIconColor='#dedede'
                                style={{ color: postGrad === 0 ? '#484848' : '#dedede', fontSize: 20, width: '95%', height: '100%' }}
                            >
                                {itemPostGrad}
                            </Picker>

                        </View>

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
                            <MaterialCommunityIcons name="identifier" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Documento de identidade"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={documentoIdentidade}
                                onChangeText={text => setDocumentoIdentidade(text)}
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

                        <View style={style.piker}>
                            <Ionicons name="color-palette-sharp" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Picker
                                selectedValue={cor}
                                onValueChange={value => { setCor(value) }}
                                dropdownIconColor='#dedede'
                                style={{ color: cor === 0 ? '#484848' : '#dedede', fontSize: 20, width: '95%', height: '100%' }}
                            >
                                {itemCor}
                            </Picker>
                        </View>

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
                            <Ionicons name="hand-left" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Áreas de acesso"
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
                            if (nomeCompleto != '' && postGrad != '' && nomeGuerra != '' && modelo != '' && placa != '' && cor != '' && tipoAcesso != '' && validade != '' && documentoIdentidade != '') {
                                insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes, documentoIdentidade)
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