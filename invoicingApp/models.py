from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class User(AbstractBaseUser):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

class Invoice(models.Model):
    invoice_id = models.IntegerField()
    client_name = models.CharField(max_length=255)
    date = models.DateField()

class Item(models.Model):
    invoice_id = models.IntegerField()
    description = models.CharField(max_length=255)
    rate = models.IntegerField()
    quantity = models.IntegerField()