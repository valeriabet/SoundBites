from rest_framework import serializers
from .models import Genero, Favorito

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Genero
        fields = '__all__'


class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Favorito
        fields = '__all__'