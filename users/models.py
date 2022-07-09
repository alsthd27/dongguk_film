from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    name = models.CharField(_("성명"), max_length=150, null=True, blank=True)
    phone = models.CharField(_("휴대전화 번호"), max_length=13, null=True, blank=True)


class Vcode(models.Model):
    phone = models.CharField(max_length=13, null=True, blank=True)
    email = models.CharField(max_length=20, null=True, blank=True)
    vcode = models.CharField(max_length=10, null=False, blank=False)
    will_expire_on = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "인증 코드"
        verbose_name_plural = "인증 코드(들)"
