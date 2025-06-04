export const userData = {
  name: 'Vitor Santos',
  profileImageUrl: 'https://via.placeholder.com/50/007bff/ffffff?Text=VS', 
};

export const droneData = {
  imageUrl: 'https://via.placeholder.com/400x200/5c6bc0/ffffff?Text=ARYA+Drone+Voo', 
  status: 'Operacional - Patrulha na Zona Ribeirinha',
  model: 'ARYA Condor I',
};

export const weatherData = {
  location: 'Área de Crise X',
  temperature: '28°C',
  condition: 'Ensolarado, ventos moderados',
  wind: '20 km/h SE',
  alert: 'Visibilidade ótima para voo.',
};

export const fleetStatusData = {
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

export const impactMetricsData = {
  livesAssistedToday: 15,
  avgResponseTime: '17 min',
  communitiesReached: 4,
  emissionsSaved: '13 kg CO₂ (est.)',
};

export const ecoPointsData = {
  operational: 4,
  energyLevel: 'Alto (85% solar)',
  launchCapacity: 'Normal',
};

export const crisisAlertsData = [
  { id: '1', title: 'Alerta Elevado: Risco de Enchente', area: 'Bacia do Rio Piranga', time: 'Última hora', level: 'red' },
  { id: '2', title: 'Previsão: Tempestade Geomagnética Leve', area: 'Ampla Região (Afeta GPS)', time: 'Próximas 24h', level: 'yellow' },
  { id: '3', title: 'Foco de Queimada Controlada', area: 'Fazenda Boa Esperança', time: 'Em monitoramento', level: 'green' },
];

export const highDangerLocationsData = [
  { id: 'loc1', name: 'Vila das Flores', dangerType: 'Deslizamento Iminente', dangerIcon: 'landslide', aryaStatus: 'Evacuação assistida por 2 drones', criticality: 'red' },
  { id: 'loc2', name: 'Ponte Caída - Rio Seco', dangerType: 'Isolamento Comunitário', dangerIcon: 'bridge', aryaStatus: 'Entrega de suprimentos (1 drone)', criticality: 'orange' },
  { id: 'loc3', name: 'Parque Estadual Serra Verde', dangerType: 'Incêndio Florestal (Pequeno)', dangerIcon: 'fire-truck', aryaStatus: 'Monitoramento aéreo (1 drone)', criticality: 'yellow' },
];