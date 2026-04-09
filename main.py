    from servicios.sistema_usuarios import SistemaUsuarios

# ===== INSTANCIA =====
sistema_usuarios = SistemaUsuarios()

# ===== FUNCIONES USUARIOS =====




# ===== SUBMENÚ USUARIOS =====




# ===== SUBMENÚ PLATOS (BASE) =====

def menu_platos():
    while True:
        print("\n--- MENÚ PLATOS ---")
        print("1. Crear plato")
        print("2. Listar platos")
        print("3. Buscar plato")
        print("4. Eliminar plato")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "0":
            break
        else:
            print("Módulo en construcción")


# ===== SUBMENÚ CATEGORÍAS (BASE) =====

def menu_categorias():
    while True:
        print("\n--- MENÚ CATEGORÍAS ---")
        print("1. Crear categoría")
        print("2. Listar categorías")
        print("3. Buscar categoría")
        print("4. Eliminar categoría")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "0":
            break
        else:
            print("Módulo en construcción")


# ===== MENÚ PRINCIPAL =====

def menu():
    while True:
        print("\n===== SISTEMA RESTAURANTE =====")
        print("1. Gestión de usuarios")
        print("2. Gestión de platos")
        print("3. Gestión de categorías")
        print("0. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            menu_usuarios()
        elif opcion == "2":
            menu_platos()
        elif opcion == "3":
            menu_categorias()
        elif opcion == "0":
            print("Saliendo del sistema...")
            break
        else:
            print("Opción inválida")


# ===== EJECUCIÓN =====

if __name__ == "__main__":
    menu()