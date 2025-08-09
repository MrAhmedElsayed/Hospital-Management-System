from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('simple_message/', views.simple_message, name='simple_message'),
]