from rest_framework import viewsets
from .serializers import StoryIdSerializer, StoryQuestionSerializer
from .models import Story



class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet that allowes:
        -get all stories IDS
        -generate a random question for a specific story id
        random questions consists of 1 words from the story and 4 other words from the entire dictionary
    """
    queryset = Story.objects.select_related('story_category').all()
    serializer_class = StoryQuestionSerializer
    serializer_class_actions = { 'retrieve': StoryQuestionSerializer, 'list': StoryIdSerializer}
    
    def get_serializer_class(self):
        return self.serializer_class_actions[self.action]

