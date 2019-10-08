# Generated by Django 2.2.3 on 2019-10-06 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReactUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('avatar', models.CharField(blank=True, max_length=255)),
                ('about', models.TextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]