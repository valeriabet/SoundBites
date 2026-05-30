import os
import random
import django
import bcrypt

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'soundbites_backend.settings'
)

django.setup()

from api.models import Usuario, Plato, Favorito

# USUARIOS

usuarios_nombres = [
    "Valeria", "Juan", "Sara", "Carlos", "Laura",
    "Andres", "Natalia", "Miguel", "Camila", "Daniel",
    "Sofia", "Sebastian", "Juliana", "Felipe", "Mateo",
    "Valentina", "David", "Paula", "Alejandro", "Maria",
    "Nicolas", "Luisa", "Samuel", "Ana", "Gabriel",
    "Isabella", "Martin", "Fernanda", "Kevin", "Diana"
]

print("Creando usuarios...")

for nombre in usuarios_nombres:

    correo = f"{nombre.lower()}@soundbites.com"

    if not Usuario.objects.filter(correo=correo).exists():

        password_hash = bcrypt.hashpw(
            "123456".encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        Usuario.objects.create(
            nombre=nombre,
            correo=correo,
            contrasena=password_hash,
            rol="usuario"
        )

print("Usuarios creados")


# PLATOS

platos = [

    # Entradas
    ("Bruschettas", 1),
    ("Nachos Especiales", 1),
    ("Carpaccio", 1),
    ("Empanadas Artesanales", 1),
    ("Alitas BBQ", 1),
    ("Ceviche", 1),

    # Principales
    ("Hamburguesa BBQ", 2),
    ("Hamburguesa Angus", 2),
    ("Pizza Italiana", 2),
    ("Pizza Hawaiana", 2),
    ("Lasaña", 2),
    ("Salmon Grillado", 2),
    ("Pollo Parmesano", 2),
    ("Risotto", 2),
    ("Pasta Alfredo", 2),
    ("Pasta Carbonara", 2),
    ("Costillas BBQ", 2),
    ("Filete de Res", 2),
    ("Arroz Marinero", 2),
    ("Paella", 2),

    # Postres
    ("Cheesecake", 3),
    ("Brownie", 3),
    ("Tiramisu", 3),
    ("Flan", 3),
    ("Helado Artesanal", 3),
    ("Tres Leches", 3),
    ("Mousse de Chocolate", 3),

    # Bebidas
    ("Limonada Natural", 4),
    ("Jugo de Mango", 4),
    ("Jugo de Mora", 4),
    ("Cafe Especial", 4),
    ("Te Frio", 4),
    ("Chocolate Caliente Premium", 4),
    ("Malteada de Vainilla", 4),
]

print("Creando platos...")

for nombre, categoria in platos:

    Plato.objects.get_or_create(
        nombre=nombre,
        defaults={
            "descripcion": f"{nombre} delicioso",
            "precio": random.randint(10000, 60000),
            "id_categoria": categoria,
            "imagen": ""
        }
    )

print("Platos creados")


# FAVORITOS

print("Creando favoritos...")

usuarios = list(Usuario.objects.all())
todos_platos = list(Plato.objects.all())

for usuario in usuarios:

    cantidad = random.randint(4, 8)

    favoritos = random.sample(
        todos_platos,
        min(cantidad, len(todos_platos))
    )

    for plato in favoritos:

        Favorito.objects.get_or_create(
            id_usuario=usuario.id_usuario,
            id_plato=plato.id_plato
        )

print("Favoritos creados")


print("Proceso terminado")
print(f"Usuarios: {Usuario.objects.count()}")
print(f"Platos: {Plato.objects.count()}")
print(f"Favoritos: {Favorito.objects.count()}")