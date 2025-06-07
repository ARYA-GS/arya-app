// src/components/common/ocorrencias/ocorrencia.list.item.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/root.stack.navigation'; // <-- AJUSTE O CAMINHO
import { OcorrenciaInterface } from '../../../model/ocorrencia.interface'; // <-- AJUSTE O CAMINHO

interface OcorrenciaListItemProps {
  item: OcorrenciaInterface;
}

// Helper para renderizar uma linha de detalhe dentro do card
const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

// Tipando o hook useNavigation
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const OcorrenciaListItem: React.FC<OcorrenciaListItemProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleVerDetalhes = () => {
    setModalVisible(false);
    navigation.navigate('OcorrenciasDetailsScreen', { ocorrencia: item });
  };

  const formattedDate = new Date(item.dataOcorrencia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View>
      <TouchableOpacity 
        style={styles.card} 
        onPress={handleVerDetalhes}
        activeOpacity={0.8}
      >
        <DetailRow label="Tipo" value={item.tipoOcorrencia} />
        <DetailRow label="Cidade" value={item.endereco.cidade} />
        <DetailRow label="Data" value={formattedDate} />
      
        <TouchableOpacity 
          style={styles.moreButton} 
          onPress={(e) => {
            e.stopPropagation(); 
            setModalVisible(true);
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="ellipsis-vertical" size={22} color="#a0a0a0" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Modal de Ação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>O que deseja fazer?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleVerDetalhes}>
              <Text style={styles.modalButtonText}>Ver detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { borderTopWidth: 0 }]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { color: '#ff6961' }]}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 16,
  },
  moreButton: {
    position: 'absolute',
    top: 10,
    right: 5,
    padding: 10,
    zIndex: 1,
  },
  // Estilos para o Modal de Ação
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#3c3c3c',
    borderRadius: 15,
    paddingTop: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  modalButtonText: {
    color: '#4dabf7',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default OcorrenciaListItem;