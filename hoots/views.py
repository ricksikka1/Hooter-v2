from django.shortcuts import render
from django.http import HttpResponse, Http404

from .models import Hoot

# Create your views here.
def home_view(request, *args, **kwargs):
    return HttpResponse("<h1>Hello World</h1>")

def hoot_detail_view(request, hoot_id, *args, **kwargs):
    """
    
    """
    try:
        obj = Hoot.objects.get(id=hoot_id)
    except:
        raise Http404
    return HttpResponse(f"<h1>Hello {hoot_id} - {obj.content}")