from modelos.voto import Voto

class SistemaVotacion:
    def __init__(self):
        self.votos = []
        self.generos = ["Rock", "Pop", "Jazz", "Electrónica"]

    def votar(self, usuario, genero):
        for v in self.votos:
            if v.usuario == usuario:
                return "El usuario ya votó"

        self.votos.append(Voto(usuario, genero))
        return "Voto registrado"

    def ver_resultados(self):
        conteo = {}

        for v in self.votos:
            conteo[v.genero] = conteo.get(v.genero, 0) + 1

        return conteo