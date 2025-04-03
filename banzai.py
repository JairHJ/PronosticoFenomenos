import requests
from datetime import datetime
import json
import time

URL_USGS = "https://earthquake.usgs.gov/fdsnws/event/1/query"

FECHA_INICIO = "2025-01-01"
FECHA_FIN = datetime.utcnow().strftime("%Y-%m-%d")

LAT_MIN = 14.5
LAT_MAX = 32.7
LON_MIN = -118.5
LON_MAX = -86.7

ESTADOS_COSTEROS = {
    "Baja California": (30, 32.7, -117, -114),
    "Baja California Sur": (22, 30, -113, -109),
    "Sonora": (26, 32, -113, -109),
    "Sinaloa": (22, 26, -108, -105),
    "Nayarit": (20, 22, -106, -104),
    "Jalisco": (18, 20, -106, -103),
    "Colima": (18, 19, -105, -103),
    "Michoacán": (17, 18, -103, -101),
    "Guerrero": (16, 17, -101, -98),
    "Oaxaca": (15, 16, -98, -95),
    "Chiapas": (14.5, 15, -95, -92),
    "Tamaulipas": (22, 27, -98, -94),
    "Veracruz": (18, 22, -97, -93),
    "Tabasco": (17, 18, -94, -91),
    "Campeche": (18, 20, -92, -89),
    "Yucatán": (20, 22, -91, -87),
    "Quintana Roo": (18, 21, -88, -86)
}

def obtener_estado(lat, lon):
    for estado, (lat_min, lat_max, lon_min, lon_max) in ESTADOS_COSTEROS.items():
        if lat_min <= lat <= lat_max and lon_min <= lon <= lon_max:
            return estado
    return None

def convertir_alerta(alert):
    alert_map = {
        "green": 1,
        "yellow": 2, 
        "orange": 2,
        "red": 3
    }
    return alert_map.get(alert, 0)  # Si no hay alerta, asigna 0

def obtener_tsunamis_mexico():
    params = {
        "format": "geojson",
        "starttime": FECHA_INICIO,
        "endtime": FECHA_FIN,
        "minmagnitude": 3.0, 
        "eventtype": "earthquake",
        "maxlatitude": LAT_MAX,
        "minlatitude": LAT_MIN,
        "maxlongitude": LON_MAX,
        "minlongitude": LON_MIN,
    }

    response = requests.get(URL_USGS, params=params)

    tsunamis_mexico = {estado: {
        "magnitude": "No hay actividad",
        "alert": 0,  # Ahora la alerta es 0 en lugar de 5
        "date": "N/A",
        "latitude": "No hay datos",
        "longitude": "No hay datos"
    } for estado in ESTADOS_COSTEROS.keys()}

    if response.status_code == 200:
        data = response.json()

        for evento in data["features"]:
            try:
                properties = evento["properties"]
                time = properties.get("time", 0)
                magnitude = properties.get("mag", "No disponible")
                alert = properties.get("alert", "No disponible")
                latitude = evento["geometry"]["coordinates"][1]
                longitude = evento["geometry"]["coordinates"][0]

                estado = obtener_estado(latitude, longitude)

                if estado:
                    tiempo_dt = datetime.utcfromtimestamp(time / 1000).strftime("%Y-%m-%d %H:%M:%S")
                    alerta_numerica = convertir_alerta(alert)

                    tsunamis_mexico[estado] = {
                        "magnitude": magnitude,
                        "alert": alerta_numerica,
                        "date": tiempo_dt,
                        "latitude": latitude, 
                        "longitude": longitude}
                    
            except Exception as e:
                print(f"⚠ Error procesando un evento: {e}")

        with open("banzai.json", "w") as outfile:
            json.dump(tsunamis_mexico, outfile, indent=4)

        print(f"✅ Datos actualizados. Total de estados costeros: {len(ESTADOS_COSTEROS)}")
        print(f"Los resultados se han guardado en 'banzai.json'.")

    else:
        print(f"❌ Error al obtener datos de USGS. Status Code: {response.status_code}")

while True:
    obtener_tsunamis_mexico()
    time.sleep(300)
