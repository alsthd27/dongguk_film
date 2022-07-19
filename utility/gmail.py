import os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from dongguk_film import settings
from django.core.mail import send_mail as django_send_mail
from .hangul import *


email_host_user = getattr(settings, "EMAIL_HOST_USER", "EMAIL_HOST_USER")


def send_mail(dict_data):
    data = dict_data
    type = data["type"]
    if type == "sign up":
        email_vcode = data["content"]["email_vcode"]
        raw_content = f'[디닷에프] 이메일 주소 인증번호는 {email_vcode}{handle_hangul(pronounce_last_number(email_vcode), "이에요예요", False)}!'
    return django_send_mail(
        subject="[디닷에프] 이메일 주소 인증번호예요!",
        message=raw_content,
        from_email=email_host_user,
        recipient_list=[data["email"]],
    )


# send_mail(subject="[디닷에프] 이메일 주소 인증번호예요!", message="테스트", from_email="donggukfilmsu@gmail.com", recipient_list=["admin@dongguk.film"])