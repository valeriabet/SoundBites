from .plato import Plato
from .categoria import Categoria

class SistemaMenu:
    def __init__(self):
        self.platos = []
        self.categorias = []
        
    def crear_plato(self, nombre, descripcion, precio, id_categoria):
        categoria = next((c for c in self.categorias if c.id == id_categoria), None)
        if not categoria:
            return False
        plato = Plato(nombre, descripcion, precio, id_categoria)
        self.platos.append(plato)
        return True
    
    def agregar_categoria(self, nombre):
            categoria = Categoria(nombre)
            self.categorias.append(categoria)
            return True
        
    def listar_categorias(self):
        return "\n".join([str(c) for c in self.categorias])
    
    def listar_platos(self):
        return "\n".join([str(p) for p in self.platos])
    
    def buscar_plato(self, id_plato):
        for p in self.platos:
            if p.id == id_plato:
                return p
        return None
    
    def eliminar_plato(self, id_plato):
        plato = self.buscar_plato(id_plato)
        if plato:
            self.platos.remove(plato)
            return "Eliminado"
        return "No encontrado"