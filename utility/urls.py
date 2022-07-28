from django.urls import path
from .d_utils import *

app_name = "utility"
urlpatterns = [
    path("create-vcode", create_vcode, name="create_vcode"),
    path("confirm-vcode", confirm_vcode, name="confirm_vcode"),
]
