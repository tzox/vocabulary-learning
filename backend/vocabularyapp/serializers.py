from rest_framework import serializers
from .models import Story, Word
from rest_framework import status
from rest_framework.response import Response



class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['word_text', 'word_definition', 'word_image_url']




class StorySerializer(serializers.ModelSerializer):
    # words = WordSerializer(many=True)
    
    story_catgory_name = serializers.ReadOnlyField(source='story_category.category_name')
    class Meta:
        model = Story
        fields = ['id', 'story_text', 'story_catgory_name']
