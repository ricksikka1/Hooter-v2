from rest_framework import serializers
from django.conf import settings

from .models import Hoot

class HootSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hoot
        fields = ['content']

    def validate(self, value):
        if len(value) > settings.MAX_LEN:
            raise serializers.ValidationError("This hoot is too long")
        return value