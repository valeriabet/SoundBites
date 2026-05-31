from django.db import models
# Se define el modelo para las reservas
class Reserva(models.Model): 
    id_usuario       = models.IntegerField() 
    fecha            = models.DateField()
    numero_personas  = models.IntegerField()
    id_genero        = models.IntegerField()

    def __str__(self):
        return f"Reserva {self.id} - Usuario {self.id_usuario}" # Se define el método para mostrar las reservas
