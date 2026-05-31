from rest_framework.routers import DefaultRouter
from .views import VotosViewSet

router = DefaultRouter()
router.register('votos', VotosViewSet)

urlpatterns = router.urls
