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

export default function Lista({ data }) {

    const { pageName, today } = useContext(AppContext);

    const [modalActive, setModalActive] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [textoResposta, setTextoResposta] = useState('Atualizar')
    const [btnCor, setBtnCor] = useState('#3C74A6')

    ////

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //dados do formulário: 
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || validade;
        setShow(Platform.OS === 'ios');
        setValidade(currentDate);
    };


    const openConfirmDelete = () =>
        Alert.alert(
            "Atenção!",
            `Você deletará PERMANENTEMENTE o registro do(a) ${arrayPostGrad[postGrad].pg} ${nomeGuerra}.\n\nDeseja continuar?`,
            [
                {
                    text: "Voltar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Excluir", onPress: () => deleteOnFirebase(data.key) }
            ],
            { cancelable: false }
        );

    let itemPostGrad = arrayPostGrad.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.pg} />
    })

    let itemCor = cores.map((value, index) => {
        return <Picker.Item key={index} value={index} label={value.cor} color={value.codigoCor} />
    })

    async function updateOnFirebase(key, nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes) {
        setLoadingUpdate(true)
        await firebase.database().ref('veiculos').child(key).update({ nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade: String(validade), observacoes })
            .then(() => {
                setLoadingUpdate(false)
                setBtnCor('#28a745')
                setTextoResposta('Enviado!')

                setTimeout(() => {
                    setModalActive(false)
                }, 1500);
            });
    }

    async function deleteOnFirebase(key) {
        await firebase.database().ref('veiculos').child(key).remove()
            .then(() => {
                alert('Excluído!')
            });
    }

    const isValidAccess = (page) => {
        const objDataVencimento = new Date(data.validade)

        if(page === 'Cadastros vencidos'){
            if(objDataVencimento > today){
                return true
            } else {
                false
            }
        } else {
            true
        }
    }

    return (
        ( !isValidAccess(pageName) ? 
        (<View style={LocalStyle.container}>
            <Text style={LocalStyle.header}> {`${data.modelo} - ${data.placa.toUpperCase()}`} </Text>

            <View style={LocalStyle.sectionDadosCarro}>
                <Text style={LocalStyle.textDestaque}>Titular: <Text style={LocalStyle.textSimples}>{arrayPostGrad[data.postGrad].pg} {data.nomeGuerra}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Nome completo: <Text style={LocalStyle.textSimples}>{data.nomeCompleto}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Identidade: <Text style={LocalStyle.textSimples}>{data.documentoIdentidade}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Cor do veículo: <Text style={LocalStyle.textSimples}>{cores[data.cor].cor}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Validade do selo: <Text style={LocalStyle.textSimples}>{data.validade}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Áreas de acesso permitido: <Text style={LocalStyle.textSimples}>{data.tipoAcesso}</Text></Text>
                <Text style={LocalStyle.textDestaque}>Observações: <Text style={LocalStyle.textSimples}>{data.observacoes}</Text></Text>
            </View>

            <View style={LocalStyle.footer}>
                <TouchableOpacity style={LocalStyle.btnEdit} onPress={() => { setBtnCor('#3C74A6'); setTextoResposta('Atualizar'); setModalActive(true); }}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={LocalStyle.btnDelete} onPress={() => { openConfirmDelete() }}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
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
                                        style={{ color: '#dedede', fontSize: 20, width: '95%', height: '100%' }}
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
                                        autoCapitalize="none"
                                        value={observacoes}
                                        onChangeText={text => setObservacoes(text)}
                                    />
                                </AreaInput>

                                {loadingUpdate ?

                                    (<View style={{ marginBottom: 50 }}><ActivityIndicator color="#28a745" size={45} /></View>)

                                    : (
                                        <SubmitButton style={{

                                            flex: 1,
                                            alignSelf: 'center',
                                            marginBottom: 50,
                                            backgroundColor: `${btnCor}`
                                        }}

                                            onPress={() => {
                                                if (nomeCompleto != '' && postGrad != '' && nomeGuerra != '' && modelo != '' && placa != '' && cor != '' && tipoAcesso != '' && validade != '' && documentoIdentidade != '') {
                                                    updateOnFirebase(key, nomeCompleto, postGrad, nomeGuerra, modelo, placa, cor, tipoAcesso, validade, observacoes, documentoIdentidade)
                                                } else {
                                                    alert('Preencha todos os campos para continuar.')
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
        borderColor: '#3C74A6',
        backgroundColor: '#121212',
        width: 350,
        marginTop: 20,
        paddingBottom: 60,
        marginBottom: 50,
        zIndex: 2,
    },
    header: {
        borderWidth: 3,
        borderColor: '#F27405',
        transform: [{ translateY: -15 }],
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        paddingVertical: 3,
        backgroundColor: '#121212',
        marginHorizontal: 30
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
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#121212'
    },
    btnEdit: {
        backgroundColor: '#28A745',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3,
    },
    btnDelete: {
        backgroundColor: '#DC3545',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 3,
    },
    footer: {
        borderWidth: 5,
        borderColor: '#121212',
        textAlign: 'center',
        color: '#dedede',
        fontSize: 18,
        backgroundColor: '#3C74A6',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        flexDirection: 'row',
    }
})

const styleModal = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#141414',
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginTop: 10,
        backgroundColor: '#141414',
        flexDirection: 'row'
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 12,
    },
})
