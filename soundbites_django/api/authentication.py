from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import Usuario


class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            id_usuario = validated_token['id_usuario']
            return Usuario.objects.get(id_usuario=id_usuario)
        except (KeyError, Usuario.DoesNotExist):
            raise InvalidToken('Token inválido')
