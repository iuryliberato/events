from jwt_auth.serializers.common import UserSerializer
from .common import ReviewSerializer


class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()
