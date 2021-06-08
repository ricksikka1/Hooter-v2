from django.db import models
from django.conf import settings
from django.db.models import Q

User = settings.AUTH_USER_MODEL

class HootLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hoot = models.ForeignKey("Hoot", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class HootQuerySet(models.QuerySet):
    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_users_id = []
        if profiles_exist:
            followed_users_id = user.following.values_list("user__id", flat=True) # [x.user.id for x in profiles]
        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp")

class HootManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return HootQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)

class Hoot(models.Model):
    # Maps to SQL data
    # id = models.Autofield(primary_key=True)
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='hoot_user', blank=True, through=HootLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = HootManager()

    class Meta:
        ordering = ['-id']

    @property
    def is_rehoot(self):
        return self.parent != None




