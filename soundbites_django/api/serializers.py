from rest_framework import serializers
from .models import Categoria, Plato, Genero, Usuario, Favorito, Reserva, Voto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id_categoria', 'nombre']


class PlatoSerializer(serializers.ModelSerializer):
    categoria = serializers.SerializerMethodField()

    class Meta:
        model = Plato
        fields = ['id_plato', 'nombre', 'descripcion', 'precio', 'id_categoria', 'categoria', 'imagen']

    def get_categoria(self, obj):
        try:
            cat = Categoria.objects.get(pk=obj.id_categoria)
            return CategoriaSerializer(cat).data
        except Categoria.DoesNotExist:
            return None


class GeneroSerializer(serializers.ModelSerializer):
    votos_count = serializers.SerializerMethodField()

    class Meta:
        model = Genero
        fields = ['id_genero', 'nombre', 'descripcion', 'votos_count']

    def get_votos_count(self, obj):
        return Voto.objects.filter(id_genero=obj.id_genero).count()


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
            raise serializers.ValidationError(
                "Este correo ya está registrado."
            )
        return value


class FavoritoSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    plato = serializers.SerializerMethodField()

    class Meta:
        model = Favorito
        fields = ['id_favorito', 'id_usuario', 'id_plato', 'usuario', 'plato', 'fecha_agregado']

    def get_usuario(self, obj):
        try:
            user = Usuario.objects.get(pk=obj.id_usuario)
            return UsuarioSerializer(user).data
        except Usuario.DoesNotExist:
            return None

    def get_plato(self, obj):
        try:
            plato = Plato.objects.get(pk=obj.id_plato)
            return PlatoSerializer(plato).data
        except Plato.DoesNotExist:
            return None


class ReservaSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    genero = serializers.SerializerMethodField()

    class Meta:
        model = Reserva
        fields = ['id_reserva', 'id_usuario', 'id_genero', 'usuario', 'genero', 'fecha', 'numero_personas', 'estado', 'notas']

    def get_usuario(self, obj):
        try:
            user = Usuario.objects.get(pk=obj.id_usuario)
            return UsuarioSerializer(user).data
        except Usuario.DoesNotExist:
            return None

    def get_genero(self, obj):
        try:
            genero = Genero.objects.get(pk=obj.id_genero)
            return GeneroSerializer(genero).data
        except Genero.DoesNotExist:
            return None


class VotoSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    genero = serializers.SerializerMethodField()

    class Meta:
        model = Voto
        fields = ['id_voto', 'id_usuario', 'id_genero', 'usuario', 'genero', 'fecha']

    def get_usuario(self, obj):
        try:
            user = Usuario.objects.get(pk=obj.id_usuario)
            return UsuarioSerializer(user).data
        except Usuario.DoesNotExist:
            return None

    def get_genero(self, obj):
        try:
            genero = Genero.objects.get(pk=obj.id_genero)
            return GeneroSerializer(genero).data
        except Genero.DoesNotExist:
            return None


class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()