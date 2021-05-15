from rest_framework import serializers
from .models import Story, Word
from rest_framework import status
from rest_framework.response import Response
from .const import NUM_OF_OTHER_WORDS

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['word_text', 'word_definition', 'word_image_url']



"""
Serializer to return a list of stories ids
"""
class StoryIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ['id']


    #overwrite to_representation to return a list of ids and not a list of json
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation['id']

"""
Serializer that given a story, generated a random question
"""
class StoryQuestionSerializer(serializers.ModelSerializer):
    random_question = serializers.SerializerMethodField()    
    story_category_name = serializers.ReadOnlyField(source='story_category.category_name')

    class Meta:
        model = Story
        fields = ['id', 'story_text', 'story_category_name', 'random_question']

    def get_random_question(self, obj):

        #randomally choose one word from the words associated with this story
        correct_word = obj.word_set.order_by("?").first() #not efficient - change if have time
        correct_word_serialized = WordSerializer(correct_word)

        #randomally choose 3 other words from the entire dictionary
        other_words = Word.objects.exclude(id = correct_word.id).order_by("?")[:NUM_OF_OTHER_WORDS]  #not efficient - change if have time
        other_words_serialized = WordSerializer(other_words, many = True)
        
        output_serialized = {
                            "correct_word": correct_word_serialized.data,
                            "other_words": other_words_serialized.data,
        }

        return output_serialized
