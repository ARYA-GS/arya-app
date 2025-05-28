import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackNavigation } from './root.stack.navigation';
import LoginScreen from '../pages/login/login.screen';
import CadastroScreen from '../pages/login/cadastro.screen';
import { useAuth } from '../components/context/auth.context';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {

  const { user, loading } = useAuth();
  console.log('Usuário logado:', user);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#013EB0" />
      </View>
    );
  }

  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Root" component={RootStackNavigation} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </>
      )}

      
    </Stack.Navigator>
  );
}

export default AppRoutes


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
