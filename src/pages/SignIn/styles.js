import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'

export const cores = {
    color1: "#121212", //tirei um "50" daqui, poder dar erro alguma hora na cor preta base
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
margin-bottom: 22px;
`;

export const AreaInput = styled.View`
flex-direction: row;
width: 65%;
height: 35px;
margin-bottom: 23px;
border-bottom-color: ${cores.color3};
border-bottom-width: 3px;
padding-bottom: 5px;
align-items: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#484848'
})`
background: ${cores.color1};
color: ${cores.color7};
width: 80%;
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
    margin-top: 30px; 
`;

export const SubmitText = styled.Text`
    color: ${cores.color7};
    font-weight: bold;
    text-transform: uppercase;
`;


export const Link = styled.TouchableOpacity`
   margin-top:50px;
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
        resizeMode: 'cover'
    }
});