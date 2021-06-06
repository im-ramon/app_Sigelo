import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Image } from 'react-native'
import { cores, arrayPostGrad } from '../Register/listas'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText, Link, LinkText, styles } from '../../styles/styles';
import { Picker } from '@react-native-picker/picker'
import { style } from './style'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../../services/firebaseConnection';
import { AppContext } from '../../contexts/appContexts';
import minhascores from '../../styles/colors'

export default function Lista({ data }) {

    const [key, setKey] = useState(data.key)
    const [postGrad, setPostGrad] = useState(data.postGrad)
    const [nomeGuerra, setNomeGuerra] = useState(data.nomeGuerra)
    const [validade, setValidade] = useState(new Date(data.validade));

    const tamanhoQRCode = 500

    return (
        <View style={style.qrCodeArea}>
            <Image
                style={style.qrCodeImage}
                source={{ uri: `https://chart.googleapis.com/chart?chs=${tamanhoQRCode}x${tamanhoQRCode}&cht=qr&chl=${key}` }}
            />
            <View style={style.informationArea}>
                <Text style={style.informationText}>{arrayPostGrad[postGrad].pg} {nomeGuerra}</Text>
                <Text style={style.informationText}>Validade: {String(`${(validade.getDate() <= 9) ? '0' + (validade.getDate()) : validade.getDate()}/${(validade.getMonth() + 1) <= 9 ? '0' + (validade.getMonth() + 1) : (validade.getMonth() + 1)}/${validade.getFullYear()}`)} </Text>
            </View>
        </View>
    )
}