import votacion.main_votacion as main_votacion
import usuarios.main_usuarios as main_usuarios
from votacion.sistema_votacion import SistemaVotacion
from usuarios.sistema_usuarios import SistemaUsuarios

# ===== INSTANCIA =====
sistema_usuarios = SistemaUsuarios()
sistema_votacion = SistemaVotacion()

# Compartir instancias
main_usuarios.sistema_usuarios = sistema_usuarios
main_votacion.sistema_votacion = sistema_votacion

# ===== MENÚ PRINCIPAL =====

def menu():
    while True:
        print("\n===== SISTEMA RESTAURANTE =====")
        print("1. Gestión de usuarios")
        print("2. Votar")
        print("3. Ver resultados")
        print("4. Gestión de platos")
        print("5. Gestión de categorías")
        print("0. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            main_usuarios.menu_usuarios()
            
        elif opcion == "2":
            usuario = main_usuarios.usuario_actual
            main_votacion.menu_votacion(usuario)
            
        elif opcion == "3":
            print("\n--- RESULTADOS ---")
            print(sistema_votacion.ver_resultados())
            
        elif opcion == "0":
            print("Saliendo del sistema...")
            break
        else:
            print("Opción inválida")


# ===== EJECUCIÓN =====

if __name__ == "__main__":
    menu()
