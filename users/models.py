from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    student_id = models.CharField(max_length=10, null=True, blank=True)
    name = models.CharField(("성명"), max_length=150, null=True, blank=True)
    phone = models.CharField(("휴대전화 번호"), max_length=13, null=True, blank=True)
    extra_data = models.CharField(("부가 정보"), max_length=1000, null=True, blank=True)

    class Meta:
        verbose_name = "사용자"
        verbose_name_plural = "사용자(들)"


class Vcode(models.Model):
    student_id = models.CharField(max_length=10, null=True, blank=True)
    email_vcode = models.CharField(max_length=6, null=True, blank=True)
    phone_vcode = models.CharField(max_length=6, null=True, blank=True)
    will_expire_on = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "인증 코드"
        verbose_name_plural = "인증 코드(들)"
