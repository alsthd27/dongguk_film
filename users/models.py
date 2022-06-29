from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=13, null=False, blank=False)

    class Meta:
        verbose_name = "프로필"
        verbose_name_plural = "프로필(들)"


class Vcode(models.Model):
    phone = models.CharField(max_length=13, null=True, blank=True)
    email = models.CharField(max_length=20, null=True, blank=True)
    vcode = models.CharField(max_length=10, null=False, blank=False)
    will_expire_on = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "인증 코드"
        verbose_name_plural = "인증 코드(들)"
