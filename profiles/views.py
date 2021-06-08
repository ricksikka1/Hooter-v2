from django.shortcuts import redirect, render
from django.http import Http404

from .models import Profile
from .form import ProfileForm

# Create your views here.
def profile_detail_view(request, username, *args, **kwargs):
    # Get the profile for the username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        "username": username,
        "profile": profile_obj
    }
    return render(request, "profiles/detail.html", context)

def profle_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('/login?next=/profile/update')
    user = request.user
    my_profile = request.user.profile
    form = ProfileForm(request.POST or None, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email_address = form.cleaned_data.get('email_address')
        user.first_name = first_name
        user.last_name = last_name
        user.email_address = email_address
        user.save()
        profile_obj.save()
    
    context = {
        "form": form,
        "btn-label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/update.html", context)