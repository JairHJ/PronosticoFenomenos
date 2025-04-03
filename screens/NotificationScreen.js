import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationScreen() {
  const [expoToken, setExpoToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoToken(token));

    // Listener para recibir notificaciones mientras la app está en primer plano
    const notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
      // Mostrar la notificación en la app usando alert o lógica personalizada
      alert(`Notificación: ${notification.request.content.title} - ${notification.request.content.body}`);
    });

    // Listener para manejar la respuesta a las notificaciones
    const notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notificación respondida:', response);
    });

    // Limpiar los listeners cuando el componente se desmonte
    return () => {
      notificationReceivedListener.remove();
      notificationResponseListener.remove();
    };
  }, []);

  // Función para registrar el dispositivo y obtener el token
  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Obtener permisos de notificación
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Si no se otorgan permisos, mostrar mensaje
    if (finalStatus !== 'granted') {
      alert('No se han otorgado permisos para las notificaciones.');
      return;
    }

    // Obtener el token de Expo Push
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token Expo:', token);  // Para verificar que se obtiene correctamente
    return token;
  }

  // Función para enviar la notificación local
  const sendLocalNotification = async () => {
    console.log('Enviando notificación local...');
    
    // Notificación inmediata
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '¡Alerta de Fenómeno Natural!',
        body: 'Se ha detectado una condición crítica. Revisa la app para más detalles.',
      },
      trigger: { seconds: 1 },  // Notificación en 1 segundo
    });
    
    console.log('Notificación enviada');  // Confirmación en logs
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Token del dispositivo:</Text>
      <Text>{expoToken || 'No registrado'}</Text>
      <Button title="Enviar notificación local" onPress={sendLocalNotification} />
    </View>
  );
}
