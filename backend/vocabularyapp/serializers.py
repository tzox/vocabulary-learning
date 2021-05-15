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
    
    story_category_name = serializers.ReadOnlyField(source='story_category.category_name')
    class Meta:
        model = Story
        fields = ['id', 'story_text', 'story_category_name']

    # random_question = serializers.SerializerMethodField()

    # def get_random_question(self, obj):
    #     NUM_OF_OTHER_WORDS = 4

    #     story = get_object_or_404(Story, id = pk)
    #     story_serialized = StorySerializer(story, many = False)

    #     #randomally choose one word from the words associated with this story
    #     correct_word = story.word_set.order_by("?").first() #not efficient - change if have time
    #     correct_word_serialized = WordSerializer(correct_word, many = False)
        
    #     #randomally choose 3 other words from the entire dictionary
    #     other_words = Word.objects.exclude(id = correct_word.id).order_by("?")[:NUM_OF_OTHER_WORDS]  #not efficient - change if have time
    #     other_words_serialized = WordSerializer(other_words, many = True)


    #     output_serialized = {
    #                         "story": story_serialized.data,
    #                         "correct_word": correct_word_serialized.data,
    #                         "other_words": other_words_serialized.data,
    #     }

    #     return output_serialized
