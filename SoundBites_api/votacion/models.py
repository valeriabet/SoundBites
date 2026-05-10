from django.db import models

from django.db import models
class Voto(models.Model):
    idUsuario = models.IntegerField()
    idGenero = models.IntegerField()
    fecha = models.IntegerField()

    def __str__(self):
        return self.nombre


# Create your models here.
