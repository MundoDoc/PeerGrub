from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager 
# pip install django-taggit in terminal to install TaggableManager
# if there is a package error and add "taggit" in INSTALLED_APPS at settings.py
from django.forms import ValidationError
from django.urls import reverse
from django.utils.text import slugify
from django.db.models import Avg

class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    description = models.TextField(default="Welcome to my Profile!")
    sub_description = models.TextField(default="Happy to be here!")
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return self.first_name +'' + self.last_name
    
    
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.text import slugify

class Listing(models.Model):
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listing', default=10)
    Listing_Title = models.CharField(max_length=40)
    Listing_Image = models.ImageField(upload_to='Listing_Image/', blank=True, null=True)
    Listing_Cost = models.DecimalField(decimal_places=2,max_digits=4)
    Listing_Descr = models.TextField(max_length=200, default="Come try our delicious food!")
    Listing_Ingredients = models.TextField(max_length=200, null=True)
    Listing_Author = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Listing Creation"

    def __str__(self):
        return self.Listing_Title
    
    def get_absolute_url(self):
        return reverse('listingDetail', args=[str(self.slug)])
    
    def save(self, *args, **kwargs):
        super(Listing, self).save(*args, **kwargs)

        # Create ListingRatingStats if it doesn't exist for a new listing object
        if not hasattr(self, 'listingRatingStats'):
            ListingRatingStats.objects.create(listing=self)


class Rating(models.Model):
    profile_user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_user',default=False)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='listrating',default=False)
    RATING_CHOICES = (
        (1, '★'),
        (2, '★★'),
        (3, '★★★'),
        (4, '★★★★'),
        (5, '★★★★★'),
    )
    rate_choices = models.IntegerField(choices=RATING_CHOICES)
    review = models.TextField(blank=True,null=True)
    
    class Meta:
        verbose_name = "Make Rating"
        # Add unique_together constraint to ensure one rating per profile per listing
        unique_together = ['profile_user', 'listing']

    def __str__(self):
        return self.listing.Listing_Title
    
    def save(self, *args, **kwargs):
        # Check if a rating already exists for the profile and listing
        if Rating.objects.filter(profile_user=self.profile_user, listing=self.listing).exists():
            # Handle duplicate rating (raise an exception or return)
            raise ValidationError("Rating already exists for this profile and listing.")
        
        super(Rating, self).save(*args, **kwargs)
        
        # Update listing rating stats
        if self.listing and self.listing.listingRatingStats:
            self.listing.listingRatingStats.update_rating_stats()

    def delete(self, *args, **kwargs):
        listing_rating_stats = self.listing.listingRatingStats
        super(Rating, self).delete(*args, **kwargs)
        if listing_rating_stats:
            listing_rating_stats.update_rating_stats()

    def get_rating_display(self):
        """Convert numerical rating to its string representation."""
        return '★' * self.rate_choices
    
class ListingRatingStats(models.Model):
    listing = models.OneToOneField(Listing, on_delete=models.CASCADE, related_name='listingRatingStats',default=False)
    rating_count = models.IntegerField(default=0)
    rating_average = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)

    class Meta:
        verbose_name = "Listing Rating Stat"

    def __str__(self):
        return self.listing.Listing_Title
    
    def update_rating_stats(self):
        ratings = self.listing.listrating.all()
        if ratings.exists():
            self.rating_count = ratings.count()
            self.rating_average = ratings.aggregate(Avg('rate_choices'))['rate_choices__avg']
            self.save()
        else:
            self.rating_count = 0
            self.rating_average = 0.0
            self.save()