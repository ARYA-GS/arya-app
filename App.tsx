import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './app/routes/app.routes';
import { AuthProvider } from './app/components/context/auth.context';
import WelcomeScreen from './app/pages/login/welcome.screen'; 


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
