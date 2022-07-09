from django.contrib import admin
from .models import *


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
    )
    list_display_links = (
        "username",
        "email",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
    )
    search_fields = (
        "username",
        "email",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
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
