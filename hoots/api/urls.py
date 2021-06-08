from django.contrib import admin
from django.urls import path

from .views import (
    hoot_detail_view, hoot_list_view, hoot_feed_view, hoot_create_view, hoot_delete_view, hoot_action_view
)
'''
BASE Endpoint /api/hoots/
'''
urlpatterns = [
    path('', hoot_list_view),
    path('feed/', hoot_feed_view),
    path('action/', hoot_action_view),
    path('create/', hoot_create_view),
    path('<int:hoot_id>/', hoot_detail_view),
    path('<int:hoot_id>/delete/', hoot_delete_view),
]