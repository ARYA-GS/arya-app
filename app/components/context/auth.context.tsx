// src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserInterface } from "../../model/user.interface";
import { JwtInterface } from "../../model/jwt.interface";
import { URL_ARYA_LOCAL_API } from "../../../constants";

interface AuthContextType {
  user: UserInterface | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    birthDate: string,
    password: string,
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
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser: UserInterface = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("[Auth] Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Tentando fazer login com:", email);
      const url = `${URL_ARYA_LOCAL_API}/auth/login`;
      const response = await axios.post(url, {
        email: email,
        senha: password,
      });

      const jwt: string = String(response.data);
      
      if (!jwt) {
        throw new Error("Token não recebido do servidor.");
      }

      console.log("Token recebido com sucesso.");

      const jwtDecoded: JwtInterface = jwtDecode(jwt);
      console.log("Token decodificado:", jwtDecoded);

      const userData: UserInterface = {
        id: jwtDecoded.id,
        token: jwt,
        email: jwtDecoded.sub,
        nome: jwtDecoded.nome,
        cpf: jwtDecoded.cpf,
        data_nascimento: jwtDecoded.data_nascimento, 
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      console.log("Dados do usuário armazenados:", JSON.stringify(userData));
      setUser(userData);

    } catch (error) {
      console.error("[Auth - login()] Login falhou:", error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    console.log("[Auth logout()] Usuário deslogado");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    birthDate: string,
  ) => {
    try {
      await axios.post(`${URL_ARYA_LOCAL_API}/usuarios`, {
        nome: name,
        email: email,
        data_nascimento: birthDate,
        senha: password,
      });
    } catch (error) {
      console.error("[Auth - cadastro()] Cadastro falhou", error);
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
    throw new Error("[Auth] useAuth must be used within an AuthProvider");
  }
  return context;
};