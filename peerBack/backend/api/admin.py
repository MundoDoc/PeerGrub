from django.contrib import admin
from .models import Profile, Listing, Rating, ListingRatingStats

admin.site.register(Profile)
admin.site.register(Listing)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('profile_user','listing','rate_choices')
    search_fields = ('listing__Listing_Title',) 

@admin.register(ListingRatingStats)
class ListingRatingStats(admin.ModelAdmin):
    list_display = ('listing', 'rating_count', 'rating_average')
    readonly_fields = ('listing', 'rating_count', 'rating_average')