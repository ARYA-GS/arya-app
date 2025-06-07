import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../../components/context/auth.context";
import { useState } from "react";
import InputArea from "../../components/common/text/input.area";
import ButtonStandard from "../../components/common/button/button.standard";
import ErrorLoginModal from "../../components/common/modal/error.login.modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import BackArrow from "../../components/common/back.arrow.component";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("Login bem-sucedido!");
    } catch (error) {
      setErrorMessage("Verifique suas credenciais e tente novamente.");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <BackArrow color="#fff" />
        <Text style={styles.title}>Login</Text>
        <InputArea
          placeholder="CPF ou E-mail"
          value={email}
          onChangeText={setEmail}
          borderRadius={5}
        />
        <InputArea
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          borderRadius={5}
        />
      </View>

      <View style={styles.bottomContainer}>
        <ButtonStandard text="Entrar" onPress={handleLogin} borderRadius={5}/>
        <Text style={styles.registerText}>
          Não possui conta?{" "}
          <Text style={styles.linkText} onPress={() => navigation.navigate("Cadastro")}>
            Cadastre-se
          </Text>
        </Text>

        <View style={styles.imageAryaContainer}>
        <Image
          style={styles.bottomImage}
          source={require("../../assets/arya-colorido.png")}
          resizeMode="contain"
        />
      </View>
      </View>

      <ErrorLoginModal
        visible={modalVisible}
        onClose={closeModal}
        message={errorMessage}
      />
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1E40",
  },
  topContainer: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
   bottomImage: {
    width: "100%",
    height: 130,
    position: "absolute",
    bottom: 65
  },
  imageAryaContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 200,
  },
});
