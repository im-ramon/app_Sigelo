import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { style } from './style'
import { Picker } from '@react-native-picker/picker'
import firebase from '../../services/firebaseConnection'
import { arrayPostGrad, cores } from './listas'
import ModalConfirm from './ModalConfirm'
import DateTimePicker from '@react-native-community/datetimepicker';
import minhascores from '../../styles/colors'

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
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || validade;
        setShow(Platform.OS === 'ios');
        setValidade(currentDate);
    };

    const regexPlate = /^[A-Za-z]{3}([0-9]{1}[A-Za-z]{1}[0-9]{2}|[0-9]{4}$)/
    const regexAllTexts = /[^A-Z a-z0-9]/gi

    let itemPostGrad = arrayPostGrad.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.pg} />
    })

    let itemCor = cores.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.cor} color={value.codigoCor} />
    })

    function alertFunc(type) {
        if (type == 'erro') {
            Alert.alert(
                `Atenção!`,
                `Preencha todos os campos para continuar.\n\nTente novamente.`,
                [
                    { text: "Continuar", onPress: () => console.log('erro') }
                ],
                { cancelable: false }
            );
        }

        if (type == 'success') {
            Alert.alert(
                `Cadastro concluído!`,
                `O veículo do ${arrayPostGrad[postGrad].pg} ${nomeGuerra} foi inserido no banco de dados.\n`,
                [
                    {
                        text: "Inserir outro veículo", onPress: () => {
                            console.log('ToStay')
                            setNomeCompleto('')
                            setPostGrad(0)
                            setNomeGuerra('')
                            setModelo('')
                            setPlaca('')
                            setCor(0)
                            setTipoAcesso('')
                            setDocumentoIdentidade('')
                            setObservacoes('')
                        }
                    },
                    { text: "Página inicial", onPress: () => navigation.navigate('Home') },
                ],
                { cancelable: false }
            );
        }
    }

    async function insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes) {
        let cadastros = await firebase.database().ref('veiculos');
        let chave = cadastros.push().key

        cadastros.child(chave).set({
            nomeCompleto, postGrad: postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade: String(validade), observacoes, documentoIdentidade
        }).then((foo) => {
            setLoadingUpdate(false)
            alertFunc('success')
        })
    }


    return (
        <Background>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.image}>
                <Container>
                    <Text style={style.textH1}>Cadastrar novos veículos</Text>
                    <ScrollView style={style.containerScrollView}>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Nome completo"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={nomeCompleto}
                                onChangeText={text => setNomeCompleto(text.replace(regexAllTexts, ''))}
                            />
                            <Ionicons name={nomeCompleto.length > 1 ? "checkmark" : "close"} size={20} color={nomeCompleto === '' ? "#00000000" : (nomeCompleto.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
                        </AreaInput>

                        <View style={style.piker}>
                            <MaterialIcons name="military-tech" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Picker
                                selectedValue={postGrad}
                                onValueChange={value => { setPostGrad(value) }}
                                dropdownIconColor={postGrad === 0 ? minhascores.light : minhascores.success}
                                style={{ color: postGrad === 0 ? '#484848' : '#dedede', fontSize: 20, width: '95%', height: '100%' }}
                            >
                                {itemPostGrad}
                            </Picker>
                        </View>

                        <AreaInput style={style.areaInput}>
                            <MaterialIcons name="person-pin" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Apelido/ Nome de guerra"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={nomeGuerra}
                                onChangeText={text => setNomeGuerra(text.replace(regexAllTexts, ''))}
                            />
                            <Ionicons name={nomeGuerra.length > 1 ? "checkmark" : "close"} size={20} color={nomeGuerra === '' ? "#00000000" : (nomeGuerra.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
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
                            <Ionicons name={documentoIdentidade.length > 1 ? "checkmark" : "close"} size={20} color={documentoIdentidade === '' ? "#00000000" : (documentoIdentidade.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="car" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Modelo do veículo"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={modelo}
                                onChangeText={text => setModelo(text)}
                            />
                            <Ionicons name={modelo.length > 1 ? "checkmark" : "close"} size={20} color={modelo === '' ? "#00000000" : (modelo.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
                        </AreaInput>

                        <View style={style.piker}>
                            <Ionicons name="color-palette-sharp" size={22} color="#dedede" style={{ marginLeft: 5 }} />
                            <Picker
                                selectedValue={cor}
                                onValueChange={value => { setCor(value) }}
                                dropdownIconColor={cor === 0 ? minhascores.light : minhascores.success}
                                style={{ color: cor === 0 ? '#484848' : '#dedede', fontSize: 20, width: '95%', height: '100%' }}
                            >
                                {itemCor}
                            </Picker>
                        </View>

                        <AreaInput style={style.areaInput}>
                            <MaterialCommunityIcons name="scoreboard" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Placa do veículo"
                                maxLength={7}
                                autoCorrect={false}
                                value={placa}
                                autoCapitalize='characters'
                                onChangeText={text => setPlaca(text.replace(regexAllTexts, '').toUpperCase())}
                            />
                            <Ionicons name={regexPlate.test(placa) ? "checkmark" : "close"} size={20} color={placa === '' ? '#00000000' : (regexPlate.test(placa) ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
                        </AreaInput>

                        <AreaInput style={style.areaInput}>
                            <Ionicons name="hand-left" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                            <Input
                                placeholder="Áreas de acesso permitido"
                                autoCorrect={false}
                                autoCapitalize="sentences"
                                value={tipoAcesso}
                                onChangeText={text => setTipoAcesso(text)}
                            />
                            <Ionicons name={tipoAcesso.length > 1 ? "checkmark" : "close"} size={20} color={tipoAcesso === '' ? "#00000000" : (tipoAcesso.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 22 }} />
                        </AreaInput>

                        <TouchableOpacity onPress={() => { setMode('date'); setShow(true) }}>
                            <View style={style.datePiker}>
                                <Ionicons name="calendar-sharp" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                                <Input
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={String(`${(validade.getDate() <= 9) ? '0' + (validade.getDate()) : validade.getDate()}/${(validade.getMonth() + 1) <= 9 ? '0' + (validade.getMonth() + 1) : (validade.getMonth() + 1)}/${validade.getFullYear()}`)}
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
                                autoCapitalize="sentences"
                                value={observacoes}
                                onChangeText={text => setObservacoes(text)}
                            />
                        </AreaInput>

                        {loadingUpdate ?

                            (<View style={{ marginBottom: 50 }}><ActivityIndicator color={minhascores.color3} size={45} /></View>)
                            :
                            (
                                <SubmitButton style={style.btnEnviar} onPress={() => {
                                    if (nomeCompleto != '' && postGrad != '' && nomeGuerra != '' && modelo != '' && regexPlate.test(placa) && cor != '' && tipoAcesso != '' && validade != '' && documentoIdentidade != '') {
                                        setLoadingUpdate(true)
                                        insertNoFireBase(nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes, documentoIdentidade)
                                    } else {
                                        alertFunc('erro')
                                    }
                                }}>
                                    <SubmitText>
                                        Enviar
                                    </SubmitText>
                                </SubmitButton>
                            )
                        }
                        {modalActive == true ? <ModalConfirm /> : <Text></Text>}

                    </ScrollView>
                </Container>
            </ImageBackground>
        </Background >
    );
}