from django.urls import path
from .views import *

app_name = "users"
urlpatterns = [
    path("create-vcode", create_vcode, name="create_vcode"),
    path("confirm-vcode", confirm_vcode, name="confirm_vcode"),
]
