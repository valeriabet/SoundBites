from rest_framework import serializers
from .models import Reserva

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Reserva # Se define el modelo para las reservas
        fields = '__all__' # Se define el serializer para las reservas