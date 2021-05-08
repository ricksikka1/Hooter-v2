from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Hoot

# Create your views here.
def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={}, status=200)

def hoot_list_view(request, *args, **kwargs):
    """
    Return REST API View (note 5)
    """

    qs = Hoot.objects.all()
    hoots_list = [{"id": x.id, "content": x.content} for x in qs]
    data = {
        "response": hoots_list
    }
    return JsonResponse(data)

def hoot_detail_view(request, hoot_id, *args, **kwargs):
    """
    Return REST API View (note 5)
    """
    data = {
        "id": hoot_id,
    }
    status = 200

    try:
        obj = Hoot.objects.get(id=hoot_id)
        data['content'] = obj.content
    except:
        status = 404
        data['message'] = "Not Found"

    return JsonResponse(data, status=status)