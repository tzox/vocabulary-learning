from django.db import models

"""
A model representing a catgory - each story and each word are associated to a single category
"""
class Category(models.Model):
    category_name = models.CharField(max_length = 100)

    def __str__(self):
        return self.category_name


"""
A model representing a sub category - a word can be associated with multiple sub categories
-- I assumed this because the assignment mentioned a sub category "land, road" - which I took for 2 sub categories
"""
class SubCategory(models.Model):
    subcategory_name = models.CharField(max_length = 100)

    def __str__(self):
        return self.subcategory_name

"""
A model representing a story. Each story has a category, a text and associated words
"""
class Story(models.Model):
    story_category = models.ForeignKey(Category, models.SET_NULL,
                                        blank=True,
                                        null=True)
    story_text = models.TextField()

    def __str__(self):
        return str(self.story_category) +": " + self.story_text[0:50] + "..."



"""
A model representing a word - a word can appear in multiple stories.
Additional information per word: category, sub categories, a url to an image of the word
"""
class Word(models.Model):
    word_text= models.CharField(max_length = 100)
    word_definition = models.TextField()
    word_category = models.ForeignKey(Category, models.SET_NULL,
                                        blank=True,
                                        null=True)
    word_subcategory = models.ManyToManyField(SubCategory)
    word_image_url = models.URLField()
    stories = models.ManyToManyField(Story)

    def __str__(self):
        return self.word_text




