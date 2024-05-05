# Generated by Django 5.0.3 on 2024-05-05 20:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0027_alter_listing_listing_cost"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="Listing_Author",
            field=models.ForeignKey(
                default=10,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="listing_author",
                to="api.profile",
            ),
        ),
    ]