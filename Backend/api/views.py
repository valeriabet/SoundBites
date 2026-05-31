from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Genero, Favorito
from .serializers import GeneroSerializer, FavoritoSerializer

##Samuel Sierra Rocha

# ── GENEROS ───────────────────────────────────────────────
@api_view(['GET', 'POST'])
def lista_generos(request):
    if request.method == 'GET':
        generos    = Genero.objects.all()
        serializer = GeneroSerializer(generos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = GeneroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def delete_genero(request, pk):
    try:
        genero = Genero.objects.get(pk=pk)
    except Genero.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GeneroSerializer(genero)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = GeneroSerializer(genero, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        genero.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ── FAVORITOS ─────────────────────────────────────────────
@api_view(['GET', 'POST'])
def lista_favoritos(request):
    if request.method == 'GET':
        favoritos  = Favorito.objects.all()
        serializer = FavoritoSerializer(favoritos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = FavoritoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def delete_favorito(request, pk):
    try:
        favorito = Favorito.objects.get(pk=pk)
    except Favorito.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FavoritoSerializer(favorito)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = FavoritoSerializer(favorito, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        favorito.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)