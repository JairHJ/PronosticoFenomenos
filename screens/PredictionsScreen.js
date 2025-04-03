import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Para usar iconos

const PredictionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predicciones de Fenómenos Naturales</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Predicción de Huracanes */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Predicciones de Huracanes')} // Cambio de pantalla
        >
          <View style={styles.cardHeader}>
            <Icon name="cloud-outline" size={30} color="#fff" />
            <Text style={styles.cardTitle}>Huracanes</Text>
          </View>
          <Text style={styles.cardDescription}>
            Consultar las últimas predicciones de huracanes en diferentes regiones.
          </Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver Predicciones</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Predicción de Terremotos */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Predicciones de Terremotos')} // Cambio de pantalla
        >
          <View style={styles.cardHeader}>
            <Icon name="earth" size={30} color="#fff" />
            <Text style={styles.cardTitle}>Terremotos</Text>
          </View>
          <Text style={styles.cardDescription}>
            Conoce las zonas de riesgo y la predicción de terremotos cercanos.
          </Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver Predicciones</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Predicción de Tsunamis */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Predicciones de Tsunamis')} // Cambio de pantalla
        >
          <View style={styles.cardHeader}>
            <Icon name="water-outline" size={30} color="#fff" />
            <Text style={styles.cardTitle}>Tsunamis</Text>
          </View>
          <Text style={styles.cardDescription}>
            Accede a las predicciones de tsunamis y zonas vulnerables.
          </Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver Predicciones</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ecf0f1',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra en el texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#34495e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default PredictionsScreen;
