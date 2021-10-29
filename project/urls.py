
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', include('events.urls')),
    path('api/tags/', include('tags.urls')),
    path('api/accounts/', include('allauth.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/join/', include('join.urls')),

]
