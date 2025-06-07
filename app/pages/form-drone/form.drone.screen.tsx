import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import ButtonStandard from "../../components/common/button/button.standard";
import BackArrow from "../../components/common/back.arrow.component";
import { useNavigation } from "@react-navigation/native";
import HubController from "../../components/api/hubs.controller";
import { Hub } from "../../model/hub.interface";
import Ionicons from "@expo/vector-icons/Ionicons";


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
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [hubDropdownOpen, setHubDropdownOpen] = useState(false);
  const hubController = new HubController();

  const fetchHubs = async () => {
    const fetchedHubs = await hubController.getHubs();
    setHubs(fetchedHubs as Hub[]);
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  const cadastrarDrone = async (data: DroneDonationFormData) => {
    try {
      const payload = {
        modelo: data.tipo,
        alcanceKm: parseFloat(data.alcanceKm),
        cargaKg: parseFloat(data.cargaKg),
        idHub: data.idHub,
        funcoes: data.funcoes,
      };

      const response = await fetch("http://10.0.2.2:8080/drones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar drone");
      const result = await response.json();
      console.log("Drone cadastrado com sucesso:", result);
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar drone:", error);
    }
  };

  const handleDonations = () => {
    navigation.navigate("MyDonationsScreen");
  };

  return (
    <View style={styles.container}>
      <BackArrow color="#fff" />

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
              keyboardType="numeric"
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
        {errors.autonomia && (
          <Text style={styles.error}>{errors.autonomia.message}</Text>
        )}

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
              keyboardType="numeric"
            />
          )}
        />
        {errors.alcanceKm && (
          <Text style={styles.error}>{errors.alcanceKm.message}</Text>
        )}

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
              keyboardType="numeric"
            />
          )}
        />
        {errors.cargaKg && (
          <Text style={styles.error}>{errors.cargaKg.message}</Text>
        )}

        {/* Dropdown de Hub */}
        <Controller
          control={control}
          name="idHub"
          rules={{ required: "Selecione um hub" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownContainer}>
              <Text
                style={[styles.input, { color: value ? "#000" : "#888" }]}
                onPress={() => setHubDropdownOpen(!hubDropdownOpen)}
              >
                {value
                  ? hubs.find((hub) => hub.idHub === value)?.nome
                  : "Selecione um hub"}
              </Text>
              {hubDropdownOpen && (
                <View style={styles.dropdownList}>
                  {hubs
                    .filter((hub) => hub.status !== "Inativo")
                    .map((hub) => (
                      <Text
                        key={hub.idHub}
                        style={styles.dropdownItem}
                        onPress={() => {
                          onChange(hub.idHub);
                          setHubDropdownOpen(false);
                        }}
                      >
                        {hub.nome}
                      </Text>
                    ))}
                </View>
              )}
            </View>
          )}
        />
        {errors.idHub && (
          <Text style={styles.error}>{errors.idHub.message}</Text>
        )}

        {/* Funções */}
        <Controller
          control={control}
          name="funcoes"
          rules={{ required: "As funções são obrigatórias" }}
          render={({ field: { onChange, value = [] } }) => {
            const [dropdownOpen, setDropdownOpen] = useState(false);
            const funcoesOptions = [
              "medicamentos",
              "vacinas",
              "sangue",
              "alimentos",
              "Mapeamento aéreo",
              "suprimentos",
              "carga",
              "velocidade",
              "Busca e salvamento",
              "Outros",
            ];

            const toggleOption = (option: string) => {
              if (value.includes(option)) {
                onChange(value.filter((item: string) => item !== option));
              } else {
                onChange([...value, option]);
              }
            };

            return (
              <View>
                <Text
                  style={[
                    styles.input,
                    { color: value.length ? "#000" : "#888" },
                  ]}
                  onPress={() => setDropdownOpen(!dropdownOpen)}
                >
                  {value.length ? value.join(", ") : "Selecione as funções"}
                </Text>
                {dropdownOpen && (
                  <View style={styles.dropdownList}>
                    {funcoesOptions.map((option) => (
                      <View
                        key={option}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          onPress={() => toggleOption(option)}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: "#888",
                            marginRight: 10,
                            backgroundColor: value.includes(option)
                              ? "#30d158"
                              : "#fff",
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: value.includes(option) ? "#000" : "#888",
                            fontWeight: "bold",
                            fontSize: 16,
                            lineHeight: 22,
                          }}
                        >
                          {value.includes(option) ? "✓" : ""}
                        </Text>
                        <Text
                          onPress={() => toggleOption(option)}
                          style={{ color: "#222", fontSize: 15 }}
                        >
                          {option}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          }}
        />
        {errors.funcoes && (
          <Text style={styles.error}>{errors.funcoes.message}</Text>
        )}

        <ButtonStandard
          text="Cadastrar doação"
          onPress={handleSubmit(cadastrarDrone)}
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
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  error: {
    color: "#ff6666",
    fontSize: 12,
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
