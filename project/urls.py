
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
# <-- added this new import re_path
from django.urls import path, include, re_path
from .views import index  # <-- also new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', include('events.urls')),
    path('api/tags/', include('tags.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/join/', include('join.urls')),
    re_path(r'^.*$', index)  # <-- have this come last using re path.
]
