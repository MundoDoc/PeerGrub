from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, ProfileSerializer, ListingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, Listing
from django.http import HttpResponse, JsonResponse    ## added
from django.views.generic.edit import CreateView ## added
from .forms import ListingForm, ProfileForm ## added
from django.views.generic import TemplateView, ListView ## added
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from rest_framework.exceptions import ValidationError
from django.core.files.base import ContentFile


# Create your views here.

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

    def perform_update(self, serializer):
        try:
            # Attempt to save using the serializer's save method
            serializer.save()
        except Exception as e:
            print("Error during file handling or other serializer operations:", e)
            raise


    def partial_update(self, request, *args, **kwargs):
        print("Received PATCH data:", request.data)  # Log data
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class ImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('profile_image')
        
        if not file:
            return Response({"error": "Missing file"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Directly use the user_profile linked to the logged-in user
            profile = Profile.objects.get(user_profile=request.user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        # Save file to profile
        profile.profile_image.save(file.name, file, save=True)
        
        # Update the profile data if there's anything else to update
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Delete the previously saved file if the other data is invalid
            profile.profile_image.delete(save=True)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        # Optional: Method to retrieve the image or profile details
        pass

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

def my_view(request):
    print("Headers:", request.headers)
    print(request.FILES)  # Print uploaded files
    print(request.POST)   # Print form data
    response = HttpResponse("Response")
    return response

def set_csrf_token(request):
    get_token(request)  # Ensures the CSRF token is set in the cookie
    return JsonResponse({'detail': 'CSRF cookie set'})

def upload_profile_image(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user  # Assuming you want to link this upload to the logged-in user
            profile.save()
            return JsonResponse({'message': 'Image uploaded successfully!'}, status=201)
        else:
            return JsonResponse(form.errors, status=400)
    else:
        form = ProfileForm()
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

def handle_uploaded_file(f):
    with open('/path/to/save/file/name.jpg', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)