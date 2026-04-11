from votacion.sistema_votacion import SistemaVotacion
from main_usuarios import obtener_usuario_actual

sistema_votacion = SistemaVotacion()

def menu_votacion():
    while True:
        print("\n--- MENÚ VOTACIÓN ---")
        print("1. Votar")
        print("2. Ver resultados")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        usuario = obtener_usuario_actual()

        if opcion == "1":
            if not usuario:
                print("Debes iniciar sesión primero")
                continue

            if usuario.rol != "cliente":
                print("Solo los clientes pueden votar")
                continue

            print("\nGéneros disponibles:")
            for g in sistema_votacion.listar_generos():
                print(f"{g.id}. {g.nombre}")

            try:
                id_genero = int(input("Seleccione género: "))
                print(sistema_votacion.votar(usuario, id_genero))
            except ValueError:
                print("Entrada inválida")

        elif opcion == "2":
            resultados = sistema_votacion.ver_resultados()
            print("\n--- RESULTADOS ---")
            for genero, votos in resultados.items():
                print(f"{genero}: {votos} votos")

        elif opcion == "0":
            break

        else:
            print("Opción inválida")