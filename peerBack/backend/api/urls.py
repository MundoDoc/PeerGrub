from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, ListingsView, set_csrf_token, upload_profile_image

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'listing', ListingsView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('set-csrf-cookie/', set_csrf_token, name='set-csrf-cookie'),
    path('upload_profile_image/', upload_profile_image, name='upload_image'),
]
