import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../../model/user.interface';
import { JwtInterface } from '../../model/jwt.interface';

interface AuthContextType {
  user: UserInterface | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    cpf: string,
    birthDate: string,
    password: string,
    role: string
  ) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser: UserInterface = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('[Auth] Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Tentando fazer login com:', email, password);
      const response = await axios.post('https://prevdent-back-java.azurewebsites.net/paciente/login', {
        email: email,
        senha: password,
      });
    
      const data = response.data as { token: string };
      const jwt = data.token;
      const jwtDecoded: JwtInterface = jwtDecode(jwt);

      const userData: UserInterface = {
          token: jwt,
          email: jwtDecoded.sub,
          nome: jwtDecoded.nome,
          cpf: jwtDecoded.cpf,
          data_nascimento: jwtDecoded.data_nascimento,
    };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('Dados do usuário armazenados:', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('[Auth - login()] Login falhou', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    console.log('[Auth logout()] Usuário deslogado');
  };

  const register = async (
    name: string,
    email: string,
    cpf: string,
    birthDate: string,
    password: string,
    role: string
  ) => {
    try {
      await axios.post('https://prevdent-back-java.azurewebsites.net/paciente/cadastrar', {
        nome: name,
        email: email,
        cpf: cpf,
        data_nascimento: birthDate,
        senha: password,
        role: role,
      });
    } catch (error) {
      console.error('[Auth - cadastro()] Cadastro falhou', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('[Auth] useAuth must be used within an AuthProvider');
  }
  return context;
};
