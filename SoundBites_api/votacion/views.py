from django.shortcuts import render
from rest_framework import viewsets
from .models import Voto
from .serializers import VotoSerializer

class VotosViewSet(viewsets.ModelViewSet):
    queryset = Voto.objects.all()   # consulta base
    serializer_class = VotoSerializer

# Create your views here.
