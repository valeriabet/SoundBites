from django.urls import path
from . import views

urlpatterns = [
    # Generos
    path('generos/',            views.lista_generos,   name='lista-generos'),
    path('generos/<int:pk>/',   views.delete_genero,  name='delete_genero'),

    # Favoritos
    path('favoritos/',          views.lista_favoritos,  name='lista-favoritos'),
    path('favoritos/<int:pk>/', views.delete_favorito, name='delete_favorito'),
]