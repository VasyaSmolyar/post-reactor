from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    pic = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)