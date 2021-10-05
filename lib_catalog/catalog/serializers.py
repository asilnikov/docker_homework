from rest_framework import serializers
from .models import Author, Book, PublishingHouse, IssueCity, KeyWord, BBK


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = '__all__'


class PublishingHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublishingHouse
        fields = '__all__'


class IssueCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCity
        fields = '__all__'


class KeyWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyWord
        fields = '__all__'


class BBKSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBK
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):

    author = AuthorSerializer(read_only=True, many=True)
    publishing_house = PublishingHouseSerializer(read_only=True)
    issue_city = IssueCitySerializer(read_only=True)
    keywords = KeyWordSerializer(read_only=True, many=True)
    bbk = BBKSerializer(read_only=True, many=True)

    class Meta:
        model = Book
        fields = '__all__'

