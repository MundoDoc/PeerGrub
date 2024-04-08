from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile

# Create your views here.

class NewProfileCreate(generics.ListCreateAPIView):
    """List all notes or create a new note"""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ProfileDelete(generics.DestroyAPIView):
    """Delete a note"""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]