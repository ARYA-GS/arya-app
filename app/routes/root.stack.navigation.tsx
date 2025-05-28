import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab.navigation";
import LoginScreen from "../pages/login/login.screen";
import CadastroScreen from "../pages/login/cadastro.screen";
import WelcomeScreen from "../pages/login/welcome.screen";

export type RootStackParamList = {
  TabNavigation: { screen: string } | undefined;
  Welcome: undefined;
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigator} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
    </Stack.Navigator>
  );
}
