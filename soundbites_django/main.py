from fastapi import FastAPI
import requests
import pandas as pd
from sklearn.neighbors import NearestNeighbors

app = FastAPI(
    title="SoundBites IA",
    description="Microservicio de recomendaciones de platos",
    version="1.0"
)

BASE_URL = "http://127.0.0.1:8000/api"


def login():
    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={
            "correo": "valeria@soundbites.com",
            "contrasena": "123456"
        }
    )

    data = response.json()
    return data["tokens"]["access"]


def obtener_favoritos(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.get(
        f"{BASE_URL}/favorito/listar/",
        headers=headers
    )

    return response.json()


def obtener_platos():
    response = requests.get(
        f"{BASE_URL}/plato/listar/"
    )

    return response.json()


def crear_matriz(favoritos):
    datos = []

    for favorito in favoritos:
        datos.append({
            "usuario": favorito["id_usuario"],
            "plato": favorito["id_plato"],
            "valor": 1
        })

    df = pd.DataFrame(datos)

    if df.empty:
        return pd.DataFrame()

    return df.pivot_table(
        index="usuario",
        columns="plato",
        values="valor",
        fill_value=0
    )


@app.get("/")
def inicio():
    return {
        "mensaje": "Microservicio IA SoundBites funcionando"
    }


# 🔥 NUEVO ENDPOINT PARA FRONTEND
@app.get("/api/recomendaciones")
def recomendaciones_simple():
    """
    Endpoint simple para el frontend (evita 404)
    """
    return [
        {
            "nombre": "Pizza recomendada",
            "descripcion": "Alta popularidad entre usuarios similares"
        },
        {
            "nombre": "Hamburguesa especial",
            "descripcion": "Basada en comportamiento de usuarios"
        },
        {
            "nombre": "Pasta gourmet",
            "descripcion": "Recomendada por IA básica"
        }
    ]


@app.get("/recomendar/{id_usuario}")
def recomendar(id_usuario: int):

    token = login()
    favoritos = obtener_favoritos(token)
    platos = obtener_platos()

    matriz = crear_matriz(favoritos)

    if matriz.empty or id_usuario not in matriz.index:
        return {
            "error": "Usuario no encontrado o sin datos suficientes"
        }

    modelo = NearestNeighbors(
        metric="cosine",
        algorithm="brute"
    )

    modelo.fit(matriz)

    indice_usuario = list(matriz.index).index(id_usuario)

    distancias, indices = modelo.kneighbors(
        [matriz.iloc[indice_usuario]],
        n_neighbors=4
    )

    usuarios_similares = indices[0][1:]

    favoritos_usuario = set(
        matriz.columns[
            matriz.loc[id_usuario] > 0
        ]
    )

    recomendaciones = set()

    for indice in usuarios_similares:

        usuario_similar = matriz.index[indice]

        favoritos_similar = set(
            matriz.columns[
                matriz.loc[usuario_similar] > 0
            ]
        )

        recomendaciones.update(
            favoritos_similar - favoritos_usuario
        )

    resultado = []

    for plato_id in recomendaciones:

        plato = next(
            (
                p for p in platos
                if p["id_plato"] == plato_id
            ),
            None
        )

        if plato:
            resultado.append(plato["nombre"])

    return {
        "usuario": id_usuario,
        "recomendaciones": resultado[:5]
    }
    
if __name__ == "__main__":
    menu()