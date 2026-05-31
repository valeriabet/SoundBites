import bcrypt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Categoria, Plato, Genero, Usuario, Favorito, Reserva, Voto
from .serializers import (
    CategoriaSerializer, PlatoSerializer, GeneroSerializer,
    UsuarioSerializer, UsuarioRegistroSerializer,
    FavoritoSerializer, ReservaSerializer, VotoSerializer,
    LoginSerializer
)


def get_tokens_for_user(usuario):
    refresh = RefreshToken()
    refresh['id_usuario'] = usuario.id_usuario
    refresh['correo'] = usuario.correo
    refresh['rol'] = usuario.rol
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# ── AUTH
@api_view(['POST'])
@permission_classes([AllowAny])
def registro(request):
    serializer = UsuarioRegistroSerializer(data=request.data)
    if serializer.is_valid():
        datos = serializer.validated_data
        password_hash = bcrypt.hashpw(
            datos['contrasena'].encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')
        usuario = Usuario.objects.create(
            nombre=datos['nombre'],
            correo=datos['correo'],
            contrasena=password_hash,
            rol=datos.get('rol', 'usuario')
        )
        return Response({
            'usuario': UsuarioSerializer(usuario).data,
            'tokens': get_tokens_for_user(usuario)
        }, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    correo = serializer.validated_data['correo']
    contrasena = serializer.validated_data['contrasena']
    try:
        usuario = Usuario.objects.get(correo=correo)
    except Usuario.DoesNotExist:
        return Response(
            {'error': 'Correo o contraseña incorrectos'},
            status=401
        )
    if not bcrypt.checkpw(
        contrasena.encode('utf-8'),
        usuario.contrasena.encode('utf-8')
    ):
        return Response(
            {'error': 'Correo o contraseña incorrectos'},
            status=401
        )
    return Response({
        'usuario': UsuarioSerializer(usuario).data,
        'tokens': get_tokens_for_user(usuario)
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_usuario(request):
    try:
        id_usuario = request.auth.get('id_usuario')
        usuario = Usuario.objects.get(pk=id_usuario)
        return Response(UsuarioSerializer(usuario).data)
    except (Usuario.DoesNotExist, AttributeError):
        return Response({'error': 'Usuario no encontrado'}, status=404)


# ── USUARIOS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_usuarios(request):
    return Response(
        UsuarioSerializer(Usuario.objects.all(), many=True).data
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def buscar_usuario(request, id):
    try:
        return Response(
            UsuarioSerializer(Usuario.objects.get(pk=id)).data
        )
    except Usuario.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_usuario(request, id):
    try:
        usuario = Usuario.objects.get(pk=id)
    except Usuario.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
    datos = request.data
    usuario.nombre = datos.get('nombre', usuario.nombre)
    usuario.correo = datos.get('correo', usuario.correo)
    usuario.rol = datos.get('rol', usuario.rol)
    if datos.get('contrasena'):
        usuario.contrasena = bcrypt.hashpw(
            datos['contrasena'].encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
    usuario.save()
    return Response(UsuarioSerializer(usuario).data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_usuario(request, id):
    try:
        Usuario.objects.get(pk=id).delete()
        return Response(status=204)
    except Usuario.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── CATEGORÍAS 
@api_view(['GET'])
@permission_classes([AllowAny])
def listar_categorias(request):
    return Response(
        CategoriaSerializer(Categoria.objects.all(), many=True).data
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def buscar_categoria(request, id):
    try:
        return Response(
            CategoriaSerializer(Categoria.objects.get(pk=id)).data
        )
    except Categoria.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_categoria(request):
    s = CategoriaSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_categoria(request, id):
    try:
        cat = Categoria.objects.get(pk=id)
    except Categoria.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
    s = CategoriaSerializer(cat, data=request.data, partial=True)
    if s.is_valid():
        s.save()
        return Response(s.data)
    return Response(s.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_categoria(request, id):
    try:
        Categoria.objects.get(pk=id).delete()
        return Response(status=204)
    except Categoria.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── PLATOS 
@api_view(['GET'])
@permission_classes([AllowAny])
def listar_platos(request):
    platos = Plato.objects.select_related('id_categoria').all()
    return Response(PlatoSerializer(platos, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def buscar_plato(request, id):
    try:
        plato = Plato.objects.select_related('id_categoria').get(pk=id)
        return Response(PlatoSerializer(plato).data)
    except Plato.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_plato(request):
    s = PlatoSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_plato(request, id):
    try:
        plato = Plato.objects.get(pk=id)
    except Plato.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
    s = PlatoSerializer(plato, data=request.data, partial=True)
    if s.is_valid():
        s.save()
        return Response(s.data)
    return Response(s.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_plato(request, id):
    try:
        Plato.objects.get(pk=id).delete()
        return Response(status=204)
    except Plato.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── GÉNEROS
@api_view(['GET'])
@permission_classes([AllowAny])
def listar_generos(request):
    generos = Genero.objects.prefetch_related('votos').all()
    return Response(GeneroSerializer(generos, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def buscar_genero(request, id):
    try:
        return Response(
            GeneroSerializer(Genero.objects.get(pk=id)).data
        )
    except Genero.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_genero(request):
    s = GeneroSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_genero(request, id):
    try:
        genero = Genero.objects.get(pk=id)
    except Genero.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
    s = GeneroSerializer(genero, data=request.data, partial=True)
    if s.is_valid():
        s.save()
        return Response(s.data)
    return Response(s.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_genero(request, id):
    try:
        Genero.objects.get(pk=id).delete()
        return Response(status=204)
    except Genero.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── FAVORITOS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_favoritos(request):
    favoritos = Favorito.objects.select_related('id_usuario', 'id_plato__id_categoria').all()
    return Response(FavoritoSerializer(favoritos, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favoritos_usuario(request, id_usuario):
    favoritos = Favorito.objects.select_related('id_usuario', 'id_plato__id_categoria').filter(id_usuario=id_usuario)
    return Response(FavoritoSerializer(favoritos, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def buscar_favorito(request, id):
    try:
        favorito = Favorito.objects.select_related('id_usuario', 'id_plato__id_categoria').get(pk=id)
        return Response(FavoritoSerializer(favorito).data)
    except Favorito.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_favorito(request):
    s = FavoritoSerializer(data=request.data)
    if s.is_valid():
        if Favorito.objects.filter(
            id_usuario=request.data.get('id_usuario'),
            id_plato=request.data.get('id_plato')
        ).exists():
            return Response(
                {'error': 'Este favorito ya existe'},
                status=400
            )
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def es_favorito(request, id_usuario, id_plato):
    existe = Favorito.objects.filter(
        id_usuario=id_usuario,
        id_plato=id_plato
    ).exists()
    return Response({'es_favorito': existe})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_favorito(request, id):
    try:
        Favorito.objects.get(pk=id).delete()
        return Response(status=204)
    except Favorito.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_favorito_usuario_plato(request, id_usuario, id_plato):
    try:
        fav = Favorito.objects.get(id_usuario=id_usuario, id_plato=id_plato)
        fav.delete()
        return Response(status=204)
    except Favorito.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── RESERVAS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_reservas(request):
    reservas = Reserva.objects.select_related('id_usuario', 'id_genero').all()
    return Response(ReservaSerializer(reservas, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reservas_usuario(request, id_usuario):
    reservas = Reserva.objects.select_related('id_usuario', 'id_genero').filter(id_usuario=id_usuario)
    return Response(ReservaSerializer(reservas, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def buscar_reserva(request, id):
    try:
        reserva = Reserva.objects.select_related('id_usuario', 'id_genero').get(pk=id)
        return Response(ReservaSerializer(reserva).data)
    except Reserva.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_reserva(request):
    s = ReservaSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_reserva(request, id):
    try:
        reserva = Reserva.objects.get(pk=id)
    except Reserva.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
    s = ReservaSerializer(reserva, data=request.data, partial=True)
    if s.is_valid():
        s.save()
        return Response(s.data)
    return Response(s.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_reserva(request, id):
    try:
        Reserva.objects.get(pk=id).delete()
        return Response(status=204)
    except Reserva.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


# ── VOTOS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_votos(request):
    votos = Voto.objects.select_related('id_usuario', 'id_genero').all()
    return Response(VotoSerializer(votos, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def votos_usuario(request, id_usuario):
    votos = Voto.objects.select_related('id_usuario', 'id_genero').filter(id_usuario=id_usuario)
    return Response(VotoSerializer(votos, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def votos_genero(request, id_genero):
    votos = Voto.objects.select_related('id_usuario', 'id_genero').filter(id_genero=id_genero)
    return Response(VotoSerializer(votos, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def buscar_voto(request, id):
    try:
        voto = Voto.objects.select_related('id_usuario', 'id_genero').get(pk=id)
        return Response(VotoSerializer(voto).data)
    except Voto.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_voto(request):
    id_usuario = request.data.get('id_usuario')
    id_genero = request.data.get('id_genero')

    if Voto.objects.filter(id_usuario=id_usuario, id_genero=id_genero).exists():
        return Response(
            {'error': 'Ya has votado por este género'},
            status=400
        )

    s = VotoSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_voto(request, id):
    try:
        Voto.objects.get(pk=id).delete()
        return Response(status=204)
    except Voto.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_voto_usuario_genero(request, id_usuario, id_genero):
    try:
        voto = Voto.objects.get(id_usuario=id_usuario, id_genero=id_genero)
        voto.delete()
        return Response(status=204)
    except Voto.DoesNotExist:
        return Response({'error': 'No encontrado'}, status=404)
