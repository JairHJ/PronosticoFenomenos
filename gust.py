import requests
import pandas as pd
import json
import time

API_KEY = "94340c773567c51992e1074826614c0a"

ESTADOS_MEXICO = [
    "Baja California", "Baja California Sur", "Sonora", "Sinaloa", "Nayarit", "Jalisco",
    "Colima", "Michoacán", "Guerrero", "Oaxaca", "Chiapas", "Tamaulipas", "Veracruz", "Campeche",
    "Tabasco", "Quintana Roo", "Yucatán"
]

HEADERS = {"User-Agent": "Mozilla/5.0"}

def obtener_ubicacion(estado):
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={estado},MX&limit=1&appid={API_KEY}"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        datos = response.json()
        if datos:
            return datos[0]["lat"], datos[0]["lon"]
    return None, None  

def obtener_datos_noaa():
    url = "https://www.nhc.noaa.gov/CurrentStorms.json"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        datos = response.json()
        if datos.get("activeStorms"):
            return pd.DataFrame(datos["activeStorms"])
    return None

def obtener_datos_meteorologicos(lat, lon):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        datos = response.json()
        return (
            datos["main"].get("temp"),
            datos["main"].get("pressure"),
            datos["wind"].get("speed", 0)
        )
    return None, None, None

def verificar_huracan(estado, lat, lon, df_huracanes):
    temperatura, presion, viento = obtener_datos_meteorologicos(lat, lon)

    if df_huracanes is not None:
        for _, row in df_huracanes.iterrows():
            huracan_lat, huracan_lon = row["lat"], row["lon"]
            distancia = ((huracan_lat - lat) ** 2 + (huracan_lon - lon) ** 2) ** 0.5
            if distancia < 2:  
                return 3, "Huracán activo", temperatura, presion, viento  # Código 3 = Alerta de huracán

    if temperatura and presion:
        if temperatura > 27 and presion < 1000 and viento > 10:
            return 2, "Posible formación", temperatura, presion, viento  # Código 2 = Probabilidad de aparición

    return 1, "Sin actividad", temperatura, presion, viento  # Código 1 = Sin riesgo

def actualizar():
    print("\n🔄 Actualizando datos...\n")
    df_huracanes = obtener_datos_noaa()
    situacion_estados = {}

    for estado in ESTADOS_MEXICO:
        lat, lon = obtener_ubicacion(estado)
        if lat is not None and lon is not None:
            codigo_riesgo, situacion, temperatura, presion, viento = verificar_huracan(estado, lat, lon, df_huracanes)
            situacion_estados[estado] = {
                "Nivel de Riesgo": codigo_riesgo,
                "Descripción": situacion,
                "Temperatura (°C)": temperatura,
                "Presión (hPa)": presion,
                "Viento (m/s)": viento
            }
            print(f"🌎 {estado}: {situacion} (Código: {codigo_riesgo})")

    with open("situacion_huracanes.json", "w") as archivo:
        json.dump(situacion_estados, archivo, indent=4)

    print("\n✅ Datos actualizados y guardados en 'situacion_huracanes.json'.")
    
while True:
    actualizar()
    time.sleep(300) 