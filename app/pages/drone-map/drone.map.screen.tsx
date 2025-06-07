// src/screens/DroneMapScreen.tsx

import React, { use, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Location from 'expo-location';
import axios from 'axios'; // <-- 1. Importe o Axios

// Seus outros imports
import { minimalMapStyle, darkMapStyle } from "./config.map";
import { droneLocations } from "./lista.drones";
import OcorrenciaModal from "../../components/common/modal/ocorrencia.modal";
import DetalhesOcorrenciaModal from "../../components/common/modal/details.ocorrencia.modal";
import { useAuth } from "../../components/context/auth.context";
import { URL_ARYA_LOCAL_API } from "../../../constants";

// Interfaces e Tipos
interface DroneLocation {
  id: string | number;
  latitude: number;
  longitude: number;
  tipo?: 'drone' | OcorrenciaTipo;
}

type OcorrenciaTipo = 'Incêndio' | 'Enchente' | 'Ventania';

const DroneMapScreen = () => {
  const [markers, setMarkers] = useState<DroneLocation[]>(
    droneLocations.map(d => ({ ...d, tipo: 'drone' }))
  );
  const user = useAuth();
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  const [isOcorrenciaModalVisible, setOcorrenciaModalVisible] = useState(false);
  const [isDetalhesModalVisible, setDetalhesModalVisible] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<OcorrenciaTipo | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  const handleSelectOcorrencia = (tipo: OcorrenciaTipo) => {
    setOcorrenciaModalVisible(false);
    setSelectedOcorrencia(tipo);
    setDetalhesModalVisible(true);
  };

  // 2. FUNÇÃO ATUALIZADA PARA USAR AXIOS
  const handleConfirmarOcorrencia = async (descricao: string) => {
    setIsSubmitting(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não é possível registrar a ocorrência sem acesso à sua localização.');
      setIsSubmitting(false);
      setDetalhesModalVisible(false);
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      const enderecoInfo = reverseGeocode[0] || {};

      const payload = {
        tipoOcorrencia: selectedOcorrencia === 'Enchente' ? 'Enchente em área urbana' : selectedOcorrencia,
        nivelSeveridade: 10,
        dataOcorrencia: new Date().toISOString(),
        descricao: descricao,
        idUsuario: user.user?.id || "Usuário não autenticado",
        endereco: {
          bairro: enderecoInfo.district || "A ser definido",
          cidade: enderecoInfo.city || enderecoInfo.subregion || "A ser definida",
          estado: enderecoInfo.region || "SP",
          pais: enderecoInfo.country || "Brasil"
        }
      };

      const response = await axios.post(`${URL_ARYA_LOCAL_API}/ocorrencias`, payload);

      if (response.status === 200 || response.status === 201) {
        const newMarker: DroneLocation = {
          id: `ocorrencia_${new Date().getTime()}`,
          latitude,
          longitude,
          tipo: selectedOcorrencia,
        };
        setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        Alert.alert('Sucesso!', 'Sua ocorrência foi registrada.');
      }
    } catch (error) {
      console.error('Erro ao registrar ocorrência:', error);
      Alert.alert('Erro', 'Não foi possível registrar a ocorrência.');
    } finally {
      setIsSubmitting(false);
      setDetalhesModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ARYA - Drone Map</Text>

      <View style={styles.rightButtonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleDarkMode}>
          <Ionicons name={isDarkMode ? "sunny" : "moon"} size={28} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => setOcorrenciaModalVisible(true)}>
          <AntDesign name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -14.235,
          longitude: -51.9253,
          latitudeDelta: 25,
          longitudeDelta: 25,
        }}
        customMapStyle={isDarkMode ? darkMapStyle : minimalMapStyle}
        showsPointsOfInterest={false}
        showsBuildings={false}
      >
        {markers.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.tipo === 'drone' ? `Drone: ${item.id}` : `Ocorrência: ${item.tipo}`}
          >
            <Image
              source={
                item.tipo === 'drone'
                  ? isDarkMode
                    ? require("../../assets/3.png")
                    : require("../../assets/1.png")
                  : require("../../assets/ocorrencia-icon.png")
              }
              style={styles.markerIcon}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Acompanhe nossos drones:</Text>
          <Text style={styles.legendItem}>⬤ alimentos</Text>
          <Text style={styles.legendItem}>⬤ remédios</Text>
          <Text style={styles.legendItem}>⬤ suprimentos</Text>
        </View>
      </View>
      
      {isOcorrenciaModalVisible && (
        <OcorrenciaModal
          onClose={() => setOcorrenciaModalVisible(false)}
          onSelectOcorrencia={handleSelectOcorrencia}
        />
      )}
      
      {isDetalhesModalVisible && (
        <DetalhesOcorrenciaModal
          visible={isDetalhesModalVisible}
          tipoOcorrencia={selectedOcorrencia ?? ""}
          isSubmitting={isSubmitting}
          onClose={() => setDetalhesModalVisible(false)}
          onSubmit={handleConfirmarOcorrencia}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#1c1c1c',
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 35,
    height: 35,
  },
  rightButtonsContainer: {
    position: 'absolute',
    top: 120,
    right: 15,
    zIndex: 10,
    gap: 15,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  legend: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 15,
  },
  legendTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  legendItem: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 4,
  },
});

export default DroneMapScreen;