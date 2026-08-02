from django.urls import path
from . import views

urlpatterns = [
    path('stars/', views.star_list, name='star_list'),
    path('stars/<int:pk>/', views.star_detail, name='star_detail'),
    path('stars/<int:star_pk>/comments/', views.comment_list_create, name='comment_list_create'),
]