import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../components/styles/global.styles";
import ButtonStandard from "../../components/common/button/button.standard";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import { StackNavigationProp } from "@react-navigation/stack";


type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen = ({ navigation }: Props) => {

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  const handleCadastro= () => {
    navigation.navigate("Cadastro");
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/fundo-login.png")} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.titulo}>Seja Bem-vindo</Text>
        <Text style={styles.subTitulo}>
          Entre com seus dados e aproveita a experiência
        </Text>
      </View>
      <View style={styles.flexContainerButton}>
        <ButtonStandard
          text="Entrar"
          borderRadius={5}
          color="#013E"
           onPress={handleLogin}
        />
        <ButtonStandard text="Cadastrar" borderRadius={5} color="#A4B494" onPress={handleCadastro}/>
      </View>

      <View style={styles.imageAryaContainer}>
        <Image
          style={styles.bottomImage}
          source={require("../../assets/arya-colorido.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  flexContainerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginTop: 120,
  },
  containerTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#001133ed",
  },
  subTitulo: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#013E",
    textAlign: "center",
    marginTop: 10,
  },
  bottomImage: {
    width: "100%",
    height: 200,
    position: "absolute",
    bottom: 20,
  },
  imageAryaContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 200,
  },
});
