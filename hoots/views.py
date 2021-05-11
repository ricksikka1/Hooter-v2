import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


from .forms import HootForm
from .models import Hoot

# Create your views here.
def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={}, status=200)

def hoot_create_view(request, *args, **kwargs):
    # create a form instance and populate it with data from the request
    form = HootForm(request.POST or None)
    next_url = request.POST.get("next") or None
     # check whether it's valid
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = HootForm()
    return render(request, 'components/form.html', context={"form": form})

def hoot_list_view(request, *args, **kwargs):
    """
    Return REST API View (note 5)
    """

    qs = Hoot.objects.all()
    hoots_list = [x.serialize() for x in qs]
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