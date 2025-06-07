import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

interface DetalhesOcorrenciaModalProps {
  visible: boolean;
  tipoOcorrencia: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (descricao: string) => void;
}

const DetalhesOcorrenciaModal: React.FC<DetalhesOcorrenciaModalProps> = ({
  visible,
  tipoOcorrencia,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  const [descricao, setDescricao] = useState('');

  const handleSubmit = () => {
    if (descricao.trim().length > 0) {
      onSubmit(descricao);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Detalhes de {tipoOcorrencia}</Text>
          <Text style={styles.label}>Descreva o que você está vendo:</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Fogo próximo à vegetação seca..."
            placeholderTextColor="#888"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />

          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Confirmar Ocorrência</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
             <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { 
    backgroundColor: "white", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 35, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 10, alignSelf: 'flex-start' },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1E232C',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#a9a9a9',
  },
  submitButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  cancelText: {
    color: 'red',
    marginTop: 15,
    fontSize: 14,
  }
});

export default DetalhesOcorrenciaModal;