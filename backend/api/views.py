from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Post, ReactUser
from .serializers import PostSerializer, UserSerializer
# Create your views here.

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer

class UserView(viewsets.ModelViewSet):
    queryset = ReactUser.objects.all()
    serializer_class = UserSerializer

    def update(self, request, pk):
        user = ReactUser.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user.update(**request.data.dict())
            return Response(serializer.data)
        else:
            data = request.data.dict()
            upd = False
            if "username" in serializer.errors and serializer.errors["username"] == "This field may not be blank.":
                upd = True
            else:
                del data['username']
            if "password" in serializer.errors:
                upd = True
            else:
                del data['password']
            if upd:
                user.update(**data)
                serializer = UserSerializer(user)
                return Response(serializer.data)
            return Response(serializer.errors)