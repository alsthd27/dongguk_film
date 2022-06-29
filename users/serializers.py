from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("user", "phone")


class VcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vcode
        fields = ("phone", "email", "vcode", "will_expire_on")
