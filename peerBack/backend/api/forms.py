from django import forms
from .models import Listing, Profile, Rating

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'

    def clean_sub_description(self):
        data = self.cleaned_data['sub_description']
        # Add your validation for sub_description here
        return data

class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = '__all__'

    def clean_Listing_Image(self):
        image = self.cleaned_data.get('Listing_Image', False)
        if image:
            if image.size > 10 * 1024 * 1024:  # 10 MB
                raise forms.ValidationError("Image file too large ( > 10MB )")
            # Add more validation if needed (e.g., file type)
        return image

class RatingForm(forms.ModelForm):
    class Meta:
        model = Rating
        fields = '__all__'
