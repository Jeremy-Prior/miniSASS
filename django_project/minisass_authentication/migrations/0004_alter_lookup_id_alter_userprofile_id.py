# Generated by Django 4.2.7 on 2023-11-09 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minisass_authentication', '0003_alter_lookup_container_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lookup',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
