// Por ejemplo, en DetailScreen.js, agrega una función para obtener predicciones:
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export default function DetailScreen() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://128.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: [/* datos de entrada para el modelo */],
        }),
      });
      const json = await response.json();
      setPrediction(json.prediction);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Predicción de impacto:</Text>
      {loading ? <ActivityIndicator size="large" /> : <Text>{prediction ? JSON.stringify(prediction) : 'Sin datos'}</Text>}
      <Button title="Obtener predicción" onPress={getPrediction} />
    </View>
  );
}
