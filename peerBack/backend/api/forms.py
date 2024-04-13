from django import forms
from .models import Listing, Profile

class ProfileForm(forms.ModelForm):
  class Meta:
    model = Profile
    fields = '__all__'  

class ListingForm(forms.ModelForm):
  class Meta:
    model = Listing
    fields = '__all__'
