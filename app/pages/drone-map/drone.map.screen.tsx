import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { minimalMapStyle } from './config.map';
import { droneLocations, droneLocations2 } from './lista.drones'; // Simule um segundo conjunto

const DroneMapScreen = () => {
  const [currentLocations, setCurrentLocations] = useState(droneLocations);
  const [mapMode, setMapMode] = useState(1);

  const toggleMapData = () => {
    setCurrentLocations(mapMode === 1 ? droneLocations2 : droneLocations);
    setMapMode(prev => (prev === 1 ? 2 : 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ARYA - Drone Map</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -14.2350,
          longitude: -51.9253,
          latitudeDelta: 25,
          longitudeDelta: 25,
        }}
        customMapStyle={minimalMapStyle}
        showsPointsOfInterest={false}
        showsBuildings={false}
      >
        {currentLocations.map((drone) => (
          <Marker
            key={drone.id}
            coordinate={{ latitude: drone.latitude, longitude: drone.longitude }}
            title={`Drone: ${drone.id}`}
          >
            <Image
              source={require('../../assets/drone-icon-grande.png')}
              style={styles.markerIcon}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      {/* Legenda e Botão */}
      <View style={styles.footer}>
        <View style={styles.legend}>
          <Text style={styles.legendItem}>⬤ alimentos</Text>
          <Text style={styles.legendItem}>⬤ remédios</Text>
          <Text style={styles.legendItem}>⬤ água</Text>
        </View>

        <TouchableOpacity onPress={toggleMapData} style={styles.toggleButton}>
          <Image
            source={require('../../assets/drone-icon.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
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
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legend: {
    backgroundColor: '#fff',
    paddingHorizontal:30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  legendItem: {
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
  },
  toggleButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 4,
  },
});

export default DroneMapScreen;
