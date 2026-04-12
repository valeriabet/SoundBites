class Plato():
    contador_id = 1
    
    def __init__(self, nombre, descripcion, precio, id_categoria):
        self.id = Plato.contador_id
        Plato.contador_id += 1
        self.nombre = nombre
        self.descripcion = descripcion
        self.id_categoria = id_categoria
        
        if precio > 0:
            self.__precio = precio
        else:
            raise ValueError("El precio debe ser mayor a 0")

    @property
    def precio(self):
        return self.__precio
    
    @precio.setter
    def precio(self, nuevo_precio):
        if nuevo_precio > 0:
            self.__precio = nuevo_precio

    def __str__(self):
        return f"[{self.id}] {self.nombre} - ${self.precio:.2f} ({self.descripcion})"