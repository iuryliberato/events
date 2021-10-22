from .common import TagSerializer
from events.serializers.common import EventSerializer


class PopulatedTagSerializer(TagSerializer):
    events = EventSerializer(many=True)
