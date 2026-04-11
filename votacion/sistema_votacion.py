from .voto import Voto
from .genero import Genero

class SistemaVotacion:
    def __init__(self):
        self.votos = []
        self.generos = [
            Genero("Rock", "Música energética"),
            Genero("Pop", "Música popular"),
            Genero("Jazz", "Música instrumental"),
            Genero("Electrónica", "Música digital")
        ]

    def votar(self, usuario, id_genero):
    
        genero = next((g for g in self.generos if g.id == id_genero), None)

        if not genero:
            return "Género no válido"

        nuevo_voto = Voto(usuario, genero)

        if not nuevo_voto.validar_voto(self.votos):
            return "El usuario ya votó"

        nuevo_voto.procesar_voto()

        self.votos.append(nuevo_voto)
        return "Voto registrado"

    def ver_resultados(self):
        resultados = {}

        for g in self.generos:
            resultados[g.nombre] = g.obtener_votos()

        return resultados

    def listar_generos(self):
        return self.generos