from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError

app = Flask(__name__)

# Cargar el modelo sin compilar
model = load_model('modelo.h5', compile=False)

# Compilar manualmente
model.compile(optimizer="adam", loss=MeanSquaredError())

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_data = data.get('input')
    if input_data is None:
        return jsonify({'error': 'No se proporcionaron datos de entrada'}), 400

    try:
        input_array = np.array(input_data)
        if len(input_array.shape) == 1:
            input_array = input_array.reshape(1, -1)
    except Exception as e:
        return jsonify({'error': 'Formato de datos inválido', 'details': str(e)}), 400

    try:
        prediction = model.predict(input_array)
    except Exception as e:
        return jsonify({'error': 'Error al predecir', 'details': str(e)}), 500

    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
