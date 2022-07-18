from django.contrib import admin
from .models import *


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "student_id",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
    )
    list_display_links = (
        "username",
        "email",
        "student_id",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
    )
    search_fields = (
        "username",
        "email",
        "student_id",
        "name",
        "phone",
        "is_staff",
        "is_active",
        "date_joined",
    )


@admin.register(Vcode)
class VcodeAdmin(admin.ModelAdmin):
    list_display = (
        "student_id",
        "email_vcode",
        "phone_vcode",
        "will_expire_on",
    )
    list_display_links = (
        "student_id",
        "email_vcode",
        "phone_vcode",
        "will_expire_on",
    )
    search_fields = (
        "student_id",
        "email_vcode",
        "phone_vcode",
        "will_expire_on",
    )
