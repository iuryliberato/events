from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Event
from .serializers.common import EventSerializer
from .serializers.populated import PopulatedEventSerializer


class EventListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        events = Event.objects.all()
        # print('Events', events)
        serialized_events = PopulatedEventSerializer(events, many=True)
        # print('SERIALIZER', serialized_events.data)
        return Response(serialized_events.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        event_to_add = EventSerializer(data=request.data)
        if event_to_add.is_valid():
            event_to_add.save()
            return Response(event_to_add.data, status=status.HTTP_201_CREATED)
        return Response(event_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class EventDetailView(APIView):

    def get_event(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise NotFound(details="⭕️ Can't find that Event")

    def get(self, _request, pk):
        event = Event.objects.get(pk=pk)
        serialized_event = PopulatedEventSerializer(event)
        # print(serialized_event.data)
        return Response(serialized_event.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        event_to_delete = Event.objects.get(pk=pk)
        event_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        event_to_update = self.get_event(pk=pk)  # get our product
        # print('Request data', request.data)
        updated_event = EventSerializer(event_to_update, data=request.data)
        if updated_event.is_valid():  # is_valid checks the validity of the newly created object
            updated_event.save()  # saves it if it's valid
            # print('Updated data', updated_event.data)
            return Response(updated_event.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_event.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
