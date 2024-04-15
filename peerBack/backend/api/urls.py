from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.NewProfileCreate.as_view(), name='profile-list'),
    path('profiles/delete/<int:pk>/', views.ProfileDelete.as_view(), name='profile-delete'),
    path('listings/',views.ListingsView.as_view(), name='listings'),
    path('listings/delete/<int:pk>/', views.ListingDelete.as_view(), name='deleteListing'),
]