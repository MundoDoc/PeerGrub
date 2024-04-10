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
    
class Item(models.Model):
    itemName = models.CharField(max_length=40)
    itemImage = models.ImageField()
    price = models.FloatField()
    itemDescr = models.TextField(max_length=200,null=True)
    itemIngredients = models.TextField(max_length=200,null=True)
    MILK = "M"
    EGGS = "E"
    FISH = "F"
    TREENUTS = "TN"
    SOYBEANS = "SB"
    PEANUTS = "P"
    WHEAT = "W"
    NONE = "NO"
    
    ALLERGEN_CHOICES = [
     (MILK, "Milk"),
     (EGGS, "Eggs"), 
     (FISH, "Fish"),
     (TREENUTS, "Tree Nuts"),
     (SOYBEANS,"Soybeans"),
     (PEANUTS,"Peanuts"),
     (WHEAT,"Wheat"),
     (NONE,"None"),
    ]
    allergen_choices = models.CharField(max_length=2,choices=ALLERGEN_CHOICES,default=NONE)

    class Meta:
        verbose_name = "Item Creation"