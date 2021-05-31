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
from django.urls import path, include

from django.views.generic import TemplateView

from hoots.views import (
    home_view, hoot_detail_view, hoot_list_view, hoot_create_view, hoot_delete_view, hoot_action_view
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('create', hoot_create_view),
    path('hoots', hoot_list_view),
    path('hoots/<int:hoot_id>', hoot_detail_view),
    path('api/hoots/', include('hoots.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)