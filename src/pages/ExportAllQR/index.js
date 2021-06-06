import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style'
import firebase from '../../services/firebaseConnection'
import { cores, arrayPostGrad } from '../Register/listas'
import * as Print from 'expo-print';
import minhascores from '../../styles/colors'

export default function ExportAllQR() {

    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

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

    function makeHTML() {
        const tamanhoQRCode = 500

        let HTML = '<div style="display: flex; padding: 1em; width: 21cm; flex-wrap: wrap;">'
        users.forEach(item => {
            HTML = HTML + `

            <div style="width: 30%; display: flex; justify-content: space-between; align-items: center; flex-direction: column; border: 3px dashed #00000030; margin: .2em;">
                <img src="https://chart.googleapis.com/chart?chs=${tamanhoQRCode}x${tamanhoQRCode}&cht=qr&chl=${item.key}" width="100%">
                <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; background-color: #00000015; width: 100%;">
                    <p style="line-height: 0cm;">${arrayPostGrad[item.postGrad].pg} ${item.nomeGuerra}</p>
                    
                </div>
            </div>
            `
        })

        return HTML + '</div>'
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={style.body}>
            <View style={style.area1}>
                <Text style={style.header}>Impressão de todos os selos</Text>
            </View>
            {
                loadingList ?
                    (<View style={style.area2}><ActivityIndicator color={minhascores.color3} size={50} /></View>)
                    :
                    (<View style={style.area2}>
                        <TouchableOpacity style={style.btnImprimir} onPress={() => {
                            Print.printAsync({
                                html: makeHTML()
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


