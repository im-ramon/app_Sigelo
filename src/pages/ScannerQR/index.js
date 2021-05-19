import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from '../../../src/services/firebaseConnection';
import { Ionicons } from '@expo/vector-icons';

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [modalActive, setModalActive] = useState(false)

  const [nome, setNome] = useState('buscando...')
  const [cor, setCor] = useState('buscando...')
  const [modelo, setModelo] = useState('buscando...')
  const [tipo, setTipo] = useState('buscando...')
  const [validade, setValidade] = useState('buscando...')


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  async function dados(data) {
    await firebase.database().ref('users/' + data).on('value', (snapshot) => {
      try {
        setNome(snapshot.val().nome)
        setCor(snapshot.val().cor)
        setModelo(snapshot.val().modelo)
        setTipo(snapshot.val().tipo)
        setValidade(snapshot.val().validade)
        setModalActive(true)
      } catch (error) {
        setModalActive(false)
        alert('eroooou!')
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

  // function getDate(validade){
  //   let dataAgora = new Date()
  //   let dataValidade = new Date(validade)

  //   return `${dataValidade}`

  // }

  return (
    <View style={styles.container}>

      <Modal animationType="slide" visible={modalActive} >
        <View style={styles.modalContainer}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setModalActive(false) }}>
              <Ionicons name="close-circle-sharp" size={32} color="#F27405" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>

            <Text style={styles.text}>Propietário: <Text style={styles.textDestaque}>{nome}</Text></Text>
            <Text style={styles.text}>Cor do veículo: <Text style={styles.textDestaque}>{cor}</Text></Text>
            <Text style={styles.text}>Modelo do veículo: <Text style={styles.textDestaque}>{modelo}</Text></Text>
            <Text style={styles.text}>Tipo de acesso: <Text style={styles.textDestaque}>{tipo}</Text></Text>
            <Text style={styles.text}>Validade: <Text style={styles.textDestaque}>{validade}</Text></Text>
            {/* <Text style={styles.text}>Hoje: {getDate(validade)} </Text> */}

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
  }
})