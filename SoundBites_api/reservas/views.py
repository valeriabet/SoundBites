from rest_framework import viewsets
from .models import Reserva
from .serializers import ReservaSerializer # Se importa el serializer para las reservas

class ReservaViewSet(viewsets.ModelViewSet):
    queryset         = Reserva.objects.all() # Se define el queryset para las reservas
    serializer_class = ReservaSerializer # Se define el serializer para las reservas