import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../pages/home/home";
import ProfileScreen from "../pages/profile/profile.screen";
import DroneMapScreen from "../pages/drone-map/drone.map.screen";
import OperacoesScreen from "../pages/operacoes/operacoes.screen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ 
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Drone Map") {
            iconName = focused ? "airplane" : "airplane-outline";
          } else if (route.name === "Operacoes") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#242424', 
          },
          tabBarActiveTintColor: '#FFFFFF', 
          tabBarInactiveTintColor: '#B0B0B0', 
      })
    }
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      
      <Tab.Screen
        name="Drone Map"
        component={DroneMapScreen}
        options={{ headerShown: false }}
      />

       <Tab.Screen
        name="Operacoes"
        component={OperacoesScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
