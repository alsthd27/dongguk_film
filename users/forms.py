from allauth.socialaccount.forms import SignupForm
from django import forms


class SocialSignupForm(SignupForm):
    extra_data = forms.CharField(
        max_length=1000,
        label="부가 정보",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "block w-full sm:text-sm placeholder-gray-400 rounded-md border-gray-300 focus:ring-flamingo-500 focus:border-flamingo-500 read-only:bg-gray-100 read-only:cursor-not-allowed",
                "placeholder": "https://lh3.googleusercontent.com/...#Google",
                "readonly": "",
            }
        ),
    )
    name = forms.CharField(
        max_length=15,
        min_length=2,
        label="성명",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "block w-full sm:text-sm placeholder-gray-400 rounded-md border-gray-300 step-one only-hangul focus:ring-flamingo-500 focus:border-flamingo-500 read-only:bg-gray-100 read-only:cursor-not-allowed",
                "placeholder": "홍길동",
                "required": "",
            }
        ),
    )
    email = forms.CharField(
        max_length=100,
        label="이메일 주소",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "class": "block w-full sm:text-sm placeholder-gray-400 rounded-md border-gray-300 step-one only-email focus:ring-flamingo-500 focus:border-flamingo-500 read-only:bg-gray-100 read-only:cursor-not-allowed",
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
                "class": "block w-full sm:text-sm placeholder-gray-400 rounded-md border-gray-300 step-one only-phone focus:ring-flamingo-500 focus:border-flamingo-500 read-only:bg-gray-100 read-only:cursor-not-allowed",
                "placeholder": "010-0000-0000",
                "required": "",
            }
        ),
    )

    def save(self, request):
        user = super(SocialSignupForm, self).save(request)
        user.student_id = self.cleaned_data["student_id"]
        user.name = self.cleaned_data["name"]
        user.phone = self.cleaned_data["phone"]
        user.save()
        return user
