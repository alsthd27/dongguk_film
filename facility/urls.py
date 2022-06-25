from django.urls import path
from .views import *

app_name = "facility"
urlpatterns = [
    path("equipment", equipment, name="equipment"),
]
