from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(max_length=225, default = '')
    contraseña = models.CharField(max_length=225, default='')
    rol = models.CharField(max_length=50, default = '')

    def __str__(self):
        return self.nombre

# Create your models here.
