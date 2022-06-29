from django.contrib import admin
from .models import *


@admin.register(Profile)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone",
    )
    list_display_links = (
        "user",
        "phone",
    )
    search_fields = (
        "user",
        "phone",
    )


@admin.register(Vcode)
class VcodeAdmin(admin.ModelAdmin):
    list_display = (
        "phone",
        "email",
        "vcode",
        "will_expire_on",
    )
    list_display_links = (
        "phone",
        "email",
        "vcode",
        "will_expire_on",
    )
    search_fields = (
        "phone",
        "email",
        "vcode",
        "will_expire_on",
    )
