from django.db import models


class Event(models.Model):
    event_title = models.CharField(max_length=50, default=None)
    description = models.CharField(max_length=500, default=None)
    date = models.CharField(max_length=16, default=None)
    price = models.PositiveIntegerField(default=None)
    address = models.CharField(max_length=200, default=None)
    animal_friendly = models.BooleanField(default=True)
    # event_image = models.ImageField(upload_to='images/', default='None')
    tags = models.ManyToManyField(
        'tags.Tag',
        related_name="events"
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='events',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.event_title} {self.date} - £{self.price}"
