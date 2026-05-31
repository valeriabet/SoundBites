from django.db import models
from categoria.models import Categoria

class Plato(models.Model):
    nombre      = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=255)
    precio      = models.DecimalField(max_digits=8, decimal_places=2)
    idCategoria = models.IntegerField()

    def __str__(self):
        return f"[{self.id}] {self.nombre} - ${self.precio:.2f} ({self.descripcion})"

# Create your models here.
