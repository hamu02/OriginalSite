from django.db import models

# Create your models here.

class Star(models.Model):
    name = models.CharField(max_length=100)
    summary = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    star = models.ForeignKey(Star, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}: {self.message[:10]}"

