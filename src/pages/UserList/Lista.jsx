import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { cores, arrayPostGrad } from '../Register/listas'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Picker } from '@react-native-picker/picker'
import { style } from './style'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../services/firebaseConnection';
import { AppContext } from '../../contexts/appContexts';
import minhascores from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';

export default function Lista({ data }) {

    const { pageName, today } = useContext(AppContext);

    const [modalActive, setModalActive] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [textoResposta, setTextoResposta] = useState('Atualizar')
    const [btnCor, setBtnCor] = useState('#3C74A6')
    const [loadingQR, setLoadingQR] = useState(false)

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //Dados do formulário: 
    const [key, setKey] = useState(data.key)
    const [nomeCompleto, setNomeCompleto] = useState(data.nomeCompleto)
    const [postGrad, setPostGrad] = useState(data.postGrad)
    const [nomeGuerra, setNomeGuerra] = useState(data.nomeGuerra)
    const [modelo, setModelo] = useState(data.modelo)
    const [placa, setPlaca] = useState(data.placa)
    const [cor, setCor] = useState(data.cor)
    const [tipoAcesso, setTipoAcesso] = useState(data.tipoAcesso)
    const [validade, setValidade] = useState(new Date(data.validade));
    const [documentoIdentidade, setDocumentoIdentidade] = useState(data.documentoIdentidade)
    const [observacoes, setObservacoes] = useState(data.observacoes)

    const regexPlate = /^[A-Za-z]{3}([0-9]{1}[A-Za-z]{1}[0-9]{2}|[0-9]{4}$)/
    const regexAllTexts = /[^A-Z a-z0-9]/gi

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || validade;
        setShow(Platform.OS === 'ios');
        setValidade(currentDate);
    };

    const isValidAccess = (page) => {
        const objDataVencimento = new Date(data.validade)

        if (page === 'Cadastros vencidos') {
            if (objDataVencimento > today) {
                return true
            } else {
                false
            }
        } else {
            true
        }
    }

    const alertFill = () => {
        Alert.alert(
            "Atenção!",
            `Preencha corretamente todos os campos para continuar.`,
            [
                {
                    text: "Continuar",
                    onPress: () => { },
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    }


    const openConfirmDelete = () =>
        Alert.alert(
            "Atenção!",
            `Você deletará PERMANENTEMENTE o registro do(a) ${arrayPostGrad[postGrad].pg} ${nomeGuerra}.\n\nDeseja continuar?`,
            [
                {
                    text: "Voltar",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => { deleteOnFirebase(data.key) },
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );

    let itemPostGrad = arrayPostGrad.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.pg} />
    })

    let itemCor = cores.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.cor} color={value.codigoCor} />
    })

    function makeHTML() {
        const tamanhoQRCode = 500

        let HTML = `
            <div style="display: flex; padding: 1em; width: 21cm; flex-wrap: wrap;">
                <div style="width: 30%; display: flex; justify-content: center; align-items: center; flex-direction: column; border: 3px dashed #00000030; margin: .2em;">
                    <img src="https://chart.googleapis.com/chart?chs=${tamanhoQRCode}x${tamanhoQRCode}&cht=qr&chl=${key}" width="100%">
                    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; background-color: #00000015; width: 100%;">
                        <p style="line-height: 0cm;">${arrayPostGrad[postGrad].pg} ${nomeGuerra}</p>
                    </div>
                </div>
            </div>
            `

        return HTML
    }

    async function updateOnFirebase(key, nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, documentoIdentidade, observacoes) {
        setLoadingUpdate(true)
        await firebase.database().ref('veiculos').child(key).update({ nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade: String(validade), documentoIdentidade, observacoes })
            .then(() => {
                setLoadingUpdate(false)
                setBtnCor(`${minhascores.success}`)
                setTextoResposta('Atualizado')

                setTimeout(() => {
                    setModalActive(false)
                }, 300);
            });
    }

    async function deleteOnFirebase(key) {
        await firebase.database().ref('veiculos').child(key).remove()
            .then(() => {
                Alert.alert(
                    "Concluído!",
                    `Registro deletado com sucesso do banco de dados.`,
                    [
                        {
                            text: "Continuar",
                            onPress: () => console.log("Continue"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: true }
                );
            });
    }

    return (
        (!isValidAccess(pageName) ?
            (<View style={LocalStyle.container}>

                <View style={LocalStyle.header}>
                    <LinearGradient colors={['transparent', '#00000035']} style={LocalStyle.linearGradient} />
                    <Text style={LocalStyle.textHeader}>{`${data.modelo} - ${data.placa.toUpperCase()}`}</Text>
                </View>

                <View style={LocalStyle.sectionDadosCarro}>
                    <Text style={LocalStyle.textDestaque}>Titular: <Text style={LocalStyle.textSimples}>{arrayPostGrad[data.postGrad].pg} | {data.nomeGuerra}</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Nome completo: <Text style={LocalStyle.textSimples}>{data.nomeCompleto}</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Identidade: <Text style={LocalStyle.textSimples}>{data.documentoIdentidade}</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Cor do veículo: <Text style={LocalStyle.textSimples}>{cores[data.cor].cor}</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Validade do selo: <Text style={LocalStyle.textSimples}>{
                        String(`${((new Date(data.validade)).getDate() <= 9) ? '0' + ((new Date(data.validade)).getDate()) : (new Date(data.validade)).getDate()}/${((new Date(data.validade)).getMonth() + 1) <= 9 ? '0' + ((new Date(data.validade)).getMonth() + 1) : ((new Date(data.validade)).getMonth() + 1)}/${(new Date(data.validade)).getFullYear()}`)
                    }</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Áreas de acesso permitido: <Text style={LocalStyle.textSimples}>{data.tipoAcesso}</Text></Text>
                    <Text style={LocalStyle.textDestaque}>Observações: <Text style={LocalStyle.textSimples}>{data.observacoes}</Text></Text>
                </View>

                <View style={LocalStyle.footer}>
                    <TouchableOpacity style={LocalStyle.btnEdit} onPress={() => { setBtnCor('#3C74A6'); setTextoResposta('Atualizar'); setModalActive(true); }}>
                        <LinearGradient colors={['transparent', '#00000030']} style={LocalStyle.linearGradient} />
                        <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={LocalStyle.btnDelete} onPress={() => { openConfirmDelete() }}>
                        <LinearGradient colors={['transparent', '#00000030']} style={LocalStyle.linearGradient} />
                        <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>

                    {pageName === 'Cadastros ativos' &&
                    
                            (<TouchableOpacity style={LocalStyle.btnQRCOde} onPress={() => {
                                setLoadingQR(true);
                                Print.printAsync({
                                    html: makeHTML()
                                }).then(()=>{setLoadingQR(false)})
                            }}>
                                <LinearGradient colors={['transparent', '#00000030']} style={LocalStyle.linearGradient} />
                                {( loadingQR ? <ActivityIndicator color={'#000'} size={24} /> : <AntDesign name="qrcode" size={24} color="black" />)}
                            </TouchableOpacity>)
                                        
                    }
                </View>

                <Modal animationType="slide" visible={modalActive} >
                    <View style={styleModal.modalContainer}>

                        <View style={styleModal.header}>
                            <TouchableOpacity onPress={() => { setModalActive(false) }}>
                                <Ionicons name="close-circle-sharp" size={32} color="#F27405" />
                            </TouchableOpacity>
                        </View>


                        <View style={styleModal.modalBody}>

                            <Container>
                                <Text style={style.textH1}>Editar cadastro</Text>
                                <ScrollView style={style.containerScrollView} showsVerticalScrollIndicator={false}>
                                    <AreaInput style={style.areaInput}>
                                        <Ionicons name="person" size={20} color="#dedede" style={{ marginLeft: 5 }} />
                                        <Input
                                            placeholder="Nome completo"
                                            autoCorrect={false}
                                            autoCapitalize="sentences"
                                            value={nomeCompleto}
                                            onChangeText={text => setNomeCompleto(text.replace(regexAllTexts, ''))}
                                        />
                                        <Ionicons name={nomeCompleto.length > 1 ? "checkmark" : "close"} size={20} color={nomeCompleto === '' ? "#00000000" : (nomeCompleto.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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
                                        <Ionicons name={nomeGuerra.length > 1 ? "checkmark" : "close"} size={20} color={nomeGuerra === '' ? "#00000000" : (nomeGuerra.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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
                                        <Ionicons name={documentoIdentidade.length > 1 ? "checkmark" : "close"} size={20} color={documentoIdentidade === '' ? "#00000000" : (documentoIdentidade.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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
                                        <Ionicons name={modelo.length > 1 ? "checkmark" : "close"} size={20} color={modelo === '' ? "#00000000" : (modelo.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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
                                            autoCapitalize="characters"
                                            value={placa}
                                            onChangeText={text => setPlaca(text.replace(regexAllTexts, '').toUpperCase())}
                                        />
                                        <Ionicons name={regexPlate.test(placa) ? "checkmark" : "close"} size={20} color={placa === '' ? '#00000000' : (regexPlate.test(placa) ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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
                                        <Ionicons name={tipoAcesso.length > 1 ? "checkmark" : "close"} size={20} color={tipoAcesso === '' ? "#00000000" : (tipoAcesso.length > 1 ? minhascores.success : minhascores.danger)} style={{ marginLeft: 0 }} />
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

                                        (<View style={{ marginBottom: 50 }}><ActivityIndicator color={minhascores.success} size={45} /></View>)

                                        : (
                                            <SubmitButton style={{

                                                flex: 1,
                                                alignSelf: 'center',
                                                marginBottom: 50,
                                                backgroundColor: `${btnCor}`
                                            }}

                                                onPress={() => {
                                                    if (nomeCompleto != '' && postGrad != '' && nomeGuerra != '' && modelo != '' && regexPlate.test(placa) && cor != '' && tipoAcesso != '' && validade != '' && documentoIdentidade != '') {
                                                        updateOnFirebase(key, nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, documentoIdentidade, observacoes)
                                                    } else {
                                                        alertFill()
                                                    }
                                                }}>
                                                <SubmitText>
                                                    {`${textoResposta}`}
                                                </SubmitText>

                                            </SubmitButton>

                                        )}

                                </ScrollView>
                            </Container>

                        </View>

                    </View>
                </Modal>

            </View>
            ) : false)
    )
}

const LocalStyle = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#3C74A6',
        backgroundColor: `${minhascores.color1}`,
        width: 350,
        marginTop: 20,
        paddingBottom: 60,
        marginBottom: 50,
        zIndex: 2,
    },
    header: {
        borderWidth: 3,
        borderRadius: 15,
        borderColor: minhascores.black,
        transform: [{ translateY: -20 }],
        backgroundColor: minhascores.color5,
        marginHorizontal: 30
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        color: '#dedede',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    textDestaque: {
        color: '#3C74A6',
        fontWeight: 'bold',
        fontSize: 16
    },
    textSimples: {
        color: '#dedede',
        fontWeight: '100',
        fontSize: 14
    },
    sectionDadosCarro: {
        borderRadius: 11,
        paddingHorizontal: 10,
        paddingBottom: 10,
        overflow: 'hidden'
    },
    btnEdit: {
        backgroundColor: minhascores.success,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderLeftWidth: 3,
        borderWidth: 3, borderRadius: 11,
    },
    btnDelete: {
        backgroundColor: minhascores.danger,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3, borderRadius: 11,
    },
    btnQRCOde: {
        backgroundColor: minhascores.light,
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3, borderRadius: 11,
    },
    footer: {
        flex: 1,
        borderRadius: 10,
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        backgroundColor: minhascores.color1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 10,
        width: "100%",
    }
})

const styleModal = StyleSheet.create({
    modalContainer: {
        backgroundColor: minhascores.color1,
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginTop: 13,
        backgroundColor: minhascores.color1,
        flexDirection: 'row'
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 20,
    },
})
