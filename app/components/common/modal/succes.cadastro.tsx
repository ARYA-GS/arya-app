import { Modal, View, Text, StyleSheet } from 'react-native';
import ButtonStandard from '../button/button.standard';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  email: string;
  onRedirect: () => void;
}

const SuccessModal = ({ visible, onClose, name, email, onRedirect }: SuccessModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cadastrado com sucesso, {name}!</Text>
          <Text style={styles.modalMessage}>{email}</Text>
          <Text style={styles.redirectText}>Clique abaixo para ser redirecionado para a tela de login.</Text>
          <ButtonStandard text="Ir para Login" onPress={onRedirect} />
          <ButtonStandard text="Fechar" onPress={onClose} />
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
  redirectText: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default SuccessModal;