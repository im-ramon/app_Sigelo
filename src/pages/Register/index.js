import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import { Picker } from '@react-native-picker/picker'
import firebase from '../../services/firebaseConnection'
import { arrayPostGrad, cores } from './listas'
import ModalConfirm from './ModalConfirm'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Register() {
    
    const navigation = useNavigation();


    // DatePiker states
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //dados do formulário: 
    const [nomeCompleto, setNomeCompleto] = useState('')
    const [postGrad, setPostGrad] = useState(0)
    const [nomeGuerra, setNomeGuerra] = useState('')
    const [modelo, setModelo] = useState('')
    const [placa, setPlaca] = useState('')
    const [cor, setCor] = useState(0)
    const [tipoAcesso, setTipoAcesso] = useState('')
    const [validade, setValidade] = useState(new Date());
    const [documentoIdentidade, setDocumentoIdentidade] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const [modalActive, setModalActive] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || validade;
        setShow(Platform.OS === 'ios');
        setValidade(currentDate);
    };

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
            nomeCompleto, postGrad: postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade: String(validade) , observacoes, documentoIdentidade
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

                        <TouchableOpacity onPress={() => { setMode('date'); setShow(true) }}>
                            <View style={style.datePiker}>
                                <Ionicons name="calendar-sharp" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                                <Input
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={String(`${(validade.getDate() <= 9) ? '0' + (validade.getDate()) : validade.getDate()}/${(validade.getMonth()+1) <= 9 ? '0' + (validade.getMonth()+1) : (validade.getMonth()+1)}/${validade.getFullYear()}`)}
                                />
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={validade}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </TouchableOpacity>

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
                                alert('Preencha todos os campos para continuar.')
                            }
                        }}>
                            <SubmitText>
                                Enviar
                            </SubmitText>
                        </SubmitButton>

                        {modalActive == true ? <ModalConfirm /> : <Text></Text>}

                    </ScrollView>
                </Container>
            </ImageBackground>
        </Background>
    );
}