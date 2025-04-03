from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configuración de la base de datos
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "password",
    "database": "pphfn",
    "port": 3306
}

@app.route('/pronos', methods=['GET'])
def get_pronos():
    """Devuelve todos los registros de la tabla pronos_h con el nombre del nivel de riesgo,
       ignorando los que no tienen datos o son NULL."""
    try:
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)

        # Consulta SQL para obtener datos de pronos_h con el nombre del nivel de riesgo
        cursor.execute("""
            SELECT 
                p.id_ph,  -- La columna es id_ph en lugar de id_tt
                p.nom_est, 
                p.viento_ph, 
                p.temp_ph, 
                p.presion_ph, 
                p.id_dl,
                d.nom_dl  -- Se obtiene el nombre del nivel de riesgo
            FROM pronos_h p
            JOIN danger_level d ON p.id_dl = d.id_dl
            WHERE p.id_dl IS NOT NULL AND p.id_dl != 5;
        """)

        resultados = cursor.fetchall()
        return jsonify(resultados)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/pronos_tt', methods=['GET'])
def get_pronos_tt():
    """Devuelve todos los registros de la tabla pronos_tt con el nombre del nivel de riesgo,
       ignorando los que no tienen datos, son NULL o contienen 'N/A'."""
    try:
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor(dictionary=True)

        # Consulta SQL con filtros para excluir 'N/A' y valores NULL
        cursor.execute("""
            SELECT 
                p.id_tt, 
                p.nom_est, 
                p.magn_tt, 
                p.date, 
                p.lat_tt, 
                p.long_tt, 
                d.nom_dl  -- Se obtiene el nombre del nivel de riesgo
            FROM pronos_tt p
            JOIN danger_level d ON p.id_dl = d.id_dl
            WHERE p.id_dl IS NOT NULL 
                AND p.id_dl != 5
                AND p.magn_tt != 'N/A'
                AND p.lat_tt != 'N/A'
                AND p.long_tt != 'N/A';
        """)

        resultados = cursor.fetchall()
        return jsonify(resultados)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()



if __name__ == '__main__':
    # Ejecuta la API en el puerto 5000
    app.run(host="10.13.7.237", port=5000, debug=True)
