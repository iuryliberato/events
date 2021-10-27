from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user = user_to_create.save()
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode(
                {'sub': user.id, 'exp': int(dt.strftime('%s'))},
                settings.SECRET_KEY,
                algorithm='HS256'
            )
            print('TOKEN', token)
            return Response({'token': token, 'message': 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print('TOKEN', token)

        # return token to the user as a response
        return Response({'token': token, 'message': f"Welcome back, {user_to_login.username}"})


class ProfileView(APIView):

    def get(self, _request, pk):
        try:
            user_profile = User.objects.get(pk=pk)
            user = UserSerializer(user_profile)
            print('message one', user)

        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_profile.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print('TOKEN', token)
        return Response({})
