"""hooter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from re import template
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView

from hoots.views import (
    hoots_list_view, hoots_detail_view, home_view
)

from accounts.views import (
    login_view, logout_view, register_view
)

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('all/', hoots_list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<int:hoot_Id>', hoots_detail_view),
    re_path(r'profiles?/', include('profiles.urls')),
    path('api/hoots/', include('hoots.api.urls')),
    re_path(r'api/profiles?/', include('profiles.api.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)