import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "../../routes/root.stack.navigation";
import { useAuth } from "../../components/context/auth.context";
import BackArrow from "../../components/common/back.arrow.component";
import InputArea from "../../components/common/text/input.area";
import ButtonStandard from "../../components/common/button/button.standard";
import SuccessModal from "../../components/common/modal/succes.cadastro";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

type CadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

interface Props {
  navigation: CadastroScreenNavigationProp;
}

type FormValues = {
  name: string;
  birthDate: string;
  email: string;
  password: string;
};

const CadastroScreen = ({ navigation }: Props) => {
  const { register: registerUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      birthDate: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formattedBirthDate = data.birthDate.split("/").reverse().join("-");
      await registerUser(data.name, data.email, formattedBirthDate, data.password);
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

        <Controller
          control={control}
          name="name"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              borderRadius={5}
            />
          )}
        />

        <Controller
          control={control}
          name="birthDate"
          rules={{ required: "Data de nascimento é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              placeholder="ex: 13/05/2025"
              value={value}
              onChangeText={onChange}
              borderRadius={5}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              borderRadius={5}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              borderRadius={5}
            />
          )}
        />
      </View>

      <View style={styles.bottomContainer}>
        <ButtonStandard
          text="Cadastrar"
          onPress={handleSubmit(onSubmit)}
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

      {/* Modal de sucesso */}
      <SuccessModal
        visible={modalVisible}
        onClose={closeModal}
        name={control._formValues.name}
        email={control._formValues.email}
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
    bottom: 65,
  },
  imageAryaContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 200,
  },
});
