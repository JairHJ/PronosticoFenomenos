import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Coordenada de latitud inicial
          longitude: -122.4324, // Coordenada de longitud inicial
          latitudeDelta: 0.0922, // Zoom en latitud
          longitudeDelta: 0.0421, // Zoom en longitud
        }}>
        {/* Marcador en las coordenadas iniciales */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'flex-end', // Posiciona el contenido al fondo
    alignItems: 'center', // Centra el mapa horizontalmente
  },
  map: {
    width: '100%', // Mapa ocupa todo el ancho
    height: '100%', // Mapa ocupa toda la altura
  },
});
