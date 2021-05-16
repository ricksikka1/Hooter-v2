import random
import re
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


from .forms import HootForm
from .models import Hoot
from .serializers import HootSerializer, HootActionSerializer, HootCreateSerializer

# Create your views here.
def home_view(request, *args, **kwargs):
    #return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={}, status=200)


@api_view(['POST']) # client has to send POST!
@permission_classes([IsAuthenticated])
def hoot_create_view(request, *args, **kwargs):
    serializer = HootCreateSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def hoot_list_view(request, *args, **kwargs):
    qs = Hoot.objects.all()
    serializer = HootSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def hoot_detail_view(request, hoot_id, *args, **kwargs):
    qs = Hoot.objects.filter(id=hoot_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = HootSerializer(obj)
    return Response(serializer.data)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def hoot_delete_view(request, hoot_id, *args, **kwargs):
    qs = Hoot.objects.filter(id=hoot_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Hoot Removed"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def hoot_action_view(request, *args, **kwargs):
    '''
    id is required
    Action options are: like, unlike, retweet
    '''
    print("we in here")
    serializer = HootActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        hoot_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Hoot.objects.filter(id=hoot_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = HootSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
        elif action == "rehoot":
            new_hoot = Hoot.objects.create(
                    user=request.user, 
                    parent=obj,
                    content=content)
        serializer = HootSerializer(new_hoot)
        return Response(serializer.data, status=200)

    return Response({}, status=200)






def hoot_create_view_pure_django(request, *args, **kwargs):
    '''
    REST API Create View -> Django REST
    '''
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    # create a form instance and populate it with data from the request
    form = HootForm(request.POST or None)
    next_url = request.POST.get("next") or None
     # check whether it's valid
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = HootForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form": form})

def hoot_list_view_pure_django(request, *args, **kwargs):
    """
    Return REST API View (note 5)
    """

    qs = Hoot.objects.all()
    hoots_list = [x.serialize() for x in qs]
    data = {
        "response": hoots_list
    }
    return JsonResponse(data)

def hoot_detail_view_pure_django(request, hoot_id, *args, **kwargs):
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