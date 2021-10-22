from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Tag
from .serializers.populated import PopulatedTagSerializer


class TagListView(APIView):

    def get(self, _request):
        tags = Tag.objects.all()
        serialized_tags = PopulatedTagSerializer(tags, many=True)
        return Response(serialized_tags.data, status=status.HTTP_200_OK)
