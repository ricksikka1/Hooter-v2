from rest_framework import serializers
from django.conf import settings

from .models import Hoot

HOOT_ACTION_OPTIONS = ["like", "unlike", "retweet"]

class HootActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in HOOT_ACTION_OPTIONS:
            raise serializers.ValidationError("Not a valid action")
        return value

class HootSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hoot
        fields = ['content']

    def validate(self, value):
        if len(value) > settings.MAX_LEN:
            raise serializers.ValidationError("This hoot is too long")
        return value