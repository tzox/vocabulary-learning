# Generated by Django 3.2.3 on 2021-05-14 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocabularyapp', '0002_auto_20210514_1030'),
    ]

    operations = [
        migrations.RenameField(
            model_name='word',
            old_name='definition',
            new_name='word_definition',
        ),
        migrations.RenameField(
            model_name='word',
            old_name='image_link',
            new_name='word_image_url',
        ),
    ]
