from django.db import models

class Genero(models.Model):
    nombre      = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    votos       = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre


class Favorito(models.Model):
    id_usuario = models.IntegerField()
    id_plato   = models.IntegerField()

    def __str__(self):
        return f"Usuario {self.id_usuario} - Plato {self.id_plato}"