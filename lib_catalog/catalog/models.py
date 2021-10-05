from django.db import models

# Create your models here.

class Author(models.Model):
    fname = models.CharField(max_length=200)
    lname = models.CharField(max_length=200)
    short_name = models.CharField(max_length=200, blank=True, null=True)
    author_code = models.CharField(max_length=200, blank=True, null=True)
    addition = models.CharField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.lname + ' ' + self.fname


class KeyWord(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class IssueCity(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class PublishingHouse(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class BBK(models.Model):
    code = models.CharField(max_length=20)
    description = models.CharField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.code


class Book(models.Model):
    name = models.CharField(max_length=200)
    author = models.ManyToManyField(Author, blank=True)
    bbk = models.ManyToManyField(BBK, blank=True)
    author_sign = models.CharField(max_length=200, blank=True, null=True)
    issue_year = models.IntegerField(blank=True, null=True)
    keywords = models.ManyToManyField(KeyWord, blank=True)
    description = models.CharField(max_length=2000, blank=True, null=True)
    issue_city = models.ForeignKey(IssueCity, on_delete=models.SET_NULL, blank=True, null=True)
    publishing_house = models.ForeignKey(PublishingHouse, on_delete=models.SET_NULL, blank=True, null=True)
    place = models.CharField(max_length=200, blank=True, null=True)
    # picture = models.CharField()
    # file = models.FileField(upload_to='', blank=True, null=True )
    pages = models.CharField(max_length=200, blank=True, null=True)
    additional_data = models.CharField(max_length=200, blank=True, null=True)
    series = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name
