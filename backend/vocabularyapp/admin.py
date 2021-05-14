from django.contrib import admin
from .models import Story, Word, Category, SubCategory

# class VocabularyLearningAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description', 'completed')

admin.site.register(Story)
admin.site.register(Word)
admin.site.register(Category)
admin.site.register(SubCategory)