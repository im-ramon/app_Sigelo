import React from 'react'
import { View, Text } from 'react-native'
import cores from '../../styles/colors'

export default function Conf() {
    return (
        <View style={{backgroundColor: cores.color1, flex: 1}}>
            <Text style={{color: cores.light}}>Página de configurações</Text>
            <Text style={{color: cores.light}}>Implementação futura...</Text>
        </View>
    )
}
