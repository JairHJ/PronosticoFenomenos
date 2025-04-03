import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PredictionScreen from './screens/PredictionsScreen';
import PredictionsHScreen from './screens/PredictionsHScreen';
import PredictionsTTScreen from './screens/PredictionsTTScreen';
import PredictionsTSScreen from './screens/PredictionsTSScreen';
import HelpScreen from './screens/HelpScreen';
import AlertScreen from './screens/AlertScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Predicciones" component={PredictionScreen} />
        <Stack.Screen name="Predicciones de Huracanes" component={PredictionsHScreen} />
        <Stack.Screen name="Predicciones de Terremotos" component={PredictionsTTScreen} />
        <Stack.Screen name="Predicciones de Tsunamis" component={PredictionsTSScreen} />
        <Stack.Screen name="Ayuda" component={HelpScreen} />
        <Stack.Screen name="Emergencia" component={AlertScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
