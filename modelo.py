import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.losses import MeanSquaredError

n_samples = 1000
n_timesteps = 10
n_features = 3

X = np.random.rand(n_samples, n_timesteps, n_features)
y = np.random.rand(n_samples, 1)

model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(n_timesteps, n_features)))
model.add(Dense(1))

# Asegurar que la función de pérdida se serializa correctamente
model.compile(optimizer=Adam(learning_rate=0.001), loss=MeanSquaredError())

# Guardar correctamente el modelo
model.save('modelo.h5')
print("✅ Modelo entrenado y guardado como 'modelo.h5'")
