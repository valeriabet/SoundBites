from rest_framework.routers import DefaultRouter
from .views import PlatoViewSet

router = DefaultRouter()
router.register('plato', PlatoViewSet)

urlpatterns = router.urls
