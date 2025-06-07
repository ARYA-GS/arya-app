import React, { useState } from "react";
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
  darkTheme,
  droneData,
  ecoPointsData,
  fleetStatusData,
  highDangerLocationsData,
  impactMetricsData,
  lightTheme,
  userData,
  weatherData,
} from "./data.operacoes";
import { Ionicons } from "@expo/vector-icons";
import { WidgetCard } from "../../components/common/home/widget.card";
import { CrisisAlertItem } from "../../components/common/home/crisis.alert.item";
import { DangerLocationItem } from "../../components/common/home/danger.location.item";
import { styles } from "./styles.operacao";

const OperacoesScreen = () => {
  const [dark, setDark] = useState(true);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: theme.card, borderBottomColor: theme.border },
        ]}
      >
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            Olá, {userData.name}
          </Text>
          <Text style={[styles.subGreeting, { color: theme.subText }]}>
            Painel de Controle ARYA
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            borderWidth: 1,
            borderColor: theme.text,
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setDark((d) => !d)}
        >
          <Image
            source={{ uri: userData.profileImageUrl }}
            style={[{ borderColor: theme.profileBorder }]}
          />
          <View>
            {dark ? (
              <Ionicons name="sunny-outline" size={20} color="#fff" />
            ) : (
              <Ionicons name="moon-outline" size={20} color="#333" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.droneSection}>
        <Image
          source={require("../../assets/drone-1.png")}
          style={styles.droneImage}
          resizeMode="cover"
        />
        <View
          style={[
            styles.droneStatusOverlay,
            { backgroundColor: theme.droneOverlay },
          ]}
        >
          <Text style={[styles.droneModel, { color: "#fff" }]}>
            {droneData.model}
          </Text>
          <Text style={[styles.droneStatus, { color: "#f0f0f0" }]}>
            {droneData.status}
          </Text>
        </View>
      </View>

      <View style={styles.widgetsGrid}>
        <WidgetCard
          title="Clima na Operação"
          style={[styles.widgetFullWidth, { backgroundColor: theme.card }]}
        >
          <Text
            style={[styles.weatherLocation, { color: theme.weatherLocation }]}
          >
            {weatherData.location}
          </Text>
          <Text style={[styles.weatherTemp, { color: theme.weatherTemp }]}>
            {weatherData.temperature} - {weatherData.condition}
          </Text>
          <Text
            style={[styles.weatherDetails, { color: theme.weatherDetails }]}
          >
            Vento: {weatherData.wind}
          </Text>
          {weatherData.alert && (
            <Text style={[styles.weatherAlert, { color: theme.weatherAlert }]}>
              {weatherData.alert}
            </Text>
          )}
        </WidgetCard>

        <WidgetCard
          title="Status da Frota"
          style={[styles.widgetHalfWidth, { backgroundColor: theme.card }]}
        >
          <Text
            style={[styles.widgetTextBold, { color: theme.widgetTextBold }]}
          >
            Ativos: {fleetStatusData.active}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Carregando: {fleetStatusData.charging}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Manutenção: {fleetStatusData.maintenance}
          </Text>
          <Text
            style={[styles.widgetSubTitle, { color: theme.widgetSubTitle }]}
          >
            Cargas Primárias:
          </Text>
          <Text
            style={[styles.widgetTextSmall, { color: theme.widgetTextSmall }]}
          >
            💊 {fleetStatusData.cargo.medical} | 💧{" "}
            {fleetStatusData.cargo.foodWater} | 📡 {fleetStatusData.cargo.comms}{" "}
            | 🔬 {fleetStatusData.cargo.biosensor}
          </Text>
        </WidgetCard>

        <WidgetCard
          title="Impacto ARYA"
          style={[styles.widgetHalfWidth, { backgroundColor: theme.card }]}
        >
          <Text
            style={[styles.widgetTextBold, { color: theme.widgetTextBold }]}
          >
            Vidas Assistidas (Hoje): {impactMetricsData.livesAssistedToday}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Resposta Média: {impactMetricsData.avgResponseTime}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Comunidades: {impactMetricsData.communitiesReached}
          </Text>
          <Text
            style={[styles.widgetTextSmall, { color: theme.widgetTextSmall }]}
          >
            CO₂ Evitado: {impactMetricsData.emissionsSaved}
          </Text>
        </WidgetCard>

        <WidgetCard
          title="Eco-Pontos de Resgate"
          style={[styles.widgetFullWidth, { backgroundColor: theme.card }]}
        >
          <Text
            style={[styles.widgetTextBold, { color: theme.widgetTextBold }]}
          >
            Hubs Operacionais: {ecoPointsData.operational}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Energia: {ecoPointsData.energyLevel}
          </Text>
          <Text style={[styles.widgetText, { color: theme.widgetText }]}>
            Capacidade Lançamento: {ecoPointsData.launchCapacity}
          </Text>
        </WidgetCard>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>
          Alertas e Previsões de Crise
        </Text>
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
        <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>
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
        <Text style={[styles.sectionTitle, { color: theme.sectionTitle }]}>
          Módulos Especializados ARYA
        </Text>
        <View style={styles.quickAccessButtons}>
          <TouchableOpacity
            style={[
              styles.quickAccessButton,
              {
                backgroundColor: "#0069d9",
                shadowColor: theme.quickAccessButtonShadow,
              },
            ]}
          >
            <View style={styles.itemIconPlaceholder}>
              <Text style={styles.itemIconTextWhite}>M</Text>
            </View>
            <Text
              style={[
                styles.quickAccessButtonText,
                { color: theme.quickAccessButtonText },
              ]}
            >
              ARYA-Med
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickAccessButton,
              {
                backgroundColor: "#218838",
                shadowColor: theme.quickAccessButtonShadow,
              },
            ]}
          >
            <View style={styles.itemIconPlaceholder}>
              <Text style={styles.itemIconTextWhite}>+</Text>
            </View>
            <Text
              style={[
                styles.quickAccessButtonText,
                { color: theme.quickAccessButtonText },
              ]}
            >
              ARYA+
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};


export default OperacoesScreen;
