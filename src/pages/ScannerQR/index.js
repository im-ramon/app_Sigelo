import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from '../../../src/services/firebaseConnection';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../Register/listas';
import { arrayPostGrad } from '../Register/listas'

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [modalActive, setModalActive] = useState(false)

  const [nomeCompleto, setNomeCompleto] = useState('buscando...')
  const [postGrad, setPostGrad] = useState('buscando...')
  const [nomeGuerra, setNomeGuerra] = useState('buscando...')
  const [modelo, setModelo] = useState('buscando...')
  const [placa, setPlaca] = useState('buscando...')
  const [cor, setCor] = useState('buscando...')
  const [tipoAcesso, setTipoAcesso] = useState('buscando...')
  const [validade, setValidade] = useState('buscando...')
  const [documentoIdentidade, setDocumentoIdentidade] = useState('buscando...')
  const [observacoes, setObservacoes] = useState('buscando...')


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  async function dados(data) {
    await firebase.database().ref('veiculos/' + data.replace(/\.?\,?\#?\$?\[?\]?/g, '')).on('value', (snapshot) => {
      try {
        setNomeCompleto(snapshot.val().nomeCompleto)
        setPostGrad(snapshot.val().postGrad)
        setNomeGuerra(snapshot.val().nomeGuerra)
        setModelo(snapshot.val().modelo)
        setPlaca(snapshot.val().placa)
        setCor(snapshot.val().cor)
        setTipoAcesso(snapshot.val().tipoAcesso)
        setValidade(snapshot.val().validade)
        setDocumentoIdentidade(snapshot.val().documentoIdentidade)
        setObservacoes(snapshot.val().observacoes)

        setModalActive(true)
      } catch (error) {
        setModalActive(false)
        alert('Identificador do selo não encontrado no banco de dados!')
      }
    })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    dados(data);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textAbsolute}>Aponte a câmera para o selo.</Text>

      <Modal animationType="slide" visible={modalActive} >
        <View style={styles.modalContainer}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setModalActive(false) }}>
              <Ionicons name="close-circle-sharp" size={32} color="#F27405" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>

            <Text style={styles.text}>Propietário: <Text style={styles.textDestaque}>{nomeGuerra}</Text></Text>
            <Text style={styles.text}>Nome completo: <Text style={styles.textDestaque}>{nomeCompleto}</Text></Text>
            <Text style={styles.text}>Documento de Identidade: <Text style={styles.textDestaque}>{documentoIdentidade}</Text></Text>
            <Text style={styles.text}>Modelo do veículo: <Text style={styles.textDestaque}>{modelo}</Text></Text>
            <Text style={styles.text}>Placa do veículo: <Text style={styles.textDestaque}>{placa}</Text></Text>
            <Text style={styles.text}>Cor do veículo: <Text style={styles.textDestaque}>{cor}</Text></Text>
            <Text style={styles.text}>Áreas de acesso permitido: <Text style={styles.textDestaque}>{tipoAcesso}</Text></Text>
            <Text style={styles.text}>Validade: <Text style={styles.textDestaque}>{validade}</Text></Text>
            <Text style={styles.text}>Observações: <Text style={styles.textDestaque}>{observacoes}</Text></Text>

          </View>

        </View>
      </Modal>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Escanear outro selo'} onPress={() => setScanned(false)} />}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#141414',
    flex: 1,
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
  text: {
    color: '#ffffff',
    fontSize: 18
  },
  textDestaque: {
    color: '#F27405',
    fontWeight: '900',
    textDecorationLine: 'underline'
  },
  textAbsolute: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 18,
    top: 30,
    color: '#dedede'
  }
})