from .sistema_usuarios import SistemaUsuarios

sistema_usuarios = None
usuario_actual = None

def menu_usuarios():
    global sistema_usuarios
    global usuario_actual
    
    while True: #Menu de opciones para el usuario
        print("\n Usuarios")
        print("1. Registrar Usuario")
        print("2. Listar Usuarios")
        print("3. Eliminar Usuario")
        print("4. Iniciar Sesión")
        print("5. Buscar usuario por correo")
        print("6. Buscar usuario por ID")
        print("7. Ver usuario actual")
        print("8. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            nombre = input("Nombre: ")
            correo = input("Correo: ")
            contraseña = input("Contraseña: ")
            rol = input("Rol (cliente/administrador): ")
            resultado = sistema_usuarios.registro(nombre, correo, contraseña, rol)
            print(resultado)

        elif opcion == "2":
            resultado = sistema_usuarios.listar_usuarios()
            print(resultado)

        elif opcion == "3":
            try:
                id_usuario = int(input("ID del usuario a eliminar: "))
            except ValueError:
                print("Ingrese un número válido")
                continue
            resultado = sistema_usuarios.eliminar_usuario(id_usuario)
            print(resultado)

        elif opcion == "4":
            correo = input("Correo: ")
            contraseña = input("Contraseña: ")
            usuario = sistema_usuarios.inicio_sesion(correo, contraseña)
            
            if usuario:
                usuario_actual = usuario
                print(f"Bienvenido {usuario.nombre} ({usuario.rol})")
            else:
                print("Error, correo o contraseña incorrectos")
            
        elif opcion == "5":
            correo = input("Correo: ")
            resultado = sistema_usuarios.buscar_correo(correo)
            if resultado:
                print(resultado.mostrar_datos())
            else:
                print("No se encontró un usuario con ese correo.")
                
        elif opcion == "6":
            id_usuario = int(input("ID del usuario: "))
            resultado = sistema_usuarios.buscar_id(id_usuario)
            if resultado:
                print(resultado.mostrar_datos())
            else:
                print("No se encontró un usuario con ese ID.")
                
        elif opcion == "7":
            if usuario_actual:
                print(usuario_actual.mostrar_datos())
            else:
                print("No hay sesión activa")

        elif opcion == "8":
            print("Saliendo de la app")
            break

        else:
            print("Opción no válida, por favor intente nuevamente.")