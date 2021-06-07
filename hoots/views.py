import random
import re
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# HTML Rendering
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context={"username": username}, status=200)

def hoots_list_view(request, *args, **kwargs):
    return render(request, "hoots/list.html")

def hoots_detail_view(request, hoot_Id, *args, **kwargs):
    return render(request, "hoots/detail.html", context={"hoot_Id": hoot_Id})