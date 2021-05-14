from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Story, StorySerializer, WordSerializer
from .models import Story, Word
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render,get_object_or_404


class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing stories
    """
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    @action(methods = ['GET'], detail = True)
    def story_question(self, request, pk = None):
        NUM_OF_OTHER_WORDS = 3

        story = get_object_or_404(Story, id = pk)
        story_serialized = StorySerializer(story, many = False)

        #randomally choose one word from the words associated with this story
        correct_word = story.word_set.order_by("?").first() #not efficient - change if have time
        correct_word_serialized = WordSerializer(correct_word, many = False)
        
        #randomally choose 3 other words from the entire dictionary
        other_words = Word.objects.exclude(id = correct_word.id).order_by("?")[:NUM_OF_OTHER_WORDS]  #not efficient - change if have time
        other_words_serialized = WordSerializer(other_words, many = True)

        output_serialized = {
                            "story": story_serialized.data,
                            "correct_word": correct_word_serialized.data,
                            "other_words": other_words_serialized.data,
        }

        return Response(output_serialized  , status.HTTP_200_OK)        
        



class WordViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing stories and their associated words.
    """
    queryset = Word.objects.all()
    serializer_class = WordSerializer


# class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     A simple ViewSet for viewing stories
#     """
#     queryset = Story.objects.all()
#     serializer_class = StorySerializer

#     @action(methods = ['GET'], detail = True)
#     def story_question(self, request, pk = None):
#         NUM_OF_OTHER_WORDS = 3

#         story = get_object_or_404(Story, id = pk)
#         story_serialized = StorySerializer(story, many = False)

#         #randomally choose one word from the words associated with this story
#         correct_word = story.word_set.order_by("?").first() #not efficient - change if have time
#         correct_word_serialized = WordSerializer(correct_word, many = False)
        
#         #randomally choose 3 other words from the entire dictionary
#         other_words = Word.objects.exclude(id = correct_word.id).order_by("?")[:NUM_OF_OTHER_WORDS]  #not efficient - change if have time
#         other_words_serialized = WordSerializer(other_words, many = True)

#         output_serialized = {
#                             "story": story_serialized.data,
#                             "correct_word": correct_word_serialized.data,
#                             "other_words": other_words_serialized.data,
#         }

#         return Response(output_serialized  , status.HTTP_200_OK)     