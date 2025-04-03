import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

const EmergencyScreen = () => {
  const [seconds, setSeconds] = useState(10); // Tiempo de cuenta regresiva
  const [isCalling, setIsCalling] = useState(false); // Estado de llamada en progreso

  // Función para manejar la cuenta regresiva
  useEffect(() => {
    let interval;

    if (seconds > 0 && !isCalling) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Cuando el tiempo se acaba, realiza la llamada automáticamente
      makeEmergencyCall();
    }

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
  }, [seconds, isCalling]);

  // Función para realizar la llamada de emergencia
  const makeEmergencyCall = () => {
    setIsCalling(true);
    const emergencyNumber = '911';
    Linking.openURL(`tel:${emergencyNumber}`); // Llama automáticamente al número de emergencia
  };

  // Función para reiniciar la cuenta regresiva y la llamada
  const handleReset = () => {
    setSeconds(10);
    setIsCalling(false);
  };

  return (
    <View style={styles.container}>

      {/* Titulo */}
      <Text style={styles.title}>¡EMERGENCIA!</Text>
      
      {/* Subtitulo de instrucciones */}
      <Text style={styles.subtitle}>
        Si estás en una situación de emergencia, presiona el botón para contactar con los servicios de emergencia.
      </Text>

      {/* Imagen de alerta */}
      <Image source={require('../assets/emergency.png')} style={styles.alertIcon} />

      {/* Botón SOS con cuenta regresiva */}
      <TouchableOpacity
        style={[styles.sosButton, isCalling && styles.buttonDisabled]}
        onPress={isCalling ? null : makeEmergencyCall}
        disabled={isCalling}
      >
        <Text style={styles.sosButtonText}>
          {isCalling ? 'Llamando...' : `¡SOS! (${seconds}s)`}
        </Text>
      </TouchableOpacity>

      {/* Texto informativo */}
      <Text style={styles.footer}>Si no se llama automáticamente, por favor marca el número 911.</Text>

      {/* Opción de reiniciar el contador si es necesario */}
      {isCalling && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5C5C', // Rojo de emergencia
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  alertIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    zIndex: 1,
  },
  sosButton: {
    backgroundColor: '#D10000', // Rojo intenso
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 40,
    elevation: 10, // Sombra para un efecto de profundidad
    zIndex: 1,
    width: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#808080', // Gris cuando el botón está deshabilitado
  },
  sosButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 20,
    zIndex: 1,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#FFC107', // Amarillo de advertencia
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default EmergencyScreen;
