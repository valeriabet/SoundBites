from usuarios.usuario import Usuario
from .sistema_menu import SistemaMenu

sistema_menu = SistemaMenu()
usuario = None

def menu_menu(usuario):
    while True:
        print("\n Menú restaurante")
        print("1. Gestión de platos")
        print("2. Gestión de categorías")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            menu_platos(usuario)
            
        elif opcion == "2":
            menu_categorias()
            
        elif opcion == "0":
            break
        else:
            
            print("Opción inválida")


#Submenú platos
def menu_platos(usuario):
    while True:
        print("\n Menú platos")
        print("1. Crear plato")
        print("2. Listar platos")
        print("3. Buscar plato")
        print("4. Eliminar plato")
        print("5. Agregar a favoritos")
        print("6. Ver favoritos")
        print("7. Eliminar favorito")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            try:
                nombre = input("Nombre: ")
                descripcion = input("Descripción: ")
                precio = float(input("Precio: "))
                print("\nCategorías disponibles:")
                if not (sistema_menu.listar_categorias()):
                    print("No hay categorías. Cree una primero.")
                    continue
                else:
                    print(sistema_menu.listar_categorias())
                    id_categoria = int(input("Seleccione ID de categoría: "))   

                if sistema_menu.crear_plato(nombre, descripcion, precio, id_categoria):
                    print("Plato creado correctamente")
            except ValueError:
                print("Datos inválidos")

        elif opcion == "2":
            print("\n Lista de platos")
            platos = sistema_menu.listar_platos()
            print(platos if platos else "No hay platos registrados")

        elif opcion == "3":
            try:
                id_plato = int(input("ID del plato: "))
                plato = sistema_menu.buscar_plato(id_plato)
                if plato:
                    print(plato)
                else:
                    print("No encontrado")
            except ValueError:
                print("ID inválido")

        elif opcion == "4":
            try:
                id_plato = int(input("ID del plato a eliminar: "))
                print(sistema_menu.eliminar_plato(id_plato))
            except ValueError:
                print("ID inválido")
        
        elif opcion == "5":
            try:
                id_plato = int(input("ID del plato: "))
                plato = sistema_menu.buscar_plato(id_plato)

                if plato:
                    if usuario.agregar_favorito(plato):
                        print("Agregado a favoritos")
                    else:
                        print("Ya está en favoritos")
                else:
                    print("Plato no encontrado")
            except ValueError:
                print("ID inválido")
                
        elif opcion == "6":
            if usuario:
                    favoritos = usuario.obtener_favoritos()
                    if favoritos:
                        for f in favoritos:
                            print(f)
                    else:
                        print("No tienes favoritos")
            else:
                print("Debes iniciar sesión")
                        
        elif opcion == "7":
            try:
                id_plato = int(input("ID del plato a eliminar: "))
                if usuario.eliminar_favorito(id_plato):
                    print("Eliminado de favoritos")
                else:
                    print("No estaba en favoritos")
            except ValueError:
                print("ID inválido")

        elif opcion == "0":
            break
        else:
            print("Opción inválida")


#Submenú categorias
def menu_categorias():
    while True:
        print("\n MEnú categorias")
        print("1. Crear categoría")
        print("2. Listar categorías")
        print("0. Volver")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            try:
                nombre = input("Nombre: ")

                if sistema_menu.agregar_categoria(nombre):
                    print("Categoría creada")
                else:
                    print("Ya existe esa categoría")
            except ValueError:
                print("Datos inválidos")

        elif opcion == "2":
            print("\n Lista de categorias")
            if sistema_menu.categorias:
                for c in sistema_menu.categorias:
                    print(c)
            else:
                print("No hay categorías")

        elif opcion == "0":
            break
        else:
            print("Opción inválida")
