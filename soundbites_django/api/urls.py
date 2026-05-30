from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('auth/registro/', views.registro),
    path('auth/login/', views.login),
    path('auth/perfil/', views.perfil_usuario),
    path('auth/refresh/', TokenRefreshView.as_view()),

    # Usuarios
    path('usuario/listar/', views.listar_usuarios),
    path('usuario/buscar/<int:id>/', views.buscar_usuario),
    path('usuario/actualizar/<int:id>/', views.actualizar_usuario),
    path('usuario/eliminar/<int:id>/', views.eliminar_usuario),

    # Categorías
    path('categoria/listar/', views.listar_categorias),
    path('categoria/buscar/<int:id>/', views.buscar_categoria),
    path('categoria/guardar/', views.guardar_categoria),
    path('categoria/actualizar/<int:id>/', views.actualizar_categoria),
    path('categoria/eliminar/<int:id>/', views.eliminar_categoria),

    # Platos
    path('plato/listar/', views.listar_platos),
    path('plato/buscar/<int:id>/', views.buscar_plato),
    path('plato/guardar/', views.guardar_plato),
    path('plato/actualizar/<int:id>/', views.actualizar_plato),
    path('plato/eliminar/<int:id>/', views.eliminar_plato),

    # Géneros
    path('genero/listar/', views.listar_generos),
    path('genero/buscar/<int:id>/', views.buscar_genero),
    path('genero/guardar/', views.guardar_genero),
    path('genero/actualizar/<int:id>/', views.actualizar_genero),
    path('genero/eliminar/<int:id>/', views.eliminar_genero),

    # Favoritos
    path('favorito/listar/', views.listar_favoritos),
    path('favorito/usuario/<int:id_usuario>/', views.favoritos_usuario),
    path('favorito/buscar/<int:id>/', views.buscar_favorito),
    path('favorito/es-favorito/<int:id_usuario>/<int:id_plato>/', views.es_favorito),
    path('favorito/guardar/', views.guardar_favorito),
    path('favorito/eliminar/<int:id>/', views.eliminar_favorito),
    path('favorito/eliminar/<int:id_usuario>/<int:id_plato>/', views.eliminar_favorito_usuario_plato),

    # Reservas
    path('reserva/listar/', views.listar_reservas),
    path('reserva/usuario/<int:id_usuario>/', views.reservas_usuario),
    path('reserva/buscar/<int:id>/', views.buscar_reserva),
    path('reserva/guardar/', views.guardar_reserva),
    path('reserva/actualizar/<int:id>/', views.actualizar_reserva),
    path('reserva/eliminar/<int:id>/', views.eliminar_reserva),

    # Votos
    path('voto/listar/', views.listar_votos),
    path('voto/usuario/<int:id_usuario>/', views.votos_usuario),
    path('voto/genero/<int:id_genero>/', views.votos_genero),
    path('voto/buscar/<int:id>/', views.buscar_voto),
    path('voto/guardar/', views.guardar_voto),
    path('voto/eliminar/<int:id>/', views.eliminar_voto),
    path('voto/eliminar/<int:id_usuario>/<int:id_genero>/', views.eliminar_voto_usuario_genero),
]