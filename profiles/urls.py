from django.contrib import admin
from django.urls import path, include

from .views import profile_detail_view

urlpatterns = [
    path('profile/<str:username>', profile_detail_view)
] 