"""
URL configuration for SoundBites_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from generos.views import GeneroViewSet
from favoritos.views import FavoritoViewSet
from usuarios.views import UsuarioViewSet
from reservas.views import ReservaViewSet
# Se crea el router para los endpoints
router = DefaultRouter()
router.register('generos',   GeneroViewSet)
router.register('favoritos', FavoritoViewSet)
router.register('usuarios',  UsuarioViewSet)
router.register('reservas',  ReservaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/', include('generos.urls')),
    path('api/', include('favoritos.urls')),
    path('api/', include('usuarios.urls')),
    path('api/', include('votacion.urls')),
    path('api/', include('categoria.urls')),
    path('api/', include('plato.urls')),
]
=======
    path('api/', include(router.urls)),
]
>>>>>>> 078dd2a3b88ff45057d22228526c3d23831f4fe6
