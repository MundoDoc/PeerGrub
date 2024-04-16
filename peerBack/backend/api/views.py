from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProfileSerializer, ListingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, Listing
from django.http import HttpResponse    ## added
from django.views.generic.edit import CreateView ## added
from .forms import ListingForm, ProfileForm ## added
from django.views.generic import TemplateView, ListView ## added


# Create your views here.

class NewProfileCreate(generics.ListCreateAPIView):
    """List all notes or create a new note"""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user_profile=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user_profile=self.request.user)
        else:
            print("Serializer errors: ", serializer.errors)

class ProfileDelete(generics.DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user_profile=user)

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ListingsView(generics.CreateAPIView):
  queryset = Listing.objects.all()
  serializer_class = ListingSerializer
  permission_classes = [AllowAny]
  template_name = "api/listingsPage.html"
  model = Listing

  def get_queryset(self):
    user = self.request.user
    return Profile.objects.filter(user_profile=user)
    
  def perform_create(self, serializer):
    if serializer.is_valid():
        serializer.save(user_profile=self.request.user)
    else:
        print(serializer.errors)

class CreateListing(generics.ListCreateAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]
    model = Listing
    form_class = ListingForm

    def get_queryset(self):
        user = self.request.user
        return Listing.objects.filter(user_profile=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user_profile=self.request.user)
        else:
            print(serializer.errors)

class ListingDelete(generics.DestroyAPIView):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Listing.objects.filter(user_profile=user)