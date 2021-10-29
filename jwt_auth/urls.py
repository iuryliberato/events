from django.urls import path
from .views import RegisterView, LoginView, ProfileView, LoggedInProfileView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', LoggedInProfileView.as_view()),
    path('profile/<int:pk>/', ProfileView.as_view())

]
