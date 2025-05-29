import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// Para ícones, você pode usar uma biblioteca como react-native-vector-icons
// Exemplo: import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- DADOS MOCK (Simulando dados recebidos de uma API ou estado) ---
const userData = {
  name: 'Vitor Santos',
  profileImageUrl: 'https://via.placeholder.com/50/007bff/ffffff?Text=VS', // Substitua pela URL real
};

const droneData = {
  imageUrl: 'https://via.placeholder.com/400x200/5c6bc0/ffffff?Text=ARYA+Drone+Voo', // Imagem do drone da tela inicial
  status: 'Operacional - Patrulha na Zona Ribeirinha',
  model: 'ARYA Condor I',
};

const weatherData = {
  location: 'Área de Crise X',
  temperature: '28°C',
  condition: 'Ensolarado, ventos moderados',
  wind: '20 km/h SE',
  alert: 'Visibilidade ótima para voo.',
};

const fleetStatusData = {
  active: 7,
  charging: 2,
  maintenance: 1,
  cargo: {
    medical: 3,
    foodWater: 2,
    comms: 1,
    biosensor: 1,
  },
};

const impactMetricsData = {
  livesAssistedToday: 15,
  avgResponseTime: '17 min',
  communitiesReached: 4,
  emissionsSaved: '13 kg CO₂ (est.)',
};

const ecoPointsData = {
  operational: 4,
  energyLevel: 'Alto (85% solar)',
  launchCapacity: 'Normal',
};

const crisisAlertsData = [
  { id: '1', title: 'Alerta Elevado: Risco de Enchente', area: 'Bacia do Rio Piranga', time: 'Última hora', level: 'red' },
  { id: '2', title: 'Previsão: Tempestade Geomagnética Leve', area: 'Ampla Região (Afeta GPS)', time: 'Próximas 24h', level: 'yellow' },
  { id: '3', title: 'Foco de Queimada Controlada', area: 'Fazenda Boa Esperança', time: 'Em monitoramento', level: 'green' },
];

const highDangerLocationsData = [
  { id: 'loc1', name: 'Vila das Flores', dangerType: 'Deslizamento Iminente', dangerIcon: 'landslide', aryaStatus: 'Evacuação assistida por 2 drones', criticality: 'red' },
  { id: 'loc2', name: 'Ponte Caída - Rio Seco', dangerType: 'Isolamento Comunitário', dangerIcon: 'bridge', aryaStatus: 'Entrega de suprimentos (1 drone)', criticality: 'orange' },
  { id: 'loc3', name: 'Parque Estadual Serra Verde', dangerType: 'Incêndio Florestal (Pequeno)', dangerIcon: 'fire-truck', aryaStatus: 'Monitoramento aéreo (1 drone)', criticality: 'yellow' },
];

// --- COMPONENTES DE UI REUTILIZÁVEIS ---

type WidgetCardProps = {
  title: string;
  children: React.ReactNode;
  style?: object;
};

const WidgetCard = ({ title, children, style }: WidgetCardProps) => (
  <View style={[styles.widgetCard, style]}>
    <Text style={styles.widgetTitle}>{title}</Text>
    {children}
  </View>
);

type DangerLocationItemProps = {
  name: string;
  dangerType: string;
  aryaStatus: string;
  criticality?: string;
  iconName?: string;
};

const DangerLocationItem = ({ name, dangerType, aryaStatus, criticality, iconName }: DangerLocationItemProps) => (
  <TouchableOpacity style={[styles.dangerItem, { borderLeftColor: criticality || '#ccc' }]}>
    {/* <Icon name={iconName || 'alert-circle-outline'} size={28} color={criticality || '#333'} style={styles.itemIcon} /> */}
    <View style={[styles.itemIconPlaceholder, {backgroundColor: criticality || '#e0e0e0'}]}><Text style={styles.itemIconText}>{iconName ? iconName[0].toUpperCase() : '!'}</Text></View>
    <View style={styles.itemContent}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDetails}>Perigo: {dangerType}</Text>
      <Text style={styles.itemDetails}>Status ARYA: {aryaStatus}</Text>
    </View>
    {/* <Icon name="chevron-right" size={24} color="#666" /> */}
    <View style={styles.chevronPlaceholder}><Text>&gt;</Text></View>
  </TouchableOpacity>
);

type CrisisAlertItemProps = {
    title: string;
    area: string;
    time: string;
    level: string;
};

const CrisisAlertItem = ({ title, area, time, level }: CrisisAlertItemProps) => {
    let alertColors = { bg: '#e2e3e5', text: '#383d41', iconBg: '#d6d8db'};
    if (level === 'red') alertColors = { bg: '#f8d7da', text: '#721c24', iconBg: '#f5c6cb'};
    if (level === 'orange' || level === 'yellow') alertColors = { bg: '#fff3cd', text: '#856404', iconBg: '#ffeeba'};
    if (level === 'green') alertColors = { bg: '#d4edda', text: '#155724', iconBg: '#c3e6cb'};

    return (
        <View style={[styles.alertItem, { backgroundColor: alertColors.bg, borderColor: alertColors.iconBg }]}>
            {/* <Icon name={level === 'red' ? "alert-octagon-outline" : level === 'orange' || level === 'yellow' ? "alert-outline" : "check-circle-outline"} size={24} color={alertColors.text} style={styles.itemIcon} /> */}
            <View style={[styles.itemIconPlaceholder, {backgroundColor: alertColors.iconBg, width: 28, height: 28, borderRadius: 14}]}><Text style={[styles.itemIconText, {color: alertColors.text}]}>{level[0].toUpperCase()}</Text></View>
            <View style={styles.itemContent}>
                <Text style={[styles.alertTitle, {color: alertColors.text}]}>{title}</Text>
                <Text style={[styles.itemDetails, {color: alertColors.text}]}>Área: {area} ({time})</Text>
            </View>
        </View>
    );
};


const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* --- CABEÇALHO --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {userData.name}</Text>
          <Text style={styles.subGreeting}>Painel de Controle ARYA</Text>
        </View>
        <Image source={{ uri: userData.profileImageUrl }} style={styles.profileImage} />
      </View>

      {/* --- IMAGEM/STATUS DO DRONE PRINCIPAL --- */}
      <View style={styles.droneSection}>
        <Image source={{ uri: droneData.imageUrl }} style={styles.droneImage} resizeMode="cover" />
        <View style={styles.droneStatusOverlay}>
          <Text style={styles.droneModel}>{droneData.model}</Text>
          <Text style={styles.droneStatus}>{droneData.status}</Text>
        </View>
      </View>

      {/* --- PAINEL DE WIDGETS --- */}
      <View style={styles.widgetsGrid}>
        <WidgetCard title="Clima na Operação" style={styles.widgetFullWidth}>
          {/* <Icon name="weather-partly-cloudy" size={20} color="#007bff" style={styles.widgetIconInternal} /> */}
          <Text style={styles.weatherLocation}>{weatherData.location}</Text>
          <Text style={styles.weatherTemp}>{weatherData.temperature} - {weatherData.condition}</Text>
          <Text style={styles.weatherDetails}>Vento: {weatherData.wind}</Text>
          {weatherData.alert && <Text style={styles.weatherAlert}>{weatherData.alert}</Text>}
        </WidgetCard>

        <WidgetCard title="Status da Frota" style={styles.widgetHalfWidth}>
          {/* <Icon name="drone" size={20} color="#17a2b8" style={styles.widgetIconInternal} /> */}
          <Text style={styles.widgetTextBold}>Ativos: {fleetStatusData.active}</Text>
          <Text style={styles.widgetText}>Carregando: {fleetStatusData.charging}</Text>
          <Text style={styles.widgetText}>Manutenção: {fleetStatusData.maintenance}</Text>
          <Text style={styles.widgetSubTitle}>Cargas Primárias:</Text>
          <Text style={styles.widgetTextSmall}>💊 {fleetStatusData.cargo.medical} | 💧 {fleetStatusData.cargo.foodWater} | 📡 {fleetStatusData.cargo.comms} | 🔬 {fleetStatusData.cargo.biosensor}</Text>
        </WidgetCard>

        <WidgetCard title="Impacto ARYA" style={styles.widgetHalfWidth}>
          {/* <Icon name="trending-up" size={20} color="#28a745" style={styles.widgetIconInternal} /> */}
          <Text style={styles.widgetTextBold}>Vidas Assistidas (Hoje): {impactMetricsData.livesAssistedToday}</Text>
          <Text style={styles.widgetText}>Resposta Média: {impactMetricsData.avgResponseTime}</Text>
          <Text style={styles.widgetText}>Comunidades: {impactMetricsData.communitiesReached}</Text>
          <Text style={styles.widgetTextSmall}>CO₂ Evitado: {impactMetricsData.emissionsSaved}</Text>
        </WidgetCard>

        <WidgetCard title="Eco-Pontos de Resgate" style={styles.widgetFullWidth}>
            {/* <Icon name="store-marker-outline" size={20} color="#ffc107" style={styles.widgetIconInternal} /> */}
            <Text style={styles.widgetTextBold}>Hubs Operacionais: {ecoPointsData.operational}</Text>
            <Text style={styles.widgetText}>Energia: {ecoPointsData.energyLevel}</Text>
            <Text style={styles.widgetText}>Capacidade Lançamento: {ecoPointsData.launchCapacity}</Text>
        </WidgetCard>
      </View>

      {/* --- FEED DE ALERTAS DE CRISE --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alertas e Previsões de Crise</Text>
        {crisisAlertsData.map(alert => (
          <CrisisAlertItem
            key={alert.id}
            title={alert.title}
            area={alert.area}
            time={alert.time}
            level={alert.level}
          />
        ))}
      </View>

      {/* --- LISTA DE LOCAIS COM MAIOR PERIGO --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operações Ativas em Locais de Risco</Text>
        {highDangerLocationsData.map(location => (
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

      {/* --- ACESSO RÁPIDO A MÓDULOS ESPECIALIZADOS --- */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Módulos Especializados ARYA</Text>
        <View style={styles.quickAccessButtons}>
            <TouchableOpacity style={[styles.quickAccessButton, {backgroundColor: '#0069d9'}]}>
                {/* <Icon name="medical-bag" size={22} color="#fff" /> */}
                 <View style={styles.itemIconPlaceholder}><Text style={styles.itemIconTextWhite}>M</Text></View>
                <Text style={styles.quickAccessButtonText}>ARYA-Med</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickAccessButton, {backgroundColor: '#218838'}]}>
                {/* <Icon name="leaf-maple" size={22} color="#fff" /> */}
                <View style={styles.itemIconPlaceholder}><Text style={styles.itemIconTextWhite}>+</Text></View>
                <Text style={styles.quickAccessButtonText}>ARYA+</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} /> {/* Espaçador no final */}
    </ScrollView>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f2', 
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  subGreeting: {
    fontSize: 15,
    color: '#495057',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: '#007bff'
  },
  droneSection: {
    marginBottom: 15,
    position: 'relative',
  },
  droneImage: {
    width: '100%',
    height: 220,
  },
  droneStatusOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  droneModel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  droneStatus: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  widgetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 5,
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  widgetFullWidth: {
    width: '100%',
  },
  widgetHalfWidth: {
    width: '48.5%', 
  },
  widgetTitle: {
    fontSize: 17,
    fontWeight: '600', // Semibold
    color: '#343a40',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  widgetIconInternal: { // Ícone dentro do título ou card
     marginRight: 8, 
     // Adicione mais estilos se necessário
  },
  widgetText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 6,
    lineHeight: 20,
  },
  widgetTextBold: {
    fontSize: 14.5,
    color: '#212529',
    marginBottom: 6,
    fontWeight: '600',
  },
  widgetTextSmall: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 4,
  },
  widgetSubTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#343a40',
    marginTop: 8,
    marginBottom: 5,
  },
  weatherLocation: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007bff'
  },
  weatherTemp: {
    fontSize: 14,
    color: '#343a40',
    marginBottom: 5,
  },
  weatherDetails: {
    fontSize: 13.5,
    color: '#495057',
    marginBottom: 5,
  },
  weatherAlert: {
    fontSize: 13.5,
    color: '#17a2b8', // Cor informativa
    fontWeight: '500',
    marginTop: 5,
  },
  section: {
    marginTop: 15, 
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  // Estilos para Itens de Lista (DangerLocationItem, CrisisAlertItem)
  itemIconPlaceholder: { 
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIconText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#495057'
  },
  itemIconTextWhite: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF'
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  itemDetails: {
    fontSize: 13.5,
    color: '#495057',
    marginTop: 3,
    lineHeight: 18,
  },
  chevronPlaceholder: { 
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  // Danger Item Especifico
  dangerItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6, 
  },
  // Alert Item Especifico
  alertItem: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  // Quick Access Section
  quickAccessSection: {
    paddingHorizontal: 12,
    marginTop: 15, 
  },
  quickAccessButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 5,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10, // Ajustado
    borderRadius: 10,
    flex: 1, // Para ocupar espaço igual
    marginHorizontal: 5, // Espaço entre botões
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
  },
  quickAccessButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8, 
  },
});

export default HomeScreen;