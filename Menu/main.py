from plato import Plato
from categoria import Categoria
from sistema_menu import Usuario, MenuService

def ejecutar_app():
    service = MenuService()
    usuario_actual = Usuario(1, "Cliente")

    # Carga inicial de datos
    service.agregar_categoria(Categoria(1, "Entradas"))
    service.agregar_categoria(Categoria(2, "Platos Fuertes"))
    service.agregar_categoria(Categoria(3, "Postres"))

    service.crear_plato(Plato(101, "Empanadas", "3 de carne", 4500, 1))
    service.crear_plato(Plato(201, "Lasaña", "Pasta artesanal", 20000, 2))
    service.crear_plato(Plato(301, "Brownie", "Con helado", 15000, 3))

    while True:
        print(f"\nHola, {usuario_actual.nombre}")
        print("1. Ver Menú | 2. Ver Favoritos | 3. Añadir Favorito | 4. Quitar Favorito | 5. Salir")
        
        opcion = input("\nSeleccione: ")

        if opcion == "1":
            service.listar_todo_el_menu()
        elif opcion == "2":
            favs = usuario_actual.obtener_favoritos()
            print("\n MIS FAVORITOS:", [f.nombre for f in favs] if favs else "Vacío")
        elif opcion == "3":
            try:
                id_p = int(input("ID del plato: "))
                plato = service.buscar_plato_por_id(id_p)
                if plato and usuario_actual.agregar_a_favoritos(plato):
                    print("Guardado.")
            except: print("Error de ID.")
        elif opcion == "4":
            try:
                id_p = int(input("ID a quitar: "))
                if usuario_actual.eliminar_de_favoritos(id_p):
                    print("Eliminado.")
            except: print("Error.")
        elif opcion == "5":
            break

if __name__ == "__main__":
    ejecutar_app()