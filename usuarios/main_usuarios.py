from sistema_usuarios import SistemaUsuarios #Importacion de sistema de usuarios

sistema_usuarios = SistemaUsuarios() #Instancia del sistema de usuarios
usuario_actual = None #Variable para almacenar el usuario actual
while True: #Menu de opciones para el usuario
    print("\n Usuarios")
    print("1. Registrar Usuario")
    print("2. Listar Usuarios")
    print("3. Eliminar Usuario")
    print("4. Iniciar Sesión")
    print("5. Buscar usuario por correo")
    print("6. buscar usuario por ID")
    print("7. Salir")

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
        id_usuario = int(input("ID del usuario a eliminar: "))
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
        print("Saliendo de la app")
        break

    else:
        print("Opción no válida, por favor intente nuevamente.")

        

def obtener_usuario_actual(): #Metodo para obtener el usuario actual
    return usuario_actual #Devuelve el usuario actual