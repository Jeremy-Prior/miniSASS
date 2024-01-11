# Generated by Django 4.2.7 on 2024-01-11 09:13

import os
from django.db import migrations, models
import monitor.models


def update_observation_validity(apps, schema_editor):
    Observation = apps.get_model('monitor', 'Observations')
    ObservationPestImage = apps.get_model('monitor', 'ObservationPestImage')
    SiteImage = apps.get_model('monitor', 'SiteImage')

    for observation in Observation.objects.all():
        if observation.user.userprofile.is_expert:
            observation.is_validated = True
            observation.save()

    for image in ObservationPestImage.objects.all():
        if image.observation.user.userprofile.is_expert:
            image.valid = True
        old_path = image.image.name.replace('demo/', 'old_minisass/')
        image.image.name = old_path
        image.save()

    for image in SiteImage.objects.all():
        old_path = image.image.name.replace('demo/', 'old_minisass/')
        image.image.name = old_path
        image.save()


class Migration(migrations.Migration):

    dependencies = [
        ('monitor', '0006_alter_observations_options_alter_sites_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='observationpestimage',
            name='image',
            field=models.ImageField(max_length=250, upload_to=monitor.models.observation_pest_image_path),
        ),
        migrations.AlterField(
            model_name='siteimage',
            name='image',
            field=models.ImageField(max_length=250, upload_to=monitor.models.site_image_path),
        ),
        migrations.RunPython(update_observation_validity, lambda a, b: None),
    ]