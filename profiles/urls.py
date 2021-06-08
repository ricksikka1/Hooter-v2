from django.contrib import admin
from django.urls import path, include

from .views import profile_detail_view, profle_update_view

urlpatterns = [
    path('edit', profle_update_view),
    path('<str:username>', profile_detail_view),
] 