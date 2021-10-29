from django.urls import path
from .views import JoinListView, JoinDetailView

urlpatterns = [
    path('', JoinListView.as_view()),
    path('<int:pk>/', JoinDetailView.as_view())
]
