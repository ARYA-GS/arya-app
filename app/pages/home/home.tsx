import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import ApiController from "../../components/api/api.controller";
import { WeatherModel } from "../../model/weather.model";
import { Hub } from "../../model/hub.interface";
import HubButton from "../../components/common/button/hub.button";
import { useAuth } from "../../components/context/auth.context";
import { useNavigation } from "@react-navigation/native";
import HubController from "../../components/api/hubs.controller";
import DroneController from "../../components/api/drones.controller";
import { DroneInterface } from "../../model/drone.interface";
import * as Location from "expo-location";
import { TabRoutes } from "../../model/tab.routes.enum";

function HomeScreen() {
  const [weather, setWeather] = useState<{
    temp: number | null;
    description: string;
  }>({ temp: null, description: "" });
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [drones, setDrones] = useState<DroneInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();
  const hubController = new HubController();
  const droneController = new DroneController();
  const apiController = new ApiController();

  useEffect(() => {
    requestLocationAndFetchWeather();
    fetchHubs();
    fetchDrones();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    requestLocationAndFetchWeather();
    fetchHubs();
    fetchDrones();
    setRefreshing(false);
  }, []);

  const requestLocationAndFetchWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar sua localização."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });

      fetchWeather(latitude, longitude);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const data = (await apiController.getOpenMeteo(
        latitude,
        longitude
      )) as WeatherModel;
      setWeather({
        temp: data.current_weather.temperature,
        description: String(data.current_weather.weathercode),
      });
    } catch (error) {
      console.error("Erro ao buscar previsão:", error);
    }
  };

  const fetchHubs = async () => {
    try {
      const hubs = await hubController.getHubs();
      setHubs(hubs as Hub[]);
    } catch (error) {
      console.error("Erro ao buscar hubs:", error);
    }
  };

  const fetchDrones = async () => {
    try {
      const drones = await droneController.getDrones();
      setDrones(drones as DroneInterface[]);
    } catch (error) {
      console.error("Erro ao buscar drones:", error);
    }
  };
  const handleProfile = () => {
    navigation.navigate("TabNavigation", { screen: TabRoutes.Perfil });
  };

  return (
    // <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#013EB0"]}
          tintColor="#013EB0"
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.name}>{user?.nome}</Text>
        </View>
        <TouchableOpacity onPress={handleProfile}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Drone Hero */}
      <Image
        source={require("../../assets/drone-2.png")}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Data cards */}
      <View style={styles.dataRow}>
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Atividade</Text>
          <Text style={styles.weatherText}>{drones.length} ativos</Text>
        </View>

        <View style={styles.weatherCard}>
          <Text style={styles.cardTitle}>Previsão do Tempo</Text>
          {weather.temp !== null ? (
            <>
              <Text style={styles.weatherText}>{weather.temp}°C</Text>
              <Text style={styles.weatherDesc}>Clima atual</Text>
            </>
          ) : (
            <Text style={styles.weatherDesc}>Carregando...</Text>
          )}
        </View>
      </View>

      <Text style={styles.hubTitle}>Conheça nossos Hubs: </Text>
      {hubs
        .filter((hub) => hub.status !== "Inativo")
        .map((hub) => (
          <HubButton
            key={hub.idHub}
            title={hub.nome}
            bairro={hub.endereco.bairro}
            onPress={() => {}}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 16,
    color: "#666",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginVertical: 16,
  },
  dataRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  chartCard: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "#d0e8ff",
    borderRadius: 16,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  weatherDesc: {
    fontSize: 12,
    color: "#333",
  },
  hubTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#fff",
  },
  hubButton: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 14,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  hubText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default HomeScreen;
