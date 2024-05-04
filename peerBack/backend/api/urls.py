from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, CreateListing, ListingDelete, set_csrf_token, upload_profile_image

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'listing', CreateListing)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/listing/delete/<int:pk>/', ListingDelete.as_view(), name='listing-delete'),
    path('set-csrf-cookie/', set_csrf_token, name='set-csrf-cookie'),
    path('upload_profile_image/', upload_profile_image, name='upload_image'),
]
