import styled from 'styled-components/native';

const cores = {
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
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#484848'
})`
background: ${cores.color1};
color: ${cores.color7};
width: 100%;
height: 100%;
text-align: left;
margin-left: 15px
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
    color: ${cores.color1};
    font-weight: bold;
    text-transform: uppercase;
`;


export const Link = styled.TouchableOpacity`
   margin-top:50px;
`;


export const LinkText = styled.Text`
    color: ${cores.color5}
`;




