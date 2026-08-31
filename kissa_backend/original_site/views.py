from django.http import JsonResponse
from .models import Star
from django.shortcuts import get_object_or_404

import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import Star, Comment

from django.db.models import Q
# Create your views here.

def star_list(request):
    stars = Star.objects.all().order_by('id')

    query = request.GET.get('q')
    if query:
        stars = stars.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
    category = request.GET.get('category')
    if category:
        stars = stars.filter(category=category)
    data = []
    for star in stars:
        image_url = request.build_absolute_uri(star.image.url) if star.image else None
        data.append({
            'id': star.id,
            'name': star.name,
            'summary': star.summary,
            'description': star.description,
            'image_url': image_url,
            'created_at': star.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        })

    return JsonResponse(data, safe=False)

def star_detail(request, pk):
    star = get_object_or_404(Star, pk=pk)

    image_url = request.build_absolute_uri(star.image.url) if star.image else None
    data = {
        'id': star.id,
        'name': star.name,
        'summary': star.summary,
        'description': star.description,
        'category': star.category,
        'image_url': image_url,
        'created_at': star.created_at.strftime('%Y-%m-%d %H:%M:%S'),
    }
    return JsonResponse(data)

@csrf_exempt
def comment_list_create(request, star_pk):
    star = get_object_or_404(Star, pk=star_pk)

    if request.method == 'GET':
        comments = Comment.objects.filter(star=star)

        data = []
        for comment in comments:
            data.append({
                'id': comment.id,
                'name': comment.name,        
                'message': comment.message,  
                'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)

            comment = Comment.objects.create(
                star=star,
                name=body.get('name', '名無し'),
                message=body.get('message', '')
            )

            return JsonResponse({
                'id': comment.id,
                'name': comment.name,      
                'message': comment.message,
                'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            }, status=201)
            
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")

    return HttpResponseBadRequest("Method not allowed")
