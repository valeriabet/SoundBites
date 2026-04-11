from plato import Plato
from categoria import Categoria

# USUARIO: Maneja favoritos
class Usuario:
    def __init__(self, id_usuario, nombre):
        self.id = id_usuario
        self.nombre = nombre
        self.__favoritos = [] 

    def agregar_a_favoritos(self, plato):
        if plato not in self.__favoritos:
            self.__favoritos.append(plato)
            return True
        return False

    def eliminar_de_favoritos(self, id_plato):
        plato = next((p for p in self.__favoritos if p.id == id_plato), None)
        if plato:
            self.__favoritos.remove(plato)
            return True
        return False

    def obtener_favoritos(self):
        return self.__favoritos

# CONTROLADOR DEL MENÚ: Gestiona la base de datos temporal
class MenuService:
    def __init__(self):
        self._platos = []
        self._categorias = []

    def agregar_categoria(self, categoria):
        self._categorias.append(categoria)

    def crear_plato(self, plato):
        self._platos.append(plato)

    def buscar_plato_por_id(self, id_plato):
        return next((p for p in self._platos if p.id == id_plato), None)

    def listar_todo_el_menu(self):
        print("\n" + "="*30)
        print("   MENÚ DIGITAL SOUNDBITES")
        print("="*30)
        for cat in self._categorias:
            print(f"\n--- {cat.nombre.upper()} ---")
            platos_en_cat = [p for p in self._platos if p.id_categoria == cat.id]
            for p in platos_en_cat:
                print(f"  {p}")