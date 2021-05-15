from django.db import models

class Category(models.Model):
    category_name = models.CharField(max_length = 100)

    def __str__(self):
        return self.category_name




class SubCategory(models.Model):
    subcategory_name = models.CharField(max_length = 100)

    def __str__(self):
        return self.subcategory_name




class Story(models.Model):
    story_category = models.ForeignKey(Category, models.SET_NULL,
                                        blank=True,
                                        null=True)
    story_text = models.TextField()

    def __str__(self):
        return str(self.story_category) +": " + self.story_text[0:50] + "..."




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




