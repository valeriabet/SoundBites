from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()   # consulta base
    serializer_class = UsuarioSerializer

# Create your views here.
