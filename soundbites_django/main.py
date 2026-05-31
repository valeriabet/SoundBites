"""
Microservicio IA — SoundBites
Algoritmo: K-Nearest Neighbors (cosine similarity) sobre matriz usuario-plato de favoritos.

Cómo correrlo:
    pip install fastapi uvicorn requests pandas scikit-learn
    uvicorn main:app --port 8001 --reload

Requiere que el backend Django esté corriendo en http://localhost:8000
"""

import os
import requests
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.neighbors import NearestNeighbors

# ── Configuración
DJANGO_URL  = os.getenv("DJANGO_URL",  "http://localhost:8000/api")
IA_USER     = os.getenv("IA_USER",     "admin@soundbites.com")   
IA_PASSWORD = os.getenv("IA_PASSWORD", "admin1234")             
N_NEIGHBORS = int(os.getenv("N_NEIGHBORS", "3"))                 

app = FastAPI(
    title="SoundBites IA",
    description="Microservicio de recomendaciones de platos",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Helpers
def obtener_token() -> str:
    """Obtiene un token JWT del backend Django."""
    res = requests.post(
        f"{DJANGO_URL}/auth/login/",
        json={"correo": IA_USER, "contrasena": IA_PASSWORD},
        timeout=10,
    )
    if res.status_code != 200:
        raise RuntimeError(f"No se pudo autenticar con Django: {res.text}")
    return res.json()["tokens"]["access"]


def obtener_datos(token: str, endpoint: str) -> list:
    """Llama a un endpoint de Django con autenticación."""
    res = requests.get(
        f"{DJANGO_URL}{endpoint}",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    )
    res.raise_for_status()
    return res.json()


def crear_matriz(favoritos: list) -> pd.DataFrame:
    """
    Construye la matriz usuario-plato.
    Filas = id_usuario, Columnas = id_plato, Valor = 1 si es favorito, 0 si no.
    """
    if not favoritos:
        return pd.DataFrame()

    df = pd.DataFrame(favoritos)

   
    if df["id_usuario"].dtype == object:
        df["id_usuario"] = df["id_usuario"].apply(
            lambda x: x["id_usuario"] if isinstance(x, dict) else x
        )
    if df["id_plato"].dtype == object:
        df["id_plato"] = df["id_plato"].apply(
            lambda x: x["id_plato"] if isinstance(x, dict) else x
        )

    matriz = df.pivot_table(
        index="id_usuario",
        columns="id_plato",
        aggfunc=lambda x: 1,
        fill_value=0,
    )
    return matriz


# ── Endpoints
@app.get("/")
def inicio():
    return {"mensaje": "Microservicio IA SoundBites funcionando"}


@app.get("/recomendar/{id_usuario}")
def recomendar(id_usuario: int):
    # 1. Autenticarse con Django
    try:
        token = obtener_token()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error de autenticación: {str(e)}")

    # 2. Traer favoritos y platos
    try:
        favoritos = obtener_datos(token, "/favorito/listar/")
        platos    = obtener_datos(token, "/plato/listar/")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error comunicándose con Django: {str(e)}")

    if not favoritos:
        return {"recomendaciones": [], "mensaje": "No hay favoritos registrados aún."}

    # 3. Construir matriz
    matriz = crear_matriz(favoritos)

    if matriz.empty:
        return {"recomendaciones": [], "mensaje": "No se pudo construir la matriz de favoritos."}

    # 4. Verificar que el usuario existe en la matriz
    if id_usuario not in matriz.index:
        return {
            "recomendaciones": [],
            "mensaje": "El usuario aún no tiene favoritos. ¡Agrega algunos platos favoritos para recibir recomendaciones!",
        }

    # 5. Ajustar n_neighbors según usuarios disponibles (KNN necesita al menos 2)
    n_usuarios = len(matriz)
    if n_usuarios < 2:
        return {
            "recomendaciones": [],
            "mensaje": "Se necesitan al menos 2 usuarios con favoritos para generar recomendaciones.",
        }

    k = min(N_NEIGHBORS + 1, n_usuarios)  

    # 6. Entrenar KNN
    modelo = NearestNeighbors(n_neighbors=k, metric="cosine", algorithm="brute")
    modelo.fit(matriz.values)

    # 7. Encontrar usuarios similares
    indice_usuario = matriz.index.get_loc(id_usuario)
    _, indices = modelo.kneighbors([matriz.values[indice_usuario]])

    usuarios_similares = [
        matriz.index[i] for i in indices[0] if matriz.index[i] != id_usuario
    ]

    # 8. Platos que ya tiene el usuario como favoritos
    favoritos_usuario = set(
        col for col in matriz.columns if matriz.loc[id_usuario, col] == 1
    )

    # 9. Recopilar platos de usuarios similares que el usuario no tiene
    platos_recomendados_ids = set()
    for uid in usuarios_similares:
        favoritos_similar = set(
            col for col in matriz.columns if matriz.loc[uid, col] == 1
        )
        platos_recomendados_ids |= favoritos_similar - favoritos_usuario

    if not platos_recomendados_ids:
        return {
            "recomendaciones": [],
            "mensaje": "Ya tienes los mismos favoritos que los usuarios más similares a ti. ¡Sigue explorando!",
        }

    # 10. Enriquecer con datos completos del plato
    platos_map = {p["id_plato"]: p for p in platos}
    resultado = [
        platos_map[pid]
        for pid in platos_recomendados_ids
        if pid in platos_map
    ]

    return {"recomendaciones": resultado}
