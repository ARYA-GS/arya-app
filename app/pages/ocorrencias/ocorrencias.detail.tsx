// src/screens/OcorrenciasDetailsScreen.tsx

import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import BackArrow from "../../components/common/back.arrow.component";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import { URL_ARYA_LOCAL_API } from "../../../constants";
import ButtonStandard from "../../components/common/button/button.standard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ConfirmationModal from "../../components/common/modal/confirmacao.delete.modal";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

type OcorrenciasDetailsRouteProp = RouteProp<
  RootStackParamList,
  "OcorrenciasDetailsScreen"
>;

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const OcorrenciasDetailsScreen = () => {
  const route = useRoute<OcorrenciasDetailsRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { ocorrencia } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date(ocorrencia.dataOcorrencia).toLocaleString(
    "pt-BR"
  );

  const handleDeleteOcorrencia = async () => {
    const id = ocorrencia.idOcorrencia;
    if (!id) return;
    
    setIsDeleting(true);
    
    try {
      const response = await axios.delete(
        `${URL_ARYA_LOCAL_API}/ocorrencias/${id}`
      );
      if (response.status === 200 || response.status === 204) {
        Alert.alert("Sucesso", "A ocorrência foi excluída.");
        setModalVisible(false);
        navigation.goBack();
      } else {
        Alert.alert("Erro", `Não foi possível excluir a ocorrência. (Status: ${response.status})`);
      }
    } catch (error) {
      console.error("Erro ao excluir ocorrência:", error);
      Alert.alert("Erro", "Ocorreu um erro de conexão ao tentar excluir a ocorrência.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!ocorrencia) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.value}>Nenhuma ocorrência selecionada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackArrow color="#fff" />
      <Text style={styles.headerTitle}>Detalhes da Ocorrência</Text>
      <ScrollView>
        <View style={styles.card}>
          <DetailRow label="Tipo" value={ocorrencia.tipoOcorrencia} />
          <DetailRow label="Descrição" value={ocorrencia.descricao} />
          <DetailRow label="Data" value={formattedDate} />
          <DetailRow label="Severidade" value={ocorrencia.nivelSeveridade} />
          <DetailRow label="Bairro" value={ocorrencia.endereco.bairro} />
          <DetailRow label="Cidade" value={ocorrencia.endereco.cidade} />
          <DetailRow label="Estado" value={ocorrencia.endereco.estado} />
        </View>

        <View style={styles.deletar}>
          <ButtonStandard
            text="Excluir Ocorrência"
            color="#d13530"
            width={370}
            borderRadius={10}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      {/* 2. USE O COMPONENTE REUTILIZÁVEL AQUI */}
      <ConfirmationModal
        visible={modalVisible}
        title="Confirmar Exclusão"
        message="Tem certeza de que deseja excluir esta ocorrência? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Voltar"
        isSubmitting={isDeleting}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteOcorrencia}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingTop: 70,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: "#a0a0a0",
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  deletar: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default OcorrenciasDetailsScreen;