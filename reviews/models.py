from django.db import models

# Create your models here.


class Review(models.Model):
    write_your_review = models.TextField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    event = models.ForeignKey(
        "events.Event",
        related_name="reviews",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.event} - {self.created_at}"
