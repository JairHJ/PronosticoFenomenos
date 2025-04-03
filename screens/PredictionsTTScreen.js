import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PredictionsTTScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.13.7.237:5000/pronos_tt');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      Alert.alert("Error", "No se pudieron obtener los datos. Verifica la conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => 
    item.nom_est.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskDetails = (level) => {
    switch(level) {
      case '3':  // Peligro Inminente
        return { color: '#e74c3c', icon: 'warning', iconColor: '#fff' };  // Rojo vibrante
      case '2':  // Probabilidad de Aparición
        return { color: '#f39c12', icon: 'alert-circle', iconColor: '#fff' };  // Naranja intenso
      case '1':  // Sin Riesgo
        return { color: '#2ecc71', icon: 'checkmark-circle', iconColor: '#fff' };  // Verde fresco
      default:
        return { color: '#2ecc71', icon: 'shield-checkmark', iconColor: '#fff' };  // Gris suave
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por estado..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_tt.toString()}
          renderItem={({ item }) => {
            const { color, icon, iconColor } = getRiskDetails(item.id_dl);
            return (
              <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.state}>{item.nom_est}</Text>
                    <Text style={styles.details}>🌍 Magnitud: {item.magn_tt || 'N/A'}</Text>
                    <Text style={styles.details}>📅 Fecha: {item.date || 'N/A'}</Text>
                    <Text style={styles.details}>📍 Lat: {item.lat_tt || 'N/A'} | Long: {item.long_tt || 'N/A'}</Text>
                    <Text style={styles.riskLevel}>⚠️ Nivel de Riesgo: {item.nom_dl || 'N/A'}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon name={icon} size={40} color={iconColor} style={styles.icon} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 20,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.,
    shadowRadius: 10,
    elevation: 7,
  },
  cardContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
  },
  state: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#fff',
    padding: 8,
  },
});
