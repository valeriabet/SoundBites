from abc import ABC, abstractmethod

# PLANTILLA BASE: Para no repetir 'id' y 'nombre'
class EntidadBase(ABC):
    def __init__(self, id_entidad, nombre):
        self._id = id_entidad  
        self.nombre = nombre

    @property
    def id(self):
        return self._id

# OBJETO PLATO: Define los datos de cada comida
class Plato(EntidadBase):
    def __init__(self, id_plato, nombre, descripcion, precio, id_categoria):
        super().__init__(id_plato, nombre)
        self.descripcion = descripcion
        self.__precio = precio  # Privado
        self.id_categoria = id_categoria

    @property
    def precio(self):
        return self.__precio

    def __str__(self):
        return f"[{self.id}] {self.nombre} - ${self.precio:.2f} ({self.descripcion})"