from django.db import models

# Create your models here.


class Join(models.Model):
    event = models.ForeignKey(
        "events.Event",
        related_name="join",
        on_delete=models.CASCADE
    )
    going = models.BooleanField(default=True)

    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="join",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.join}"
