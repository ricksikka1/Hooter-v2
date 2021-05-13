import random
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class HootLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hoot = models.ForeignKey("Hoot", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Hoot(models.Model):
    # id = models.Autofield(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='hoot_user', blank=True, through=HootLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 200)
        }
