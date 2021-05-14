from rest_framework import serializers
from django.conf import settings

from .models import Hoot

HOOT_ACTION_OPTIONS = ["like", "unlike", "rehoot"]

class HootActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in HOOT_ACTION_OPTIONS:
            raise serializers.ValidationError("Not a valid action")
        return value

class HootSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Hoot
        fields = ['id', 'content', 'likes']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate(self, value):
        if len(value) > settings.MAX_LEN:
            raise serializers.ValidationError("This hoot is too long")
        return value