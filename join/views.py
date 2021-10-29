from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated


from .models import Join

from .serializers.common import JoinSerializer


class JoinListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        join_to_add = JoinSerializer(data=request.data)
        if join_to_add.is_valid():
            join_to_add.save()
            return Response(join_to_add.data, status=status.HTTP_201_CREATED)
        return Response(join_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class JoinDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_join(self, pk):
        try:
            join = Join.objects.get(pk=pk)
            return join
        except Join.DoesNotExist:
            raise NotFound(detail="🆘 Join not found")

    def delete(self, request, pk):
        join_to_delete = self.get_join(pk=pk)
        if join_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        join_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
