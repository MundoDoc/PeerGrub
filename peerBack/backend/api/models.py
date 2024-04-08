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