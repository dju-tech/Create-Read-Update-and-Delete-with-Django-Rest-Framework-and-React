from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleView, UserView


router = DefaultRouter()
router.register('articles', ArticleView, basename='articles')
router.register('users', UserView, basename='users')

urlpatterns = [
    path('api/', include(router.urls)),
]