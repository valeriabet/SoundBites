from servicios.sistema_usuarios import SistemaUsuarios

# ===== INSTANCIA =====
sistema_usuarios = SistemaUsuarios()

# ===== FUNCIONES USUARIOS =====

def registrar_usuario():
    nombre = input("Nombre: ")
    correo = input("Correo: ")
    contrasena = input("Contraseña: ")
    rol = input("Rol (cliente/admin): ")
    print(sistema_usuarios.registrar_usuario(nombre, correo, contrasena, rol))


def listar_usuarios():
    print(sistema_usuarios.listar_usuarios())


def buscar_usuario():
    correo = input("Ingrese el correo del usuario: ")
    usuario = sistema_usuarios.buscar_por_correo(correo)
    
    if usuario:
        print(usuario.mostrar_datos())
    else:
        print("Usuario no encontrado.")


def eliminar_usuario():
    try:
        id_usuario = int(input("Ingrese el ID del usuario a eliminar: "))
        print(sistema_usuarios.eliminar_usuario(id_usuario))
    except ValueError:
        print("ID inválido")


def iniciar_sesion():
    correo = input("Correo: ")
    contrasena = input("Contraseña: ")
    usuario = sistema_usuarios.iniciar_sesion(correo, contrasena)

    if usuario:
        print(f"Bienvenido/a, {usuario.nombre} ({usuario.rol})")
    else:
        print("Credenciales incorrectas.")


# ===== SUBMENÚ USUARIOS =====

def menu_usuarios():
    while True:
        print("\n--- MENÚ USUARIOS ---")
        print("1. Registrar usuario")
        print("2. Listar usuarios")
        print("3. Buscar usuario")
        print("4. Eliminar usuario")
        print("5. Iniciar sesión")
        print("6. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            registrar_usuario()
        elif opcion == "2":
            listar_usuarios()
        elif opcion == "3":
            buscar_usuario()
        elif opcion == "4":
            eliminar_usuario()
        elif opcion == "5":
            iniciar_sesion()
        elif opcion == "6":
            print("Volviendo al menú principal...")
            break
        else:
            print("Opción no válida.")