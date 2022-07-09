from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
import json


class VcodeViewSet(viewsets.ModelViewSet):
    queryset = Vcode.objects.all()
    serializer_class = VcodeSerializer