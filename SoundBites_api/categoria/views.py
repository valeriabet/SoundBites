from django.shortcuts import render
from rest_framework import viewsets
from .models import Categoria
from .serializers import CategoriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()   # consulta base
    serializer_class = CategoriaSerializer


# Create your views here.
