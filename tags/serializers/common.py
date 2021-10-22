from rest_framework import serializers
from ..models import Tag

# define our generic serializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
