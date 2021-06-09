import random
import re
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# HTML Rendering
def home_view(request, *args, **kwargs):
    return render(request, "pages/feed.html")

def hoots_list_view(request, *args, **kwargs):
    return render(request, "hoots/list.html")

def hoots_detail_view(request, hoot_Id, *args, **kwargs):
    return render(request, "hoots/detail.html", context={"hoot_Id": hoot_Id})