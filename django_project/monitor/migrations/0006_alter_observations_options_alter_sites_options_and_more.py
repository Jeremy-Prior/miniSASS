# Generated by Django 4.2.7 on 2024-01-11 00:05

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('monitor', '0005_merge_20231211_1322'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='observations',
            options={'verbose_name_plural': 'Observations'},
        ),
        migrations.AlterModelOptions(
            name='sites',
            options={'verbose_name_plural': 'Sites'},
        ),
        migrations.AddField(
            model_name='observationpestimage',
            name='valid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='observations',
            name='is_validated',
            field=models.BooleanField(default=False, help_text='Flag whether observation correctness has been validated'),
        ),
        migrations.AlterField(
            model_name='observationpestimage',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='observations',
            name='flag',
            field=models.CharField(choices=[('dirty', 'Dirty'), ('clean', 'Clean')], default='dirty', help_text='Flag whether observation comes from expert or novice', max_length=5),
        ),
        migrations.AlterField(
            model_name='pest',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='siteimage',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]