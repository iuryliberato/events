# Generated by Django 3.2.8 on 2021-10-27 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='time_from',
            field=models.PositiveIntegerField(default=None),
        ),
        migrations.AddField(
            model_name='event',
            name='time_until',
            field=models.PositiveIntegerField(default=None),
        ),
    ]