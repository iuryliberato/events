# Generated by Django 3.2.8 on 2021-10-27 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20211027_1838'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='time_from',
            field=models.CharField(default=None, max_length=8),
        ),
        migrations.AlterField(
            model_name='event',
            name='time_until',
            field=models.CharField(default=None, max_length=8),
        ),
    ]
