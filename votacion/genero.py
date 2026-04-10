class Genero:
    contador_id = 1
    
    def __init__(self, nombre, descripcion, votos):
        self.id = Genero.contador_id
        Genero.contador_id += 1
        self.nombre = nombre
        self.descripcion = descripcion
        self.votos = 0
        
    def obtener_votos(self):
        return self.votos