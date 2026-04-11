from plato import EntidadBase

class Categoria(EntidadBase):
    def __init__(self, id_cat, nombre):
        super().__init__(id_cat, nombre)