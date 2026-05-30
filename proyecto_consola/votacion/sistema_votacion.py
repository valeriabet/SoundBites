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
        if not usuario:
            return "Debe iniciar sesión para votar"

        nuevo_voto = Voto(usuario, genero)

        if not nuevo_voto.validar_voto_semanal(self.votos):
            return "El usuario ya votó esta semana"

        nuevo_voto.procesar_voto()

        self.votos.append(nuevo_voto)
        return f"Voto registrado para {genero.nombre}"

    def listar_generos(self):
        return "\n".join([g.mostrar() for g in self.generos])
    
    def ver_resultados(self):
        generos_ordenados = sorted(self.generos, key=lambda g: g.votos, reverse=True)

        return "\n".join(
            [f"{g.nombre}: {g.votos} votos" for g in generos_ordenados]
        )