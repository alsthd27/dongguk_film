from rest_framework import serializers
from .models import *


class VcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vcode
        fields = ("phone", "email", "vcode", "will_expire_on")
