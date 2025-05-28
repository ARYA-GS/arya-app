import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './app/routes/app.routes';
import { AuthProvider } from './app/components/context/auth.context';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
