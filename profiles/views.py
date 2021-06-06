from django.shortcuts import render

# Create your views here.
def profile_detail_view(request, username, *args, **kwargs):
    # Get the profile for the username
    return render(request, "profile/detail.html", context={"username": username})