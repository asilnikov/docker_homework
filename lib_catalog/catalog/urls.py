from .views import AuthorViewSet, BookViewSet, BBKViewSet, PublishingHouseViewSet, IssueCityViewSet, \
    KeyWordViewSet
from django.urls import path
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('author', AuthorViewSet, basename='author')
router.register('book', BookViewSet, basename='book')
router.register('bbk', BBKViewSet, basename='bbk')
router.register('publishing_house', PublishingHouseViewSet, basename='publishing_house')
router.register('issue_city', IssueCityViewSet, basename='issue_city')
router.register('key_word', KeyWordViewSet, basename='key_word')

urlpatterns = router.urls