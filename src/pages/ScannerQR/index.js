import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from '../../../src/services/firebaseConnection';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../Register/listas';
import { arrayPostGrad } from '../Register/listas'
import minhasCores from '../../styles/colors'
import { AppContext } from '../../contexts/appContexts'

export default function ScannerQR() {

  const { today } = useContext(AppContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [modalActive, setModalActive] = useState(false)

  const [loading, setLoading] = useState(false)

  const [nomeCompleto, setNomeCompleto] = useState('buscando...')
  const [postGrad, setPostGrad] = useState(0)
  const [nomeGuerra, setNomeGuerra] = useState('buscando...')
  const [modelo, setModelo] = useState('buscando...')
  const [placa, setPlaca] = useState('buscando...')
  const [cor, setCor] = useState(0)
  const [tipoAcesso, setTipoAcesso] = useState('buscando...')
  const [validade, setValidade] = useState('buscando...')
  const [documentoIdentidade, setDocumentoIdentidade] = useState('buscando...')
  const [observacoes, setObservacoes] = useState('buscando...')

  const [corRetorno, setCorRetorno] = useState(minhasCores.success)
  const [textoRetorno, setTextoRetorno] = useState('...')
  const [iconRetorno, setIconRetorno] = useState('time')

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (validade < today) {
      setCorRetorno(minhasCores.danger);
      setTextoRetorno('vencido')
      setIconRetorno('close')
    } else if (validade > today) {
      setCorRetorno(minhasCores.success);
      setTextoRetorno('ativo')
      setIconRetorno('checkmark')
    }
  }, [validade])

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
        setValidade(Date.parse(snapshot.val().validade))
        setDocumentoIdentidade(snapshot.val().documentoIdentidade)
        setObservacoes(!snapshot.val().observacoes ? 'Sem observações' : snapshot.val().observacoes)

        //Gambiarra para corrigir erro de atualização do "state: validade". Pesquisar porque está demorando de atualizar
        setModalActive(true)
        setLoading(false)

      } catch (e) {
        Alert.alert(
          `Ocorreu um erro`,
          `Não foi possível encontar os dados do adesivo escaneado no banco de dados. Por favor, tente novamente.\n\n- Informações técnicas do erro:\n\t${e}\n\t${data}`,
          [
            { text: "Tentar novamente", onPress: () => setScanned(false) }
          ],
          { cancelable: false }
        );

        setLoading(false)
      }
    })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true)
    setScanned(true);
    dados(data);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  let dataPrint = new Date(validade)

  return (
    <View style={styles.container}>
      <Text style={styles.textAbsolute}>Aponte a câmera para o QRCode no adesivo.</Text>

      <Modal animationType="slide" visible={modalActive} >
        <View style={styles.modalContainer}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setModalActive(false) }}>
              <Ionicons name="close-circle-sharp" size={32} color="#F27405" />
            </TouchableOpacity>
          </View>


          <View style={styles.modalBody}>
            <Text style={styles.headerH1}>Veículo encontrado:</Text>

            <Text style={styles.text}>Propietário: <Text style={styles.textAchado}>{`${arrayPostGrad[postGrad].pg} ${nomeGuerra}`}</Text></Text>
            <Text style={styles.text}>Nome completo: <Text style={styles.textAchado}>{nomeCompleto}</Text></Text>
            <Text style={styles.text}>Documento de Identidade: <Text style={styles.textAchado}>{documentoIdentidade}</Text></Text>
            <Text style={styles.text}>Modelo do veículo: <Text style={styles.textAchado}>{modelo}</Text></Text>
            <Text style={styles.text}>Placa do veículo: <Text style={styles.textAchado}>{placa}</Text></Text>
            <Text style={styles.text}>Cor do veículo: <Text style={styles.textAchado}>{cores[cor].cor}</Text></Text>
            <Text style={styles.text}>Áreas de acesso permitido: <Text style={styles.textAchado}>{tipoAcesso}</Text></Text>
            <Text style={styles.text}>Validade: <Text style={styles.textAchado}>{
              `${(dataPrint.getDate() <= 9) ? '0' + (dataPrint.getDate()) : dataPrint.getDate()}/${(dataPrint.getMonth() + 1) <= 9 ? '0' + (dataPrint.getMonth() + 1) : (dataPrint.getMonth() + 1)}/${dataPrint.getFullYear()}`
            }</Text></Text>
            <Text style={styles.text}>Observações: <Text style={styles.textAchado}>{observacoes}</Text></Text>

            <View style={{
              backgroundColor: corRetorno,
              marginTop: 35,
              height: 250,
              width: 300,
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 50,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#12121250'
            }}>
              <Ionicons name={iconRetorno} size={128} color='#ffffff' />
              <Text style={styles.textResposta}>Cadastro {textoRetorno}</Text>
            </View>
          </View>

        </View>
      </Modal>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {loading ? (<ActivityIndicator size={64} color={minhasCores.color3} />) : (scanned && <Button title={'Escanear outro selo'} onPress={() => setScanned(false)} />)}

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
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#141414',
    flexDirection: 'row'
  },
  headerH1: {
    color: '#dedede',
    textAlign: 'center',
    fontSize: 28,
    backgroundColor: '#F27405',
    width: '80%',
    paddingVertical: 5,
    fontWeight: 'bold',
    marginBottom: 30,
    borderRadius: 10,
  },
  modalBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 12,
  },
  text: {
    color: '#3C74A6',
    fontSize: 18,
    fontWeight: '900',
  },
  textAchado: {
    color: '#dedede',
    fontSize: 16,
  },
  textAbsolute: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 18,
    top: 30,
    color: '#dedede'
  },
  textResposta: {
    fontSize: 24,
    color: '#ffffff'
  },
  tipoRespota: {
    backgroundColor: '#121212',
    marginTop: 35,
    height: 250,
    width: 300,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10
  }
})