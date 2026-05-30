import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'soundbites_backend.settings')
django.setup()

from api.models import Categoria, Genero, Plato

# Crear categorías
categorias = [
    {'nombre': 'Entrada'},
    {'nombre': 'Plato Principal'},
    {'nombre': 'Postre'},
    {'nombre': 'Bebida'},
]

for cat in categorias:
    Categoria.objects.get_or_create(**cat)

# Crear géneros
generos = [
    {'nombre': 'Pop', 'descripcion': 'Género musical popular'},
    {'nombre': 'Rock', 'descripcion': 'Música de rock'},
    {'nombre': 'Jazz', 'descripcion': 'Música Jazz'},
    {'nombre': 'Clásica', 'descripcion': 'Música Clásica'},
    {'nombre': 'Reggaeton', 'descripcion': 'Reggaeton moderno'},
]

for gen in generos:
    Genero.objects.get_or_create(**gen)

# Crear algunos platos
platos = [
    {'nombre': 'Tabla de Quesos', 'descripcion': 'Surtido de quesos', 'precio': 12.50, 'id_categoria': 1},
    {'nombre': 'Filete Mignon', 'descripcion': 'Carne de res de alta calidad', 'precio': 35.00, 'id_categoria': 2},
    {'nombre': 'Chocolate Caliente', 'descripcion': 'Postre cremoso', 'precio': 8.00, 'id_categoria': 3},
]

for plato in platos:
    Plato.objects.get_or_create(**plato)

print(f'Datos de prueba creados: {Categoria.objects.count()} categorías, {Genero.objects.count()} géneros, {Plato.objects.count()} platos')
