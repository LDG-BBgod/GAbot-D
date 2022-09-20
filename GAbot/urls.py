from django.contrib import admin
from django.urls import path
from home.views import HomeView

urlpatterns = [
    path('', HomeView),
    path('admin/', admin.site.urls),
]
