import psycopg2
import json
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configuración de la base de datos
db_config = {
    "host": "dpg-cvqqveili9vc73bsq740-a.oregon-postgres.render.com",
    "user": "adminuser",
    "password": "DDOnuidCR2scINjypZU2XpDNsdrXdYnl",
    "database": "pronosticodb",
    "port": 5432 
}

# Archivo JSON a monitorear
JSON_FILE = "banzai.json"

def enviar_datos_bd():
    """Carga datos desde el JSON y los envía a la base de datos."""
    try:
        with open(JSON_FILE, "r") as archivo:
            datos_tsunamis = json.load(archivo)

        # Conectar a la base de datos
        conexion = psycopg2.connect(**db_config)
        cursor = conexion.cursor()

        # Eliminar datos anteriores para evitar duplicados
        cursor.execute("DELETE FROM pronos_tt")
        conexion.commit()

        # Insertar los nuevos datos
        for estado, datos in datos_tsunamis.items():
            sql = """
            INSERT INTO pronos_tt (nom_est, magn_tt, id_dl, date, lat_tt, long_tt)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            valores = (
                estado,  # Nombre del estado costero
                str(datos["magnitude"]) if datos["magnitude"] != "No hay actividad" else "N/A",
                str(datos["alert"]),
                str(datos["date"]),
                str(datos["latitude"]) if datos["latitude"] != "No hay datos" else "N/A",
                str(datos["longitude"]) if datos["longitude"] != "No hay datos" else "N/A"
            )
            cursor.execute(sql, valores)

        conexion.commit()
        print("✅ Datos actualizados en la base de datos.")

    except psycopg2.Error as err:
        print(f"❌ Error con la base de datos: {err}")

    except json.JSONDecodeError:
        print("❌ Error al leer el JSON. Puede que aún no esté listo.")

    except Exception as e:
        print(f"❌ Error inesperado: {e}")

    finally:
        if 'conexion' in locals() and conexion:
            cursor.close()
            conexion.close()
            print("🔌 Conexión cerrada.")
