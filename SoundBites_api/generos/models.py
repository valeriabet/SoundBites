from django.db import models

class Genero(models.Model):
    nombre      = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    votos       = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre