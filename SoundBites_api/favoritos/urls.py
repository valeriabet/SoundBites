from rest_framework.routers import DefaultRouter
from .views import FavoritoViewSet

router = DefaultRouter()
router.register('favoritos', FavoritoViewSet)

urlpatterns = router.urls