# Generated by Django 3.2.3 on 2021-05-14 08:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vocabularyapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subcategory_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='story',
            name='category',
        ),
        migrations.RemoveField(
            model_name='word',
            name='category',
        ),
        migrations.RemoveField(
            model_name='word',
            name='sub_category',
        ),
        migrations.AddField(
            model_name='story',
            name='story_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='vocabularyapp.category'),
        ),
        migrations.AddField(
            model_name='word',
            name='word_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='vocabularyapp.category'),
        ),
        migrations.AddField(
            model_name='word',
            name='word_subcategory',
            field=models.ManyToManyField(to='vocabularyapp.SubCategory'),
        ),
    ]
