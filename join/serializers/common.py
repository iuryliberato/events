from rest_framework import serializers
from ..models import Join


class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Join
        fields = '__all__'
