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
    profile_image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Profile
        fields = ('id', 'first_name', 'last_name', 'description', 'sub_description', 'user_profile', 'profile_image')
        extra_kwargs = {
            'user_profile': {'read_only': True},
            'profile_image': {'required': False, 'allow_null': True}
        }
    
    def validate_profile_image(self, value):
        if value.size > 1024 * 1024 * 30:  # limits the uploaded image size to 2MB
            raise serializers.ValidationError("Image file too large ( > 2mb )")
        return value
        
    def validate_sub_description(self, value):
        # Flatten the list to a single string if multiple values are sent erroneously
        if isinstance(value, list):
            return ' '.join(filter(None, value))  # This joins non-empty items only
        return value

    def validate(self, data):
        # Example validation, replace 'some_field' with an actual field name
        return data

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.description = validated_data.get('description', instance.description)
        instance.sub_description = validated_data.get('sub_description', instance.sub_description)

        if 'profile_image' in validated_data:
            profile_image = validated_data['profile_image']
            if profile_image:  # Check if a new file has been provided
                instance.profile_image.save(profile_image.name, profile_image, save=False)

        instance.save()
        return super().update(instance, validated_data)

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ("id", "user_profile", "Listing_Image", "Listing_Title", "Listing_Cost", "Listing_Descr", "Listing_Ingredients")
        extra_kwargs = {
            "id": {"read_only": True},
        }

    def create(self, validated_data):
        # You can remove any reference to user_profile here
        return super().create(validated_data)