from usuarios.usuario import Usuario
import votacion.main_votacion as main_votacion
import usuarios.main_usuarios as main_usuarios
import Menu.main_menu as main_menu
from votacion.sistema_votacion import SistemaVotacion
from usuarios.sistema_usuarios import SistemaUsuarios
from usuarios.main_usuarios import obtener_usuario_actual

# ===== INSTANCIAS =====
sistema_usuarios = SistemaUsuarios()
sistema_votacion = SistemaVotacion()

# Compartir instancias
main_usuarios.sistema_usuarios = sistema_usuarios
main_votacion.sistema_votacion = sistema_votacion


# ===== MENÚ PRINCIPAL =====
def menu():

    while True:

        usuario = obtener_usuario_actual()

        print("\n===== SISTEMA RESTAURANTE =====")
        print("1. Gestión de usuarios")
        print("2. Votar")
        print("3. Ver resultados")
        print("4. Gestión de restaurante")
        print("0. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            main_usuarios.menu_usuarios()

        elif opcion == "2":
            if usuario:
                main_votacion.menu_votacion(usuario)
            else:
                print("Debe iniciar sesión primero")

        elif opcion == "3":
            print("\n Resultados de votación:")
            print(sistema_votacion.ver_resultados())

        elif opcion == "4":
            if usuario.rol != "administrador":
                print("Solo administradores pueden entrar aquí")
            else:
                main_menu.menu_menu(usuario)

        elif opcion == "0":
            print("Saliendo del sistema...")
            break

        else:
            print("Opción inválida")


# ===== EJECUCIÓN =====
if __name__ == "__main__":
    menu()