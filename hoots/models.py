from django.db import models

class Hoot(models.Model):
    # id = models.Autofield(primary_key=True)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
