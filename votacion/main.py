from votacion.sistema_votacion import SistemaVotacion


class Usuario:
    _siguiente_id = 1

    def __init__(self, nombre):
        self.id = Usuario._siguiente_id
        Usuario._siguiente_id += 1
        self.nombre = nombre


def main():
    sistema = SistemaVotacion()
    ana = Usuario("Ana")
    luis = Usuario("Luis")

    print("Géneros disponibles:")
    for g in sistema.listar_generos():
        print(f"  [{g.id}] {g.nombre} — {g.descripcion}")

    print()
    print(sistema.votar(ana, 1))
    print(sistema.votar(luis, 2))
    print("Segundo voto de Ana (debe rechazarse):", sistema.votar(ana, 3))
    print("Género inexistente:", sistema.votar(luis, 99))

    print()
    print("Resultados:", sistema.ver_resultados())


if __name__ == "__main__":
    main()
