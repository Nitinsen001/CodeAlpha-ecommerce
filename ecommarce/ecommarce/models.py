from django.db import models
from django.contrib.auth.models import User

class register(models.Model):
    regid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=30)
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    # confirmpassword = models.CharField(max_length=30)
    dob = models.DateField(null=True, blank=True)  # Date of Birth
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=500)
    course = models.CharField(max_length=30)
    gender = models.CharField(max_length=30)
    status = models.IntegerField()
    role = models.CharField(max_length=30)
    info = models.CharField(max_length=30)
    verification_token = models.CharField(max_length=32, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    

class Wishlist(models.Model):
    wishlist_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(register, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.firstname}'s wishlist item: {self.product_name}"
    
    
class Product(models.Model):
    pname = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    prize = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.pname
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class fundes(models.Model):
    fundes_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    fundes_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=fundes_STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, unique=True)
    method = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"fundes {self.transaction_id} by {self.user.username} - {self.status}"
    

class Payment(models.Model):
    txnid = models.AutoField(primary_key=True)
    uid = models.CharField(max_length=50, default='')  # Add default value
    amt = models.CharField(max_length=50, default='')  # Add default value
    info = models.CharField(max_length=50, default='') # Add default value

    def __str__(self):
        return f"Payment {self.txnid} by {self.uid} - {self.amt}"


