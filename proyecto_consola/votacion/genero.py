class Genero:
    contador_id = 1
    
    def __init__(self, nombre, descripcion):
        self.id = Genero.contador_id
        Genero.contador_id += 1
        self.nombre = nombre
        self.descripcion = descripcion
        self.votos = 0
        if not nombre:
            raise ValueError("El nombre del género es obligatorio")
        
    def mostrar(self):
        return f"{self.id}. {self.nombre} - {self.votos} votos"
        
    def agregar_voto(self):
        self.votos += 1
        
    def obtener_votos(self):
        return self.votos