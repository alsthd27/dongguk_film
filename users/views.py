from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
import json


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class VcodeViewSet(viewsets.ModelViewSet):
    queryset = Vcode.objects.all()
    serializer_class = VcodeSerializer