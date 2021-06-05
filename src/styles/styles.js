import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'

export const cores = {
    color1: "#121212",
    color2: "#011126",
    color3: "#3C74A6",
    color4: "#73AABF",
    color5: "#F27405",
    color6: "#F24405",
    color7: "#e1e1e1",
}

export const Background = styled.View`
flex: 1;
background-color: ${cores.color1};
`;

export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items: center;
justify-content: center;
`;

export const Logo = styled.Image`
width: 214px;
height: 264px;
margin-bottom: 16px;
`;

export const AreaInput = styled.View`
flex-direction: row;
width: 65%;
height: 40px;
margin-bottom: 23px;
border-bottom-color: ${cores.color3};
border-bottom-width: 3px;
padding-bottom: 5px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
padding-top: 8px;
background: ${'#00000050'};
align-items: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#484848'
})`
color: ${cores.color7};
width: 75%;
height: 100%;
text-align: left;
margin-left: 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: ${cores.color3};
    width: 65%;
    height: 60px;
    margin-top: 10px; 
    border-radius: 10px;
`;

export const SubmitText = styled.Text`
    color: ${cores.color7};
    font-weight: bold;
    text-transform: uppercase;
`;


export const Link = styled.TouchableOpacity`
   margin-top: 15px;
`;


export const LinkText = styled.Text`
    color: ${cores.color5};
`;

export const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "150%",
        width: "150%",
    },
    checkbox: {
        
    }, 
    textCheckbox: {
        color: cores.color7+ '99',
    }, 
    checkboxArea: {
        marginTop: 15,
        marginBottom: 50,
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    helpIcon: {
        color: cores.color1,
    },
    helpBtn: {
        backgroundColor: cores.color5 + '50',
        borderRadius: 25,
        width: 25,
        height: 25,
        top: 30,
        right: 15,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});