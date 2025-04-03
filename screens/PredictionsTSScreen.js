import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, 
  Alert, TextInput, TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PredictionsTSScreen() {
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
      Alert.alert("Error", "No se pudieron obtener los datos. Verifica la conexión.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar los datos según la búsqueda
  const filteredData = data.filter(item => 
    item.nom_est.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para asignar colores e iconos según el nivel de riesgo
  const getRiskDetails = (nom_dl) => {
    switch(nom_dl) {
      case 'Peligro Inminente':
        return { color: '#e74c3c', icon: 'warning', iconColor: '#fff' }; // Rojo
      case 'Probabilidad de Aparición':
        return { color: '#f39c12', icon: 'alert-circle', iconColor: '#fff' }; // Naranja
      case 'Bajo Riesgo':
        return { color: '#f1c40f', icon: 'alert', iconColor: '#fff' }; // Amarillo
      case 'Sin Riesgo':
        return { color: '#2ecc71', icon: 'checkmark-circle', iconColor: '#fff' }; // Verde
      default:
        return { color: '#95a5a6', icon: 'help-circle', iconColor: '#fff' }; // Gris
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por estado..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_tt.toString()}
          renderItem={({ item }) => {
            const { color, icon, iconColor } = getRiskDetails(item.nom_dl);
            return (
              <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.state}>{item.nom_est}</Text>
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
    shadowOpacity: 0.3,
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
  riskLevel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
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
