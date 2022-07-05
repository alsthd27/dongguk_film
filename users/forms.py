from allauth.socialaccount.forms import SignupForm
from django import forms

# models
from .models import *


class SocialSignupForm(SignupForm):
    email = forms.CharField(
        max_length=40,
        label="이메일 주소",
        widget=forms.TextInput(
            attrs={
                "type": "email",
                "class": "block w-full pl-10 bg-gray-100 sm:text-sm rounded-md border-gray-300 focus:ring-gray-400 focus:border-gray-400",
                "readonly": "",
            }
        ),
    )
    last_name = forms.CharField(
        max_length=10,
        label="성",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "relative block w-full sm:text-sm placeholder-gray-400 rounded-l-md border-gray-300 only-hangul focus:z-10 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "홍",
                "onkeypress": "onlyHangul(event)",
            }
        ),
    )
    first_name = forms.CharField(
        max_length=10,
        label="명",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "relative block w-full sm:text-sm placeholder-gray-400 rounded-r-md border-gray-300 only-hangul focus:z-10 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "길동",
                "onkeypress": "onlyHangul(event)",
            }
        ),
    )
    phone = forms.CharField(
        max_length=13,
        min_length=13,
        label="휴대전화 번호",
        widget=forms.TextInput(
            attrs={
                "type": "tel",
                "class": "block w-full pl-10 sm:text-sm placeholder-gray-400 rounded-l-md border-gray-300 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "010-0000-0000",
                "onkeypress": "onlyNumber(event)",
            }
        ),
    )

    def save(self, request):
        user = super(SocialSignupForm, self).save(request)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.save()
        profile = Profile()
        profile.user = user
        profile.phone = self.cleaned_data["phone"]
        profile.save()
        return user
