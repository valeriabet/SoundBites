class Categoria():
    contador_id = 1
    
    def __init__(self, nombre):
        self.id = Categoria.contador_id
        Categoria.contador_id += 1
        self.nombre = nombre
        
    def __str__(self):
        return f"{self.id}. {self.nombre}"