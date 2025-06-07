// src/screens/ListarOcorrenciasScreen.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../../components/common/back.arrow.component";
import { URL_ARYA_LOCAL_API } from "../../../constants";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import OcorrenciaListItem from "../../components/common/ocorrencias/ocorrencia.list.item";
import { OcorrenciaInterface } from "../../model/ocorrencia.interface";

// Tipando a navegação
type ListarOcorrenciasNavProps = NativeStackNavigationProp<RootStackParamList>;

const ListarOcorrenciasScreen = () => {
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<ListarOcorrenciasNavProps>();

  const fetchOcorrencias = async () => {
    try {
      setError(null);
      const response = await axios.get<OcorrenciaInterface[]>(
        `${URL_ARYA_LOCAL_API}/ocorrencias`
      );
      const sortedData = response.data.sort(
        (a, b) =>
          new Date(b.dataOcorrencia).getTime() -
          new Date(a.dataOcorrencia).getTime()
      );
      setOcorrencias(sortedData);
    } catch (err) {
      console.error("Erro ao buscar ocorrências:", err);
      setError("Não foi possível carregar as ocorrências. Tente novamente.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Adiciona um listener para focar na tela, que recarrega os dados
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      fetchOcorrencias();
    });

    // Retorna a função de limpeza para remover o listener
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOcorrencias();
  }, []);

  // Função para lidar com o clique em um item da lista
  const handleItemPress = (ocorrencia: OcorrenciaInterface) => {
    navigation.navigate("OcorrenciasDetailsScreen", { ocorrencia: ocorrencia });
  };

  // Renderiza o estado de carregamento inicial
  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Renderiza o estado de erro
  if (error && ocorrencias.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="cloud-offline-outline" size={60} color="#555" />
        <Text style={styles.emptyText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchOcorrencias}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderOcorrencias = () => {
    if (ocorrencias.length === 0) {
      return (
        <View style={styles.centerEmpty}>
          <Ionicons name="checkmark-done-circle-outline" size={60} color="#555" />
          <Text style={styles.emptyText}>Nenhuma ocorrência registrada.</Text>
        </View>
      );
    }

    return ocorrencias.map((item) => (
      <OcorrenciaListItem
        key={item.idOcorrencia}
        item={item}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <BackArrow color="#fff" />
      <Text style={styles.headerTitle}>Histórico de Ocorrências</Text>
      
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
  
        {ocorrencias.map((item) => (
          <OcorrenciaListItem
            key={item.idOcorrencia}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingTop: 70,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  centerEmpty: {
    paddingTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#013EB0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListarOcorrenciasScreen;