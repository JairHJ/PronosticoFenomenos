import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener estas dependencias
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation();

  // Funciones para manejar la navegación

  const handleSendEmail = () => {
    Linking.openURL('mailto:comp4you@gmail.com');  // Reemplaza con el correo real
  };

  const handleContactSupport = () => {
    // Redirigir a WhatsApp
    const phoneNumber = '+524424058680'; // Reemplaza con el número de teléfono de soporte
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/soporte.jpg')} style={styles.headerImage} />
        <Text style={styles.title}>Ayuda y Soporte</Text>
      </View>

      {/* Navigation Section */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={handleContactSupport}>
          <MaterialIcons name="support-agent" size={24} color="white" />
          <Text style={styles.navButtonText}>Soporte</Text>
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Cómo funciona la aplicación?</Text>
        <Text style={styles.text}>
          Nuestra aplicación te permite realizar seguimientos, recibir notificaciones y acceder a información en tiempo real.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Características clave</Text>
        <Text style={styles.text}>
          La aplicación tiene funcionalidades como:
        </Text>
        <Text style={styles.text}>- Seguimiento en tiempo real</Text>
        <Text style={styles.text}>- Pronósticos precisos</Text>
        <Text style={styles.text}>- Notificaciones push</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte Técnico</Text>
        <Text style={styles.text}>
          Si tienes alguna pregunta o problema, nuestro equipo de soporte está listo para ayudarte.
        </Text>
        <TouchableOpacity style={styles.link} onPress={handleSendEmail}>
          <Text style={styles.linkText}>Enviar correo a soporte</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 PPHFN</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.empresa.com/privacy-policy')}>
          <Text style={styles.footerLink}>Política de privacidad</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Asegura que ScrollView ocupe el 100% del espacio
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerImage: {
    width: '120%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#342F46',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: '#A72233',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 400,
    height: 70,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#342F46',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#A72233',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
  },
  footerLink: {
    fontSize: 14,
    color: '#A72233',
    textDecorationLine: 'underline',
  },
});

export default HelpScreen;
