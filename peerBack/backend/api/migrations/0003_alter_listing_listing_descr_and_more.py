# Generated by Django 5.0.3 on 2024-04-16 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_listing_profile_delete_note"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="Listing_Descr",
            field=models.TextField(
                default="Come try our delicious food!", max_length=200
            ),
        ),
        migrations.AlterField(
            model_name="listing",
            name="Listing_Image",
            field=models.ImageField(null=True, upload_to=""),
        ),
        migrations.AlterField(
            model_name="profile",
            name="description",
            field=models.TextField(default="Welcome to my Profile!"),
        ),
        migrations.AlterField(
            model_name="profile",
            name="sub_description",
            field=models.TextField(default="Happy to be here!"),
        ),
    ]
