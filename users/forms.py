from allauth.socialaccount.forms import SignupForm
from django import forms


class SocialSignupForm(SignupForm):
    last_name = forms.CharField(
        max_length=10,
        label="성",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "relative block w-full sm:text-sm placeholder-gray-400 rounded-l-md border-gray-300 only-hangul focus:z-10 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "홍",
                "readonly": "",
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
                "readonly": "",
            }
        ),
    )
    email = forms.CharField(
        max_length=100,
        label="이메일 주소",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "block w-full pl-10 sm:text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "gildong@example.com",
                "required": "",
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
                "class": "block w-full pl-10 sm:text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-flamingo-500 focus:border-flamingo-500",
                "placeholder": "010-0000-0000",
                "required": "",
            }
        ),
    )

    def save(self, request):
        user = super(SocialSignupForm, self).save(request)
        user.name = self.cleaned_data["name"]
        user.phone = self.cleaned_data["phone"]
        user.save()
        return user
