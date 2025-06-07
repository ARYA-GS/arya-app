import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { minimalMapStyle, darkMapStyle } from "./config.map";
import { droneLocations, droneLocations2 } from "./lista.drones";
import { Ionicons } from "@expo/vector-icons";

const DroneMapScreen = () => {
  const [currentLocations, setCurrentLocations] = useState(droneLocations);
  const [mapMode, setMapMode] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMapData = () => {
    setCurrentLocations(mapMode === 1 ? droneLocations2 : droneLocations);
    setMapMode((prev) => (prev === 1 ? 2 : 1));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ARYA - Drone Map</Text>

      <TouchableOpacity style={styles.darkModeButton} onPress={toggleDarkMode}>
        <Ionicons name={isDarkMode ? "sunny" : "moon"} size={32} color="#fff" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -14.235,
          longitude: -51.9253,
          latitudeDelta: 25,
          longitudeDelta: 25,
        }}
        customMapStyle={isDarkMode ? darkMapStyle : minimalMapStyle}
        showsPointsOfInterest={false}
        showsBuildings={false}
      >
        {currentLocations.map((drone) => (
          <Marker
            key={drone.id}
            coordinate={{
              latitude: drone.latitude,
              longitude: drone.longitude,
            }}
            title={`Drone: ${drone.id}`}
          >
            <Image
              source={
                isDarkMode
                  ? require("../../assets/3.png")
                  : require("../../assets/1.png")
              }
              style={styles.markerIcon}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>


      <View style={styles.footer}>
        <View style={styles.legend}>
          <Text style={styles.legendItem}>
            Acompanhe nossos drones em tempo real:
          </Text>
          <Text style={styles.legendItem}>⬤ alimentos</Text>
          <Text style={styles.legendItem}>⬤ remédios</Text>
          <Text style={styles.legendItem}>⬤ suprimentos</Text>
        </View>

        <TouchableOpacity onPress={toggleMapData} style={darkMapStyle ? styles.toggleButtonDark : styles.toggleButton}>
          <Image source={darkMapStyle ? require("../../assets/3.png") : require("../../assets/1.png")} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
    paddingTop: 40,
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 30,
    height: 40,
  },
  darkModeButton: {
    position: "absolute",
    top: 120,
    right: 20,
    zIndex: 10,
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 6,
    elevation: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legend: {
    width: "80%",
    opacity: 0.8,
    backgroundColor: "#636363",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  legendItem: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 4,
  },
  toggleButtonDark: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 4,
  },
});

export default DroneMapScreen;
