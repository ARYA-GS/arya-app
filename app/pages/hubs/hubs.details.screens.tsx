import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Hub } from '../../model/hub.interface'; 
import { RootStackParamList } from '../../routes/root.stack.navigation'; 
import BackArrow from '../../components/common/back.arrow.component';

type HubsDetailsRouteProp = RouteProp<RootStackParamList, 'HubsDetailsScreen'>;

const HubsDetailsScreen = ( ) => {
  const route = useRoute<HubsDetailsRouteProp>();
  const { hub } = route.params;

  if (!hub) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalhes do Hub</Text>
        <Text style={{ color: '#fff' }}>Nenhum dado do Hub disponível.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackArrow color='#fff'/>
      <Text style={styles.title}>Detalhes do Hub</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{hub.nome}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{hub.status}</Text>

        <Text style={styles.label}>Bairro:</Text>
        <Text style={styles.value}>{hub.endereco.bairro}</Text>

        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.value}>{hub.endereco.cidade}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{hub.endereco.estado}</Text>

        <Text style={styles.label}>País:</Text>
        <Text style={styles.value}>{hub.endereco.pais}</Text>

        <Text style={styles.label}>Latitude:</Text>
        <Text style={styles.value}>{hub.endereco.latitude}</Text>

        <Text style={styles.label}>Longitude:</Text>
        <Text style={styles.value}>{hub.endereco.longitude}</Text>
      </View>
    </View>
  );
};

export default HubsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
});
