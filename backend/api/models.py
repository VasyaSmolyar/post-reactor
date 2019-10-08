from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import random
import string

def generate(length=30):
    src = string.ascii_letters + string.digits
    res = ''.join([random.choice(src) for x in range(length)])
    print(res)
    return res

class ReactManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, password=None):
        user = self.model(username = username)
        user.active = True
        user.token = generate()
        user.set_password(password)
        user.save()
        return user

    def create_staffuser(self, username, password):
        user = self.create_user(username, password)
        user.staff = True
        user.save()
        return user

    def create_superuser(self, username, password):
        user = self.create_staffuser(username, password)
        user.admin = True
        user.is_superuser = True
        user.save()
        return user

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    pic = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class ReactUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = None
    name = models.CharField(max_length=255, blank=True)
    avatar = models.CharField(max_length=255, blank=True)
    about = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    token = models.CharField(max_length=255, default='')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = ReactManager()

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active

    def update(self, **data):
        for key, value in data.items():
            if key == 'password':
                self.set_password(value)
            else:
                self.__setattr__(key, value)
        self.save()
