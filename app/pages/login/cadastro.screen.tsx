import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import { useAuth } from "../../components/context/auth.context";
import { useState } from "react";
import BackArrow from "../../components/common/back.arrow.component";
import InputArea from "../../components/common/text/input.area";
import ButtonStandard from "../../components/common/button/button.standard";
import SuccessModal from "../../components/common/modal/succes.cadastro";

type CadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

interface Props {
  navigation: CadastroScreenNavigationProp;
}

const CadastroScreen = ({ navigation }: Props) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = async () => {
    try {
      const formattedBirthDate = birthDate.split("/").reverse().join("-");
      await register(name, email, cpf, formattedBirthDate, password, "Admin");
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const redirectToLogin = () => {
    closeModal();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <BackArrow color="#fff" />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Cadastro</Text>
        <InputArea
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          borderRadius={5}
        />
        <InputArea
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          borderRadius={5}
        />
        <InputArea
          placeholder="ex: 13/05/2025"
          value={birthDate}
          onChangeText={setBirthDate}
          borderRadius={5}
        />
        <InputArea
          placeholder="Email"
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
        <ButtonStandard
          text="Cadastrar"
          onPress={handleRegister}
          borderRadius={5}
        />

        <Text style={styles.registerText}>
          Já possui conta?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Login")}
          >
            Entre aqui
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

      <SuccessModal
        visible={modalVisible}
        onClose={closeModal}
        name={name}
        email={email}
        onRedirect={redirectToLogin}
      />
    </View>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1E40",
  },
  topContainer: {
    flex: 2,
    padding: 20,
    marginTop: 60,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
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
