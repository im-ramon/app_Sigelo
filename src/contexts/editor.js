import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EditorContext = createContext({});

function EditorProvider({ children }) {

    const [_nomeCompleto, _setNomeCompleto] = useState('buscando...')
    const [_postGrad, _setPostGrad] = useState(0)
    const [_nomeGuerra, _setNomeGuerra] = useState('buscando...')
    const [_modelo, _setModelo] = useState('buscando...')
    const [_placa, _setPlaca] = useState('buscando...')
    const [_cor, _setCor] = useState(0)
    const [_tipoAcesso, _setTipoAcesso] = useState('buscando...')
    const [_validade, _setValidade] = useState('buscando...')
    const [_documentoIdentidade, _setDocumentoIdentidade] = useState('buscando...')
    const [_observacoes, _setObservacoes] = useState('buscando...')

    return (
        <EditorContext.Provider value={{ _nomeCompleto, _postGrad, _nomeGuerra, _modelo, _placa, _cor, _tipoAcesso, _validade, _documentoIdentidade, _observacoes }}>
            {children}
        </EditorContext.Provider>
    );
}

export default EditorProvider;