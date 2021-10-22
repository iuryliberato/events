from django.db import models

# Create your models here.


class Join(models.Model):
    join = models.ForeignKey(
        "events.Event",
        related_name="join",
        on_delete=models.CASCADE
    )
    going = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.join}"
