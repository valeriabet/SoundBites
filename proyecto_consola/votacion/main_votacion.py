from proyecto_consola.votacion.sistema_votacion import SistemaVotacion

sistema_votacion = SistemaVotacion()

def menu_votacion(usuario):
    while True:
        print("\n--- MENÚ VOTACIÓN ---")
        print("1. Votar")
        print("2. Ver resultados")
        print("3. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            if not usuario:
                print("Debes iniciar sesión primero")
                continue

            if usuario.rol != "cliente":
                print("Solo los clientes pueden votar")
                continue

            print("\nGéneros disponibles:")
            print(sistema_votacion.listar_generos())
            try:
                id_genero = int(input("Seleccione género: "))
                print(sistema_votacion.votar(usuario, id_genero))
            except ValueError:
                print("Entrada inválida")

        elif opcion == "2":
            print("\n Resultados de votación:")
            print(sistema_votacion.ver_resultados())

        elif opcion == "3":
            break

        else:
            print("Opción inválida")