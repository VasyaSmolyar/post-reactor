from .models import Post, ReactUser
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'text', 'pic', 'created', 'updated']

class UserSerializer(serializers.Serializer):
    
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=ReactUser.objects.all())])
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(default='')
    avatar = serializers.CharField(default='')
    about = serializers.CharField(default='')

    def create(self, data):
        user = ReactUser(**data)
        user.set_password(data['password'])
        user.save()
        return user

class AuthSerializer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)