import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importa la imagen como un módulo
import backgroundImage from '../assets/background.jpg';

const HomeScreen = ({ navigation }) => {
  // Animación de entrada
  const fadeAnim = new Animated.Value(0); // Opacidad de la animación

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage} // Usa la imagen importada
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Plataforma de Predicción</Text>
        <Text style={styles.subtitle}>Huracanes, Terremotos y Tsunamis</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Predicciones')}
          >
            <Icon name="eye" size={40} color="#fff" />
            <Text style={styles.buttonText}>Ver Predicciones</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Ayuda')}
          >
            <Icon name="help-circle-outline" size={30} color="#fff" />
            <Text style={styles.footerText}>Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Emergencia')}
          >
            <Icon name="warning" size={30} color="#fff" />
            <Text style={styles.footerText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 15, // Bordes redondeados en la imagen de fondo
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad para resaltar el contenido
    borderRadius: 15,
    width: '100%',
    padding: 30,
    borderWidth: 1,
    borderColor: '#fff', // Borde fino blanco alrededor
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#ecf0f1',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ecf0f1',
    marginBottom: 50,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3498db', // Mantenemos el color original
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '80%',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease', // Transición suave al presionar
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 25,
    backgroundColor: '#34495e', // Mantengo el color original para los botones del pie
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease', // Transición suave al presionar
  },
  footerText: {
    fontSize: 14,
    color: '#ecf0f1',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default HomeScreen;
