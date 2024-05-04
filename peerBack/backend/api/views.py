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
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


# Create your views here.

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # This ensures that only the profile related to the logged-in user is returned
        return Profile.objects.filter(user_profile=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        # Retrieves the profile of the logged-in user
        instance = get_object_or_404(Profile, user_profile=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # Ensures that the profile is linked to the logged-in user when creating a new profile
        serializer.save(user_profile=self.request.user)

    def perform_update(self, serializer):
        # Generic method to handle updates, might be used to handle specific logic if necessary
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        # Retrieve the profile based on the ID provided in the URL
        profile_id = self.kwargs.get('pk')
        try:
            return Profile.objects.get(pk=profile_id)
        except Profile.DoesNotExist:
            raise Http404

    
class UserProfileAPIView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(user_profile=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        profile = Profile.objects.get(user_profile=request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

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
    """Create a new user in the system."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ListingsView(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [AllowAny]  # Allow anyone to view listings

    def get_queryset(self):
        return Listing.objects.all() 


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, and OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if the requesting user is the owner of the listing.
        return obj.user_profile == request.user
    

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of an object to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to anyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the listing
        return obj.user_profile == request.user

class CreateListing(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAuthorOrReadOnly()]
        return super().get_permissions()
    
    def get_queryset(self):
        """
        Optionally restricts the returned listings to a given user,
        by filtering against a `user_id` query parameter in the URL.
        """
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:  # Corrected from `not null` to `not None`
            return Listing.objects.filter(user_profile=user_id)
        return super().get_queryset()



class ListingDelete(generics.DestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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