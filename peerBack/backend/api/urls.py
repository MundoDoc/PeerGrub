from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('listings/', views.ListingsView.as_view(), name='listings'),
    path("media/profile_image/", views.ImageView.as_view(), name="profile_image"),
    path('set-csrf-cookie/', views.set_csrf_token, name='set-csrf-cookie'),
    path('upload_profile_image/', views.upload_profile_image, name='upload_image'),
]
