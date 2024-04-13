from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Listing

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'first_name', 'last_name', 'description', 'sub_description', 'user_profile')
        extra_kwargs = {'user_profile': {'read_only': True}}

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('Listing_Title','Listing_Tags','Listing_Cost','Listing_Calories','Listing_Descr','Listing_Ingredients','allergen_choices')