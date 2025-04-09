import psycopg2
import json
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

db_config = {
    "host": "dpg-cvqqveili9vc73bsq740-a.oregon-postgres.render.com",
    "user": "adminuser",
    "password": "DDOnuidCR2scINjypZU2XpDNsdrXdYnl",
    "database": "pronosticodb",
    "port": 5432
}

JSON_FILE = "situacion_huracanes.json"

def enviar_datos_bd():
    """Carga datos desde el JSON y los envía a la base de datos."""
    try:
        with open(JSON_FILE, "r") as archivo:
            datos_huracanes = json.load(archivo)

        # Conectar a la base de datos
        conexion = psycopg2.connect(**db_config)
        cursor = conexion.cursor()

        # Eliminar datos anteriores para evitar duplicados
        cursor.execute("DELETE FROM pronos_h")
        conexion.commit()

        # Insertar los nuevos datos
        for estado, datos in datos_huracanes.items():
            sql = """
            INSERT INTO pronos_h (nom_est, id_dl, temp_ph, presion_ph, viento_ph)
            VALUES (%s, %s, %s, %s, %s)
            """
            valores = (
                estado,
                datos["Nivel de Riesgo"],
                str(datos["Temperatura (°C)"]) if datos["Temperatura (°C)"] is not None else "N/A",
                str(datos["Presión (hPa)"]) if datos["Presión (hPa)"] is not None else "N/A",
                str(datos["Viento (m/s)"]) if datos["Viento (m/s)"] is not None else "N/A"
            )
            cursor.execute(sql, valores)

        conexion.commit()
        print("✅ Datos actualizados en la base de datos.")

    except psycopg2.Error as err:
        print(f"❌ Error con la base de datos: {err}")

    except json.JSONDecodeError:
        print("❌ Error al leer el JSON. Puede que aún no esté listo.")

    finally:
        if 'conexion' in locals() and conexion:
            cursor.close()
            conexion.close()
            print("🔌 Conexión cerrada.")
