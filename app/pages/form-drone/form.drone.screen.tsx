import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import ButtonStandard from "../../components/common/button/button.standard";
import BackArrow from "../../components/common/back.arrow.component";
import { useNavigation } from "@react-navigation/native";

interface DroneDonationFormData {
  tipo: string;
  autonomia: string;
  alcanceKm: string;
  cargaKg: string;
  idHub: string;
  funcoes: string[];
}

export default function DroneDonationScreen() {

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DroneDonationFormData>();

  const onSubmit = (data: DroneDonationFormData) => {
    console.log("Dados enviados:", data);
    reset();
  };

  const handleDonations = () => {
    navigation.navigate("MyDonationsScreen");
  }

  return (
    <View style={styles.container}>
      
      <BackArrow color="#fff"/>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Doação de drone</Text>

        <Text style={styles.subtitle}>
          Nós ficamos muito gratos pelo seu apoio!{"\n"}
          Sua doação ajudará muitas pessoas e famílias!
        </Text>

        <Controller
          control={control}
          name="tipo"
          rules={{ required: "O tipo é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Modelo do drone"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.tipo && <Text style={styles.error}>{errors.tipo.message}</Text>}

        <Controller
          control={control}
          name="autonomia"
          rules={{ required: "A autonomia é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Autonomia"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.autonomia && <Text style={styles.error}>{errors.autonomia.message}</Text>}

        <Controller
          control={control}
          name="alcanceKm"
          rules={{ required: "O alcance é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Alcance (km)"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.alcanceKm && <Text style={styles.error}>{errors.alcanceKm.message}</Text>}

        <Controller
          control={control}
          name="cargaKg"
          rules={{ required: "A carga é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Carga (kg)"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="funcoes"
          rules={{ required: "As funções são obrigatórias" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Funções"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={onChange}
              
            />
          )}
        />

          <ButtonStandard
            text="Cadastrar doação"
            onPress={handleSubmit(onSubmit)}
            width={360}
            color="#30d158"
            textColor="#000"
            borderRadius={5}
          />

          <ButtonStandard
            text="Ver minhas doações"
            onPress={handleDonations}
            width={360}
            color="#30d158"
            textColor="#000"
            borderRadius={5}
          />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4ec3da",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    color: "#ff6666",
    fontSize: 12,
    marginBottom: 8,
  },
});
