from django.db import models

# Create your models here.

class Star(models.Model):

    CATEGORY_CHOICES = [
            ('zodiac', '12星座'),
            ('extra', '変わり種天体'),
            ('planet', '惑星'),
            ('nebula', '星雲・銀河'),
        ]
    
    name = models.CharField(max_length=100)
    summary = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True)
    image = models.ImageField(upload_to='stars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    star = models.ForeignKey(Star, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    message = models.TextField()
    image = models.ImageField('星の画像', upload_to='stars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}: {self.message[:10]}"

