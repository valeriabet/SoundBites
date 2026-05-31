import requests
import pandas as pd
from sklearn.neighbors import NearestNeighbors

BASE_URL = "http://127.0.0.1:8000/api"


def login(correo, contrasena):

    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={
            "correo": correo,
            "contrasena": contrasena
        }
    )

    response.raise_for_status()

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

    response.raise_for_status()

    return response.json()


def obtener_platos():

    response = requests.get(
        f"{BASE_URL}/plato/listar/"
    )

    response.raise_for_status()

    return response.json()


def crear_matriz(favoritos):

    filas = []

    for favorito in favoritos:

        filas.append({
            "usuario": favorito["id_usuario"],
            "plato": favorito["id_plato"],
            "valor": 1
        })

    df = pd.DataFrame(filas)

    matriz = df.pivot_table(
        index="usuario",
        columns="plato",
        values="valor",
        fill_value=0
    )

    return matriz


def recomendar_usuario(id_usuario, matriz, platos, n_recomendaciones=3):

    if id_usuario not in matriz.index:
        print("Usuario no encontrado")
        return []

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

    nombres_platos = []

    for plato_id in recomendaciones:

        plato = next(
            (
                p
                for p in platos
                if p["id_plato"] == plato_id
            ),
            None
        )

        if plato:
            nombres_platos.append(plato["nombre"])

    return nombres_platos[:n_recomendaciones]


if __name__ == "__main__":

    token = login(
        "valeria@soundbites.com",
        "123456"
    )

    favoritos = obtener_favoritos(token)

    platos = obtener_platos()

    matriz = crear_matriz(favoritos)

    usuario_prueba = matriz.index[0]

    recomendaciones = recomendar_usuario(
        usuario_prueba,
        matriz,
        platos
    )

    print("\nUSUARIO:", usuario_prueba)

    print("\nRECOMENDACIONES:")

    for r in recomendaciones:
        print("-", r)