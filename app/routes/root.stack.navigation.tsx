import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab.navigation";
import LoginScreen from "../pages/login/login.screen";
import CadastroScreen from "../pages/login/cadastro.screen";
import WelcomeScreen from "../pages/login/welcome.screen";
import ProfileScreen from "../pages/profile/profile.screen";
import DroneMapScreen from "../pages/drone-map/drone.map.screen";
import FormDroneScreen from "../pages/form-drone/form.drone.screen";
import OperacoesScreen from "../pages/operacoes/operacoes.screen";
import HomeScreen from "../pages/home/home";
import HubsDetailsScreen from "../pages/hubs/hubs.details.screens";
import { Hub } from "../model/hub.interface";
import ListarOcorrenciasScreen from "../pages/ocorrencias/listar.ocorrencias.screen";
import OcorrenciasDetailsScreen from "../pages/ocorrencias/ocorrencias.detail";
import { OcorrenciaInterface } from "../model/ocorrencia.interface";

export type RootStackParamList = {
  TabNavigation: { screen: string } | undefined;
  Welcome: undefined;
  Login: undefined;
  Cadastro: undefined;
  ProfileScreen: undefined;
  DroneMapScreen: undefined;
  Home: undefined;
  FormDroneScreen: undefined;
  OperacoesScreen: undefined;
  HubsDetailsScreen: { hub: Hub };
  ListarOcorrenciasScreen: undefined;
  OcorrenciasDetailsScreen: { ocorrencia: OcorrenciaInterface}; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DroneMapScreen" component={DroneMapScreen} />
      <Stack.Screen name="FormDroneScreen" component={FormDroneScreen} />
      <Stack.Screen name="OperacoesScreen" component={OperacoesScreen} />
      <Stack.Screen name="HubsDetailsScreen" component={HubsDetailsScreen} />
      <Stack.Screen name="ListarOcorrenciasScreen" component={ListarOcorrenciasScreen} />
      <Stack.Screen name="OcorrenciasDetailsScreen" component={OcorrenciasDetailsScreen} />
    </Stack.Navigator>
  );
}
