from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager 
# pip install django-taggit in terminal to install TaggableManager
# if there is a package error and add "taggit" in INSTALLED_APPS at settings.py

# Create your models here.

class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    description = models.TextField(default="Welcome to my Profile!")
    sub_description = models.TextField(default="Happy to be here!")
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return self.first_name +'' + self.last_name
    
class Listing(models.Model):
    Listing_Title = models.CharField(max_length=40)
    Listing_Image = models.ImageField(null=True)
    # For each instance, we display field1, field2, and the associated tags 
    field_1 = models.CharField(max_length=50,default=True)
    field_2 = models.CharField(max_length=50,default=True)
    Listing_Tags = TaggableManager()
    Listing_Cost = models.FloatField()
    Listing_Calories = models.CharField(max_length=10,null=True)
    Listing_Descr = models.TextField(max_length=200, default="Come try our delicious food!")
    Listing_Ingredients = models.TextField(max_length=200,null=True)
    NONE = "None"
    ALLERGEN_CHOICES = [
     ("Dairy", "Dairy"),
     ("Eggs", "Eggs"), 
     ("Gluten", "Gluten"),
     ("Nuts", "Nuts"),
     ("Soy","Soy"),
     ("Other","Other"),
     (NONE,"None")
    ]
    allergen_choices = models.CharField(max_length=6,choices=ALLERGEN_CHOICES,default=NONE)

    class Meta:
        verbose_name = "Listing Creation"

    def __str__(self):
        return self.Listing_Title