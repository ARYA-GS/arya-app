import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { minimalMapStyle } from './config.map';
import { droneLocations } from './lista.drones';

const DroneMapScreen = () => {
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
        {droneLocations.map((drone) => (
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
});

export default DroneMapScreen;
