import requests

BASE_URL = "http://127.0.0.1:8000/api"


def login(correo, contrasena):

    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={
            "correo": correo,
            "contrasena": contrasena
        }
    )

    if response.status_code != 200:
        print("Error al iniciar sesión")
        print(response.text)
        return None

    data = response.json()

    token = data["tokens"]["access"]

    return token


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


if __name__ == "__main__":

    token = login(
        "valeria@soundbites.com",
        "123456"
    )

    if token:

        favoritos = obtener_favoritos(token)
        platos = obtener_platos()

        print("\nFAVORITOS:")
        print(f"Cantidad: {len(favoritos)}")

        print("\nPLATOS:")
        print(f"Cantidad: {len(platos)}")