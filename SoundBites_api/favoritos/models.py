from django.db import models

class Favorito(models.Model):
    id_usuario = models.IntegerField()
    id_plato   = models.IntegerField()

    def __str__(self):
        return f"Usuario {self.id_usuario} - Plato {self.id_plato}"