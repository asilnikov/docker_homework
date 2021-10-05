from django.shortcuts import render
from .models import Author, Book, PublishingHouse, IssueCity, KeyWord, BBK
from rest_framework.viewsets import ModelViewSet
from .serializers import BookSerializer, AuthorSerializer, PublishingHouseSerializer, BBKSerializer, KeyWordSerializer, \
    IssueCitySerializer
from rest_framework.response import Response

# Create your views here.

class BookViewSet(ModelViewSet):
    queryset = Book.objects.all().order_by('name')
    serializer_class = BookSerializer
    filterset_fields = ['bbk__code', 'author_sign', 'publishing_house__name']
    search_fields = ['author__name', 'name', 'issue_year', 'key_word__name']

    def perform_update(self, serializer):
        book = serializer.save()

        if 'keywords' in self.request.data:
            key_words = self.request.data.pop('keywords')
            book.keywords.clear()
            for key_word in key_words:
                if 'id' in key_word:
                    key_word_to_assign = KeyWord.objects.get(pk=key_word['id'])
                elif 'name' in key_word:
                    list_names = KeyWord.objects.filter(name=key_word['name'])

                    if len(list_names) > 0:
                        key_word_to_assign = KeyWord.objects.get(pk=key_word['id'])
                    else:
                        key_word_to_assign = KeyWord.objects.create(name=key_word['name'])
                        key_word_to_assign.save()

                book.keywords.add(key_word_to_assign)

        if 'bbk' in self.request.data:
            book.bbk.clear()
            for bbk in self.request.data['bbk']:
                bbk_to_assign = BBK.objects.get(pk=bbk['id'])
                book.bbk.add(bbk_to_assign)

        if 'issue_city' in self.request.data:
            book.issue_city = IssueCity.objects.get(pk=self.request.data.pop('issue_city')['id'])

        if 'publishing_house' in self.request.data:
            book.publishing_house = PublishingHouse.objects.get(pk=self.request.data.pop('publishing_house')['id'])

        if 'author' in self.request.data:
            book.author.clear()
            for author in self.request.data['author']:
                author_to_assign = Author.objects.get(pk=author['id'])
                book.author.add(author_to_assign)

        book.save()

    def create(self, request):
        serializer = BookSerializer(data=request.data)
        serializer.is_valid()
        book = Book(**serializer.validated_data)
        book.save()
        bbks = request.data.pop('bbk')

        if 'publishing_house' in request.data:
            publishing_house = PublishingHouse.objects.get(pk=request.data.pop('publishing_house')['id'])
            book.publishing_house = publishing_house

        if 'issue_city' in request.data:
            issue_city = IssueCity.objects.get(pk=request.data.pop('issue_city')['id'])
            book.issue_city = issue_city

        if request.data['author_sign'] != '':
            book.author_sign = request.data['author_sign']
        else:
            book.author_sign = Author.objects.get(pk=request.data['author'][0]['id']).author_code

        if request.data['keywords']:
            for key_word in request.data['keywords']:
                if 'id' in key_word:
                    key_word_to_assign = KeyWord.objects.get(pk=key_word['id'])
                elif 'name' in key_word:
                    list_names = KeyWord.objects.filter(name=key_word['name'])

                    if len(list_names) > 0:
                        key_word_to_assign = KeyWord.objects.get(pk=key_word['id'])
                    else:
                        key_word_to_assign = KeyWord.objects.create(name=key_word['name'])
                        key_word_to_assign.save()

                book.keywords.add(key_word_to_assign)

        for bbk in bbks:
            bbk_to_assign = BBK.objects.get(pk=bbk['id'])
            book.bbk.add(bbk_to_assign)

        if request.data['author']:
            for author in request.data['author']:
                author_to_assign = Author.objects.get(pk=author['id'])
                book.author.add(author_to_assign)

        book.save()

        return Response(BookSerializer(book).data)


class AuthorViewSet(ModelViewSet):
    queryset = Author.objects.all().order_by('lname')
    serializer_class = AuthorSerializer
    filterset_fields = ['lname']

    def create(self, request, *args, **kwargs):
        serializer = AuthorSerializer(data=request.data)
        serializer.is_valid()
        author = Author.objects.create(**serializer.validated_data)
        author.save()
        fname_initials_list = author.fname.split(' ')
        fname_initials = ''
        for i in range(len(fname_initials_list)):
            if i == 0:
                fname_initials = fname_initials_list[i][0] + '.'
            else:
                fname_initials += ' ' + fname_initials_list[i][0] + '.'
        initial_name = author.lname + ' ' + fname_initials

        author.short_name = initial_name
        author.save()


        return Response(AuthorSerializer(author).data)


class PublishingHouseViewSet(ModelViewSet):
    queryset = PublishingHouse.objects.all().order_by('name')
    serializer_class = PublishingHouseSerializer


class BBKViewSet(ModelViewSet):
    queryset = BBK.objects.all().order_by('code')
    serializer_class = BBKSerializer


class KeyWordViewSet(ModelViewSet):
    queryset = KeyWord.objects.all()
    serializer_class = KeyWordSerializer


class IssueCityViewSet(ModelViewSet):
    queryset = IssueCity.objects.all().order_by('name')
    serializer_class = IssueCitySerializer
