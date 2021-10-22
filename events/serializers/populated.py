from .common import EventSerializer
from join.serializers.common import JoinSerializer
from tags.serializers.common import TagSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedEventSerializer(EventSerializer):
    join = JoinSerializer(many=True)
    tags = TagSerializer(many=True)
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserSerializer()
