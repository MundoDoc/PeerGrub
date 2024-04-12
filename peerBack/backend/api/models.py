from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    description = models.TextField()
    sub_description = models.TextField()
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profiles')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return self.first_name +'' + self.last_name
    
class Listing(models.Model):
    Listing_Title = models.CharField(max_length=40)
    Listing_Image = models.ImageField()
    Listing_Cost = models.FloatField()
    Listing_Calories = models.CharField(max_length=10,null=True)
    Listing_Descr = models.TextField(max_length=200,null=True)
    Listing_Ingredients = models.TextField(max_length=200,null=True)
    DIARY = "D"
    EGGS = "E"
    GLUTEN = "G"
    NUTS = "N"
    SOY = "S"
    OTHER = "OTH"
    NONE = "NO"

    ALLERGEN_CHOICES = [
     (DIARY, "Dairy"),
     (EGGS, "Eggs"), 
     (GLUTEN, "Gluten"),
     (NUTS, "Nuts"),
     (SOY,"Soy"),
     (OTHER,"Other"),
     (NONE,"None")
    ]
    allergen_choices = models.CharField(max_length=6,choices=ALLERGEN_CHOICES,default=NONE)

    class Meta:
        verbose_name = "Listing Creation"

    def __str__(self):
        return self.Listing_Title