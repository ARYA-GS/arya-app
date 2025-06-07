import { OcorrenciaInterface } from "../../model/ocorrencia.interface";

function generateMoreDrones(startId: number, baseLat: number, baseLon: number, quantity: number) {
  const drones = [];
  for (let i = 0; i < quantity; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lonOffset = (Math.random() - 0.5) * 0.05;
    drones.push({
      id: `drone${startId + i}`,
      latitude: parseFloat((baseLat + latOffset).toFixed(6)),
      longitude: parseFloat((baseLon + lonOffset).toFixed(6)),
    });
  }
  return drones;
}

const dronesAdditional = [
  ...generateMoreDrones(61, -23.55052, -46.633308, 40),   // São Paulo
  ...generateMoreDrones(101, -22.9068, -43.1729, 30),     // Rio de Janeiro
  ...generateMoreDrones(131, -15.7942, -47.8822, 20),     // Brasília
  ...generateMoreDrones(151, -12.9714, -38.5014, 20),     // Salvador
  ...generateMoreDrones(171, -3.71722, -38.5434, 20),     // Fortaleza
  ...generateMoreDrones(191, -19.9167, -43.9345, 10),     // Belo Horizonte
];

export const droneLocations = [
  { id: 'drone1', latitude: -23.550520, longitude: -46.633308 }, // São Paulo
  { id: 'drone2', latitude: -23.538420, longitude: -46.621208 },
  { id: 'drone3', latitude: -23.562620, longitude: -46.645408 },
  { id: 'drone4', latitude: -22.906847, longitude: -43.172896 }, // Rio de Janeiro
  { id: 'drone5', latitude: -22.900000, longitude: -43.180000 },
  { id: 'drone6', latitude: -22.910000, longitude: -43.160000 },
  { id: 'drone7', latitude: -15.794229, longitude: -47.882166 }, // Brasília
  { id: 'drone8', latitude: -15.800000, longitude: -47.870000 },
  { id: 'drone9', latitude: -15.780000, longitude: -47.895000 },
  { id: 'drone10', latitude: -12.971399, longitude: -38.501399 }, // Salvador
  { id: 'drone11', latitude: -12.960000, longitude: -38.490000 },
  { id: 'drone12', latitude: -12.980000, longitude: -38.510000 },
  { id: 'drone13', latitude: -3.717220, longitude: -38.543400 }, // Fortaleza
  { id: 'drone14', latitude: -3.720000, longitude: -38.550000 },
  { id: 'drone15', latitude: -3.710000, longitude: -38.540000 },
  { id: 'drone16', latitude: -19.916680, longitude: -43.934493 }, // Belo Horizonte
  { id: 'drone17', latitude: -19.920000, longitude: -43.930000 },
  { id: 'drone18', latitude: -19.910000, longitude: -43.940000 },
  { id: 'drone19', latitude: -25.428428, longitude: -49.273315 }, // Curitiba
  { id: 'drone20', latitude: -25.430000, longitude: -49.270000 },
  { id: 'drone21', latitude: -25.425000, longitude: -49.275000 },
  { id: 'drone22', latitude: -30.034647, longitude: -51.217658 }, // Porto Alegre
  { id: 'drone23', latitude: -30.030000, longitude: -51.220000 },
  { id: 'drone24', latitude: -30.040000, longitude: -51.215000 },
  { id: 'drone25', latitude: -3.119028, longitude: -60.021731 }, // Manaus
  { id: 'drone26', latitude: -3.110000, longitude: -60.030000 },
  { id: 'drone27', latitude: -3.120000, longitude: -60.020000 },
  { id: 'drone28', latitude: -8.047562, longitude: -34.877000 }, // Recife
  { id: 'drone29', latitude: -8.050000, longitude: -34.880000 },
  { id: 'drone30', latitude: -8.040000, longitude: -34.870000 },
  { id: 'drone31', latitude: -23.555432, longitude: -46.640321 },
  { id: 'drone32', latitude: -23.545123, longitude: -46.635678 },
  { id: 'drone33', latitude: -23.560987, longitude: -46.628765 },
  { id: 'drone34', latitude: -22.903456, longitude: -43.175432 },
  { id: 'drone35', latitude: -22.908765, longitude: -43.169876 },
  { id: 'drone36', latitude: -22.911234, longitude: -43.170987 },
  { id: 'drone37', latitude: -15.790123, longitude: -47.880432 },
  { id: 'drone38', latitude: -15.795678, longitude: -47.889876 },
  { id: 'drone39', latitude: -15.783210, longitude: -47.882345 },
  { id: 'drone40', latitude: -12.973210, longitude: -38.498765 },
  { id: 'drone41', latitude: -12.969876, longitude: -38.500432 },
  { id: 'drone42', latitude: -12.970987, longitude: -38.505678 },
  { id: 'drone43', latitude: -3.715432, longitude: -38.540987 },
  { id: 'drone44', latitude: -3.718765, longitude: -38.544321 },
  { id: 'drone45', latitude: -3.720987, longitude: -38.538765 },
  { id: 'drone46', latitude: -19.918765, longitude: -43.936543 },
  { id: 'drone47', latitude: -19.917654, longitude: -43.932109 },
  { id: 'drone48', latitude: -19.915432, longitude: -43.935678 },
  { id: 'drone49', latitude: -25.429876, longitude: -49.274321 },
  { id: 'drone50', latitude: -25.427654, longitude: -49.271987 },
  { id: 'drone51', latitude: -25.430987, longitude: -49.272543 },
  { id: 'drone52', latitude: -30.033210, longitude: -51.218765 },
  { id: 'drone53', latitude: -30.035432, longitude: -51.220987 },
  { id: 'drone54', latitude: -30.036543, longitude: -51.216543 },
  { id: 'drone55', latitude: -3.121234, longitude: -60.023210 },
  { id: 'drone56', latitude: -3.118765, longitude: -60.020987 },
  { id: 'drone57', latitude: -3.119876, longitude: -60.022543 },
  { id: 'drone58', latitude: -8.048765, longitude: -34.879876 },
  { id: 'drone59', latitude: -8.046543, longitude: -34.876543 },
  { id: 'drone60', latitude: -8.049876, longitude: -34.874321 },
  ...dronesAdditional,
];

export const ocorrenciaDataset: OcorrenciaInterface[] = [
  {
    tipoOcorrencia: 'Incêndio',
    nivelSeveridade: 5,
    dataOcorrencia: '2024-06-10T14:30:00Z',
    descricao: 'Incêndio em residência no centro.',
    idUsuario: "1",
    endereco: {
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Alagamento',
    nivelSeveridade: 3,
    dataOcorrencia: '2024-06-09T09:15:00Z',
    descricao: 'Rua alagada após chuva forte.',
    idUsuario: "2",
    endereco: {
      bairro: 'Jardim Paulista',
      cidade: 'São Paulo',
      estado: 'SP',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Queda de árvore',
    nivelSeveridade: 2,
    dataOcorrencia: '2024-06-08T16:45:00Z',
    descricao: 'Árvore caiu bloqueando a rua.',
    idUsuario: "3",
    endereco: {
      bairro: 'Moema',
      cidade: 'São Paulo',
      estado: 'SP',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Deslizamento',
    nivelSeveridade: 4,
    dataOcorrencia: '2024-06-07T11:20:00Z',
    descricao: 'Deslizamento de terra em encosta.',
    idUsuario: "4",
    endereco: {
      bairro: 'Santa Teresa',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Acidente de trânsito',
    nivelSeveridade: 3,
    dataOcorrencia: '2024-06-06T18:10:00Z',
    descricao: 'Colisão entre dois veículos.',
    idUsuario: "5",
    endereco: {
      bairro: 'Asa Sul',
      cidade: 'Brasília',
      estado: 'DF',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Incêndio florestal',
    nivelSeveridade: 5,
    dataOcorrencia: '2024-06-05T13:00:00Z',
    descricao: 'Fogo em área de mata.',
    idUsuario: "6",
    endereco: {
      bairro: 'Parque das Dunas',
      cidade: 'Salvador',
      estado: 'BA',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Alagamento',
    nivelSeveridade: 4,
    dataOcorrencia: '2024-06-04T07:45:00Z',
    descricao: 'Alagamento em avenida principal.',
    idUsuario: "7",
    endereco: {
      bairro: 'Aldeota',
      cidade: 'Fortaleza',
      estado: 'CE',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Queda de energia',
    nivelSeveridade: 2,
    dataOcorrencia: '2024-06-03T22:30:00Z',
    descricao: 'Bairro sem energia elétrica.',
    idUsuario: "8",
    endereco: {
      bairro: 'Savassi',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Desabamento',
    nivelSeveridade: 5,
    dataOcorrencia: '2024-06-02T15:00:00Z',
    descricao: 'Prédio desabou após fortes chuvas.',
    idUsuario: "9",
    endereco: {
      bairro: 'Centro',
      cidade: 'Curitiba',
      estado: 'PR',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Incêndio industrial',
    nivelSeveridade: 4,
    dataOcorrencia: '2024-06-01T10:20:00Z',
    descricao: 'Incêndio em fábrica.',
    idUsuario: "10",
    endereco: {
      bairro: 'Navegantes',
      cidade: 'Porto Alegre',
      estado: 'RS',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Deslizamento',
    nivelSeveridade: 3,
    dataOcorrencia: '2024-05-31T08:40:00Z',
    descricao: 'Deslizamento em área residencial.',
    idUsuario: "11",
    endereco: {
      bairro: 'Adrianópolis',
      cidade: 'Manaus',
      estado: 'AM',
      pais: 'Brasil'
    }
  },
  {
    tipoOcorrencia: 'Alagamento',
    nivelSeveridade: 2,
    dataOcorrencia: '2024-05-30T19:55:00Z',
    descricao: 'Rua alagada após chuva intensa.',
    idUsuario: "12",
    endereco: {
      bairro: 'Boa Viagem',
      cidade: 'Recife',
      estado: 'PE',
      pais: 'Brasil'
    }
  }
];
