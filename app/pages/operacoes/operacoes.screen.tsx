import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  crisisAlertsData,
  droneData,
  ecoPointsData,
  fleetStatusData,
  highDangerLocationsData,
  impactMetricsData,
  userData,
  weatherData,
} from "./data.operacoes";
import { WidgetCard } from "../../components/common/home/widget.card";
import { CrisisAlertItem } from "../../components/common/home/crisis.alert.item";
import { DangerLocationItem } from "../../components/common/home/danger.location.item";

const OperacoesScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {userData.name}</Text>
          <Text style={styles.subGreeting}>Painel de Controle ARYA</Text>
        </View>
        <Image
          source={{ uri: userData.profileImageUrl }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.droneSection}>
        <Image
          source={{ uri: droneData.imageUrl }}
          style={styles.droneImage}
          resizeMode="cover"
        />
        <View style={styles.droneStatusOverlay}>
          <Text style={styles.droneModel}>{droneData.model}</Text>
          <Text style={styles.droneStatus}>{droneData.status}</Text>
        </View>
      </View>

      <View style={styles.widgetsGrid}>
        <WidgetCard title="Clima na Operação" style={styles.widgetFullWidth}>
          <Text style={styles.weatherLocation}>{weatherData.location}</Text>
          <Text style={styles.weatherTemp}>
            {weatherData.temperature} - {weatherData.condition}
          </Text>
          <Text style={styles.weatherDetails}>Vento: {weatherData.wind}</Text>
          {weatherData.alert && (
            <Text style={styles.weatherAlert}>{weatherData.alert}</Text>
          )}
        </WidgetCard>

        <WidgetCard title="Status da Frota" style={styles.widgetHalfWidth}>
          <Text style={styles.widgetTextBold}>
            Ativos: {fleetStatusData.active}
          </Text>
          <Text style={styles.widgetText}>
            Carregando: {fleetStatusData.charging}
          </Text>
          <Text style={styles.widgetText}>
            Manutenção: {fleetStatusData.maintenance}
          </Text>
          <Text style={styles.widgetSubTitle}>Cargas Primárias:</Text>
          <Text style={styles.widgetTextSmall}>
            💊 {fleetStatusData.cargo.medical} | 💧{" "}
            {fleetStatusData.cargo.foodWater} | 📡 {fleetStatusData.cargo.comms}{" "}
            | 🔬 {fleetStatusData.cargo.biosensor}
          </Text>
        </WidgetCard>

        <WidgetCard title="Impacto ARYA" style={styles.widgetHalfWidth}>
          <Text style={styles.widgetTextBold}>
            Vidas Assistidas (Hoje): {impactMetricsData.livesAssistedToday}
          </Text>
          <Text style={styles.widgetText}>
            Resposta Média: {impactMetricsData.avgResponseTime}
          </Text>
          <Text style={styles.widgetText}>
            Comunidades: {impactMetricsData.communitiesReached}
          </Text>
          <Text style={styles.widgetTextSmall}>
            CO₂ Evitado: {impactMetricsData.emissionsSaved}
          </Text>
        </WidgetCard>

        <WidgetCard
          title="Eco-Pontos de Resgate"
          style={styles.widgetFullWidth}
        >
          <Text style={styles.widgetTextBold}>
            Hubs Operacionais: {ecoPointsData.operational}
          </Text>
          <Text style={styles.widgetText}>
            Energia: {ecoPointsData.energyLevel}
          </Text>
          <Text style={styles.widgetText}>
            Capacidade Lançamento: {ecoPointsData.launchCapacity}
          </Text>
        </WidgetCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alertas e Previsões de Crise</Text>
        {crisisAlertsData.map((alert) => (
          <CrisisAlertItem
            key={alert.id}
            title={alert.title}
            area={alert.area}
            time={alert.time}
            level={alert.level}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Operações Ativas em Locais de Risco
        </Text>
        {highDangerLocationsData.map((location) => (
          <DangerLocationItem
            key={location.id}
            name={location.name}
            dangerType={location.dangerType}
            aryaStatus={location.aryaStatus}
            criticality={location.criticality}
            iconName={location.dangerIcon}
          />
        ))}
      </View>

      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Módulos Especializados ARYA</Text>
        <View style={styles.quickAccessButtons}>
          <TouchableOpacity
            style={[styles.quickAccessButton, { backgroundColor: "#0069d9" }]}
          >
            <View style={styles.itemIconPlaceholder}>
              <Text style={styles.itemIconTextWhite}>M</Text>
            </View>
            <Text style={styles.quickAccessButtonText}>ARYA-Med</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAccessButton, { backgroundColor: "#218838" }]}
          >
            <View style={styles.itemIconPlaceholder}>
              <Text style={styles.itemIconTextWhite}>+</Text>
            </View>
            <Text style={styles.quickAccessButtonText}>ARYA+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef0f2",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  subGreeting: {
    fontSize: 15,
    color: "#495057",
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  droneSection: {
    marginBottom: 15,
    position: "relative",
  },
  droneImage: {
    width: "100%",
    height: 220,
  },
  droneStatusOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  droneModel: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  droneStatus: {
    fontSize: 14,
    color: "#f0f0f0",
  },
  widgetsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 5,
  },
  widgetCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  widgetFullWidth: {
    width: "100%",
  },
  widgetHalfWidth: {
    width: "48.5%",
  },

  widgetIconInternal: {
    marginRight: 8,
  },
  widgetText: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 6,
    lineHeight: 20,
  },
  widgetTextBold: {
    fontSize: 14.5,
    color: "#212529",
    marginBottom: 6,
    fontWeight: "600",
  },
  widgetTextSmall: {
    fontSize: 13,
    color: "#6c757d",
    marginBottom: 4,
  },
  widgetSubTitle: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#343a40",
    marginTop: 8,
    marginBottom: 5,
  },
  weatherLocation: {
    fontSize: 15,
    fontWeight: "600",
    color: "#007bff",
  },
  weatherTemp: {
    fontSize: 14,
    color: "#343a40",
    marginBottom: 5,
  },
  weatherDetails: {
    fontSize: 13.5,
    color: "#495057",
    marginBottom: 5,
  },
  weatherAlert: {
    fontSize: 13.5,
    color: "#17a2b8",
    fontWeight: "500",
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 15,
  },
  itemIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  itemIconTextWhite: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  quickAccessSection: {
    paddingHorizontal: 12,
    marginTop: 15,
  },
  quickAccessButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quickAccessButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
  },
  quickAccessButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default OperacoesScreen;
