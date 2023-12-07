# Generated by Django 4.2.7 on 2023-11-28 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minisass', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupScores',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('sensitivity_score', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
    ]