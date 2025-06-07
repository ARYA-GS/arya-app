// src/components/OcorrenciaCard.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/root.stack.navigation';
import { OcorrenciaInterface } from '../../../model/ocorrencia.interface';


// Interface para os dados de uma ocorrência
// (Pode ser movida para um arquivo de tipos separado, se preferir)


interface OcorrenciaCardProps {
  item: OcorrenciaInterface ;
}

// Tipando o hook useNavigation para ter autocomplete e segurança de tipo
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const OcorrenciaCard: React.FC<OcorrenciaCardProps> = ({ item }) => {
  // Estado para controlar a visibilidade do modal de ação
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  // Função para navegar para a tela de detalhes
  const handleVerDetalhes = () => {
    setModalVisible(false); // Fecha o modal antes de navegar
    navigation.navigate('OcorrenciasDetailsScreen', { 
      ocorrencia: { 
        ...item, 
        tipoOcorrencia: item.tipoOcorrencia,
        idOcorrencia: (item as any).idOcorrencia ?? '', 
      } 
    });
  };

  // Helper para obter o ícone e a cor com base no tipo de ocorrência
  const getOcorrenciaDetails = (tipoOcorrencia: string) => {
    switch (tipoOcorrencia.toLowerCase()) {
      case 'incêndio':
        return { icon: 'flame', color: '#ff6961' };
      case 'enchente':
      case 'enchente em área urbana':
        return { icon: 'water', color: '#77b5fe' };
      case 'ventania':
        return { icon: 'leaf', color: '#fdfd96' };
      default:
        return { icon: 'alert-circle', color: '#ccc' };
    }
  };

  const { icon, color } = getOcorrenciaDetails(item.tipoOcorrencia);

  const formattedDate = new Date(item.dataOcorrencia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={28} color="#fff" />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.tipoOcorrencia}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.descricao}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.location}>{item.endereco.cidade}, {item.endereco.estado}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      {/* --- BOTÃO DE OPÇÕES (3 PONTOS) --- */}
      <TouchableOpacity style={styles.moreButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={24} color="#a0a0a0" />
      </TouchableOpacity>

      {/* --- MODAL DE AÇÃO --- */}
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
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 40, // Espaço para o botão de opções
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#b0b0b0',
    fontSize: 14,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  location: {
    color: '#888',
    fontSize: 12,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  moreButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 10, // Aumenta a área de toque
    zIndex: 1,
  },
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
    color: '#4dabf7', // Cor azul para ação principal
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default OcorrenciaCard;