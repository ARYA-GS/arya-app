// src/components/OcorrenciaModal.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// As props continuam as mesmas, mas o componente não vai mais se gerenciar com <Modal>
interface OcorrenciaModalProps {
  onClose: () => void;
  onSelectOcorrencia: (tipo: 'Incêndio' | 'Enchente' | 'Ventania') => void;
}

const OcorrenciaModal: React.FC<OcorrenciaModalProps> = ({ onClose, onSelectOcorrencia }) => {
  // A raiz do componente agora é um Pressable que cobre a tela,
  // permitindo fechar o modal ao clicar no fundo escuro.
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      {/* Usamos Pressable aqui também para evitar que o clique no modal feche ele */}
      <Pressable> 
        <View style={styles.container}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Registrar ocorrência</Text>
          
          <View style={styles.ocorrenciasContainer}>
            <TouchableOpacity style={styles.ocorrenciaButton} onPress={() => onSelectOcorrencia('Incêndio')}>
              <View style={[styles.ocorrenciaCircle, {backgroundColor: '#ff6961'}]}></View>
              <Text style={styles.ocorrenciaLabel}>Incêndio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ocorrenciaButton} onPress={() => onSelectOcorrencia('Enchente')}>
              <View style={[styles.ocorrenciaCircle, {backgroundColor: '#77b5fe'}]}></View>
              <Text style={styles.ocorrenciaLabel}>Enchente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ocorrenciaButton} onPress={() => onSelectOcorrencia('Ventania')}>
              <View style={[styles.ocorrenciaCircle, {backgroundColor: '#fdfd96'}]}></View>
              <Text style={styles.ocorrenciaLabel}>Ventania</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // O overlay agora é uma View com posicionamento absoluto
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Garante que ele fique por cima de tudo
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  // O container do modal em si (o painel branco)
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingTop: 40,
    width: '100%',
    alignItems: "center",
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },
  ocorrenciasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  ocorrenciaButton: {
    alignItems: 'center',
  },
  ocorrenciaCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  ocorrenciaLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default OcorrenciaModal;