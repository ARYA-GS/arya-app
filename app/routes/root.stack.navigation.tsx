import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./tab.navigation";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  TabNavigation: { screen: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigator} />
    </Stack.Navigator>
  );
}
