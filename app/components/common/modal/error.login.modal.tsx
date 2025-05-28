import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const ErrorLoginModal = ({ visible, onClose, message }: ErrorModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Erro</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalMessage: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default ErrorLoginModal;