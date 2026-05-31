from rest_framework import serializers
from .models import Categoria, Plato, Genero, Usuario, Favorito, Reserva, Voto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre']


class PlatoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(source='id_categoria', read_only=True)

    class Meta:
        model = Plato
        fields = ['id_plato', 'nombre', 'descripcion', 'precio', 'id_categoria', 'categoria', 'imagen']


class GeneroSerializer(serializers.ModelSerializer):
    votos_count = serializers.SerializerMethodField()

    class Meta:
        model = Genero
        fields = ['id_genero', 'nombre', 'descripcion', 'votos_count']

    def get_votos_count(self, obj):
        return obj.votos.count()


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nombre', 'correo', 'rol']


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'contrasena', 'rol']

    def validate_correo(self, value):
        if Usuario.objects.filter(correo=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value


class FavoritoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(source='id_usuario', read_only=True)
    plato = PlatoSerializer(source='id_plato', read_only=True)

    class Meta:
        model = Favorito
        fields = ['id_favorito', 'id_usuario', 'id_plato', 'usuario', 'plato', 'fecha_agregado']


class ReservaSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(source='id_usuario', read_only=True)
    genero = GeneroSerializer(source='id_genero', read_only=True)

    class Meta:
        model = Reserva
        fields = ['id_reserva', 'id_usuario', 'id_genero', 'usuario', 'genero', 'fecha', 'numero_personas', 'estado', 'notas']


class VotoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(source='id_usuario', read_only=True)
    genero = GeneroSerializer(source='id_genero', read_only=True)

    class Meta:
        model = Voto
        fields = ['id_voto', 'id_usuario', 'id_genero', 'usuario', 'genero', 'fecha']


class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()
