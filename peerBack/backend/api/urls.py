from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.NewProfileCreate.as_view(), name='profile-list'),
    path('profiles/delete/<int:pk>/', views.ProfileDelete.as_view(), name='profile-delete'),
]