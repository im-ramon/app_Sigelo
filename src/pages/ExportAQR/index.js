import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons';
import { style } from './style'
import firebase from '../../services/firebaseConnection'
import Lista from './Lista'
import * as Print from 'expo-print';


export default function ExportAQR() {

    const [users, setUsers] = useState([])
    const [loadingList, setLoadingList] = useState(true)

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

    const htmlX = '<p>Falta implementar a conversão de um componente em JSX ou HTML</p>'

    return (
        <View style={style.body}>
            <View style={style.area1}>
                <Text style={style.header}>Impressão de todos os selos</Text>
                <TouchableOpacity style={style.btnImprimir} onPress={()=>{Print.printAsync({
                    html: htmlX,
                    width: 150,
                    height: 150
                })}}>
                    <Text style={style.btnImprimirText}>Imprimir ou salvar em PDF</Text>
                    {/* <AntDesign name="pdffile1" size={24} style={style.btnIcons}/> */}
                    <AntDesign name="printer" size={24} style={style.btnIcons} />
                </TouchableOpacity>
            </View>

            <View style={style.area2}>
                <View style={style.flatList}>
                    {loadingList ?

                        (<ActivityIndicator color="#3C74A6" size={45} />)

                        : (
                            <FlatList
                                keyExtractor={item => item.key}
                                data={users}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (<Lista data={item} />)}
                            />

                        )}

                </View>
            </View>
        </View>
    );
}


