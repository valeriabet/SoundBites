from datetime import datetime

class Voto:
    contador_id = 1
    
    def __init__(self, usuario, genero):
        self.id = Voto.contador_id
        Voto.contador_id += 1
        self.usuario = usuario
        self.genero = genero
        self.fecha_hora = datetime.now()
        self.periodo = "semanal"
        
    def validar_voto(self, votos):
        for v in votos:
            if v.usuario.id == self.usuario.id:
                return False
        return True
    
    def procesar_voto(self):
        self.genero.votos += 1