import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style';
import firebase from '../../services/firebaseConnection';
import { cores, arrayPostGrad } from '../Register/listas';
import * as Print from 'expo-print';
import minhascores from '../../styles/colors';

export default function ExportAllQR() {

    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

    const [sizeQR, setSizeQR] = useState(100)
    const [qtdQR, setQtdQR] = useState(12)

    useEffect(() => {
        async function listarUsuarios() {
            await firebase.database().ref('veiculos').on('value', snapshot => {
                let arrayVeiculos = []
                setUsers([])
                snapshot.forEach(itens => {
                    let data = {
                        key: itens.key,
                        nomeGuerra: itens.val().nomeGuerra,
                        postGrad: itens.val().postGrad,
                        validade: itens.val().validade,
                    }
                    arrayVeiculos.push(data)
                })
                arrayVeiculos = arrayVeiculos.sort((a, b) => a.postGrad - b.postGrad)
                setUsers(arrayVeiculos)
                setLoadingList(false)
            })
        }
        listarUsuarios()
    }, [])

    function makeHTML(size, qtd) {
        const header = '<div style="display: flex; padding: 1em; width: 21cm; flex-wrap: wrap; justify-content: space-around;">'
        const footer = '</div><div style="page-break-after: always"></div>'

        let contadorInicio = 0;
        let contadorFim = qtd - 1;

        let html = ''

        users.forEach((item, index) => {

            index == contadorInicio && (html = html + header)

            html = html + `
                <div style="width: ${size}px; height: ${size}px; display: flex; align-items: center; flex-direction: column; margin: 1em;">
                    <img src="https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${item.key}" style="border: 3px dashed #00000030;" width="100%">
                    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; background-color: #00000015; width: 100%; border: 2px solid #00000030">
                        <p style="line-height: 0cm; font-size: ${(size * 8) / 100}px">${arrayPostGrad[item.postGrad].pg} ${item.nomeGuerra}</p>
                    </div>
                </div>
            `
            if (index == contadorFim) {
                html = html + footer
                contadorFim = contadorFim + qtd
                contadorInicio = contadorInicio + qtd
            }
        })

        return html
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={style.body}>
            <View style={style.area1}>
                <Text style={style.header}>Impressão de todos os adesivos</Text>
            </View>
            {
                loadingList ?
                    (<View style={style.area2}><ActivityIndicator color={minhascores.color3} size={50} /></View>)
                    :
                    (<View style={style.area2}>
                        <Text style={localStyle.header}>Ajustes para impressão</Text>
                        <View style={localStyle.areaSlider}>
                            <Text style={localStyle.h1}>Tamanho do QR Code: <Text style={localStyle.simpleText}>{sizeQR} x {sizeQR}</Text></Text>
                            <Slider
                                style={localStyle.slider}
                                minimumValue={50}
                                value={sizeQR}
                                onValueChange={value => { setSizeQR(value) }}
                                step={2}
                                maximumValue={250}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                            />
                        </View>

                        <View style={localStyle.areaSlider}>
                            <Text style={localStyle.h1}>Quantidade por folha: <Text style={localStyle.simpleText}>{qtdQR} x {qtdQR}</Text></Text>
                            <Slider
                                style={localStyle.slider}
                                minimumValue={2}
                                value={qtdQR}
                                onValueChange={value => { setQtdQR(value) }}
                                step={1}
                                
                                maximumValue={100}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                            />
                        </View>

                        <TouchableOpacity style={{ ...style.btnImprimir, marginTop: 150 }} onPress={() => {
                            setLoadingList(true);
                            Print.printAsync({
                                html: makeHTML(sizeQR, qtdQR)
                            }).then(() => {
                                setLoadingList(false)
                            })
                        }}>
                            <Text style={style.btnImprimirText}>Imprimir ou salvar em PDF</Text>
                            <AntDesign name="printer" size={24} style={style.btnIcons} />
                        </TouchableOpacity>
                    </View>
                    )
            }
        </ImageBackground>
    );
}

const localStyle = StyleSheet.create({
    header: {
        fontSize: 22,
        color: 'white',
        borderBottomColor: minhascores.color5,
        borderBottomWidth: 2,
        marginBottom: 10
    },
    h1: {
        color: 'white',
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center'
    },
    simpleText: {
        color: '#ffffff80',
        fontSize: 15,
        alignSelf: 'center'
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 10
    },
    areaSlider: {
        marginBottom: 10,
        backgroundColor: '#ffffff10',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        width: '80%',
        flexDirection: 'column'
    }
})

