from django.shortcuts import render, redirect, get_object_or_404
import time
from . import emailAPI
from django.http import HttpResponse, JsonResponse
from . import models
from django.contrib.auth.decorators import login_required
from .models import Product, Cart, CartItem

def home(request):
    return render(request, 'home.html')

def contact(request):
    return render(request, 'contact.html')

def electronics(request):
    return render(request, 'electronics.html')
def accesories(request):
    return render(request, 'accesories.html')

def clothing(request):
    return render(request, 'clothing.html')
def cart(request):
    return render(request, 'cart.html')

def home_category(request):
    return render(request, 'home_category.html')

def books(request):
    return render(request, 'books.html')


# def register(request):
#     if request.method=="GET":
#      return render(request,"register.html",{"output":""})
#     else:
#         name=request.POST.get("username")
#         email=request.POST.get("email")
#         password=request.POST.get("password")
#         # confirmPassword=request.POST.get("confirmPassword")
#         phone=request.POST.get("phone")
#         course=request.POST.get("course")
#         address=request.POST.get("address")
#         gender=request.POST.get("gender")
#         p=models.register(firstname=name,email=email,password=password,phone=phone,address=address,gender=gender,status=0,role="user",info=time.asctime())
#         p.save()
#         emailAPI.sendMail(email,password)
#         return render(request,"register.html",{"output":"user register successful"})

def register(request):
    if request.method == "GET":
        return render(request, "register.html", {"output": ""})
    else:
        name = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        phone = request.POST.get("phone")
        dob = request.POST.get("dob")  # Date of Birth
        address = request.POST.get("address")
        gender = request.POST.get("gender")

        # ✅ Email already exists check
        if models.register.objects.filter(email=email).exists():
            return render(request, "register.html", {"output": "Email already registered!"})

        # ✅ Save user if not exists
        p = models.register(
            firstname=name,
            email=email,
            password=password,
            phone=phone,
            dob=dob,
            address=address,
            gender=gender,
            status=0,
            role="user",
            info=time.asctime()
        )
        p.save()

        emailAPI.sendMail(email, password)
        return render(request, "register.html", {"output": "User registered successfully!"})




def login(request):
    if request.method == "GET":
        return render(request, "login.html")
    else:
        email = request.POST.get("username")
        password = request.POST.get("password")
        usd = models.register.objects.filter(email=email, password=password, status=1)

        if usd.exists():
            # Make sure session is saved safely
            request.session.flush()  # 🔁 Clears previous session safely
            request.session.cycle_key()  # 🔄 Generates a new session key

            user = usd[0]
            request.session["sunm"] = user.email
            request.session["role"] = user.role
            request.session["name"] = user.firstname

            if user.role == "admin":
                return redirect("/myadmin/")
            else:
                return redirect("/userhome/")
        else:
            return render(request, "login.html", {"output": "Invalid user or verify your account"})

def profile(request):
    # Only allow access if user is logged in
    if not request.session.get('sunm'):
        return redirect('/login/')

    # Fetch user details from the database
    user_email = request.session.get('sunm')
    user = models.register.objects.filter(email=user_email).first()

    if not user:
        return HttpResponse("User not found.")

    return render(request, 'profile.html', {'user': user})

def editprofile(request):
    # Only allow access if user is logged in
    if not request.session.get('sunm'):
        return redirect('/login/')

    user_email = request.session.get('sunm')
    user = models.register.objects.filter(email=user_email).first()

    if request.method == "POST":
        # Update user details from the form
        name = request.POST.get("username", user.firstname)
        email = request.POST.get("email", user.email)
        password = request.POST.get("password", getattr(user, "password", ""))
        phone = request.POST.get("phone", user.phone)
        dob = request.POST.get("dob", getattr(user, "dob", ""))
        address = request.POST.get("address", user.address)
        gender = request.POST.get("gender", user.gender)

        # Optionally update the user object and save
        user.firstname = name
        user.email = email
        user.password = password
        user.phone = phone
        user.dob = dob
        user.address = address
        user.gender = gender
        user.save()
        return render(request, 'editprofile.html', {'user': user, 'output': 'Profile updated successfully!'})
    else:
        return render(request, 'editprofile.html', {'user': user})

        

def userhome(request):
    # Only allow access if user is logged in
    if not request.session.get('sunm'):
        return redirect('/login/')
    from .models import Product
    products = Product.objects.all()  # Or filter as needed
    return render(request, 'userhome.html', {
        'username': request.session.get('name', 'User'),
        'products': products
    })

def cpuser(request):
   if request.method=="GET":
      return render (request,"cpuser.html",{"sunm":request.session["sunm"],"output":""})
   else:
      #to get data from form
      email= request.session["sunm"]
      opassword =request.POST.get("opassword")
      npassword=request.POST.get("npassword")
      cnpassword=request.POST.get("cnpassword")
# to check old password is valid or not
      usd=models.register.objects.filter(email=email,password=opassword)
      if len(usd)>0:
         if npassword==cnpassword:
            models.register.objects.filter(email=email).update(password=cnpassword)
            return render (request,"cpuser.html",{"sunm":request.session["sunm"],"output":"password changes successfully!!"})
         else:
            return render (request,"cpuser.html",{"sunm":request.session["sunm"],"output":"New and Confirm new password mismatch!"})
      else:
         return render (request,"cpuser.html",{"sunm":request.session["sunm"],"output":"Invalid old password ,pls try again ..."})
       
 
def home_electronics(request):
    if not request.session.get('sunm'):
        return redirect('/login/')
    from .models import Product
    products = Product.objects.filter(category__icontains='electronics')
    user_email = request.session.get('sunm')
    user = models.register.objects.filter(email=user_email).first()
    if not user:
        return HttpResponse("User not found.")
    return render(request, 'home_electronics.html', {'user': user, 'products': products})


def verify(request):
    token = request.GET.get("token")
    email = request.GET.get("email")
    
    if not token or not email:
        return render(request, "error.html", {
            "error": "Invalid verification link"
        })
    
    try:
        user = models.register.objects.get(
            email=email,
            verification_token=token,
            is_verified=False
        )
        
        user.is_verified = True
        user.status = 1  # Activate user
        user.save()
        
        return render(request, "verification_success.html", {
            "message": "Your email has been verified successfully. You can now login."
        })
        
    except models.register.DoesNotExist:
        return render(request, "error.html", {
            "error": "Invalid or expired verification link"
        })
        
        
def automotive(request):
    # Only allow access if user is logged in
    if not request.session.get('sunm'):
        return redirect('/login/')

    # Fetch user details from the database
    user_email = request.session.get('sunm')
    user = models.register.objects.filter(email=user_email).first()

    if not user:
        return HttpResponse("User not found.")

    return render(request, 'automotive.html', {'user': user})        

def home_clothing(request):
    return render(request,"home_clothing.html")

def home_books(request):
    return render(request,"home_books.html")

def home_automotive(request):
    return render(request,"home_automotive.html")

def home_games(request):
    return render(request,"home_games.html")

def home_automotive(request):
    return render(request,"home_automotive.html")


def add_to_cart(request, product_id):
    if request.method == 'POST':
        cart = request.session.get('cart', {})
        try:
            from .models import Product
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            # Render an error page instead of returning JSON
            return render(request, "error.html", {"error": "Product does not exist."}, status=404)

        # Use both possible field names for compatibility
        pname = getattr(product, 'pname', None) or getattr(product, 'name', '')
        pprice = getattr(product, 'prize', None) or getattr(product, 'price', 0)

        if str(product_id) in cart:
            cart[str(product_id)]['quantity'] += 1
        else:
            cart[str(product_id)] = {
                'name': pname,
                'price': float(pprice),
                'quantity': 1,
                'image': product.image.url if hasattr(product, 'image') and product.image else ''
            }

        request.session['cart'] = cart
        # Redirect to cart page after adding
        return redirect('view_cart')
    return redirect('home')
def view_cart(request):
    cart = request.session.get('cart', {})
    total = sum(item['price'] * item['quantity'] for item in cart.values())
    return render(request, 'cart.html', {'cart': cart, 'total': total})


def remove_from_cart(request, product_id):
    cart = request.session.get('cart', {})
    if str(product_id) in cart:
        del cart[str(product_id)]
        request.session['cart'] = cart
    return redirect('view_cart')





def cart_count(request):
    cart = request.session.get('cart', {})
    return JsonResponse({'count': len(cart)})
def checkout(request):
    cart = request.session.get('cart', {})
    total = sum(item['price'] * item['quantity'] for item in cart.values())
    return render(request, 'checkout.html', {'cart': cart, 'total': total})

def fundes(request):
    paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"
    paypalID = "sb-stbtx43008964@business.example.com"
    amt = 100
    sunm = request.session.get("sunm", "")
    return render(request, "fundes.html", {
        "sunm": sunm,
        "paypalURL": paypalURL,
        "paypalID": paypalID,
        "amt": amt
    })

def payment(request):
    import time
    from .models import Payment
    uid = request.GET.get("uid")
    amt = request.GET.get("amt")
    info = time.asctime()
    p = Payment(uid=uid, amt=amt, info=info)
    p.save()
    return redirect("/success/")

def success(request):
    # Use .get() to avoid KeyError if 'sunm' is not in session
    return render(request, "success.html", {"sunm": request.session.get("sunm", "")})

def cancel(request):
    return render(request, "cancel.html", {"sunm": request.session.get("sunm", "")})

def home_sports(request):
    return render(request, "home_sports.html")

def home_sports(request):
    return render(request, "home_sports.html")


from django.shortcuts import render
from .models import Product
from django.db.models import Q  # <-- Yeh import zaroori hai


def search_view(request):
    query = request.GET.get('q')
    results = []

    if query:
        results = Product.objects.filter(pname__icontains=query)

    return render(request, 'search_results.html', {'query': query, 'results': results})

    
    
    
from django.shortcuts import render, get_object_or_404
from .models import Product

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    return render(request, 'product_detail.html', {'product': product})



def verify(request):
    token = request.GET.get("token")
    email = request.GET.get("email")
    
    if not token or not email:
        return render(request, "error.html", {
            "error": "Invalid verification link"
        })
    
    try:
        user = models.register.objects.get(
            email=email,
            verification_token=token,
            is_verified=False
        )
        
        user.is_verified = True
        user.status = 1  # Activate user
        user.save()
        
        return render(request, "verification_success.html", {
            "message": "Your email has been verified successfully. You can now login."
        })
        
    except models.register.DoesNotExist:
        return render(request, "error.html", {
            "error": "Invalid or expired verification link"
        })

    except models.register.DoesNotExist:
        return render(request, "error.html", {
            "error": "Invalid or expired verification link"
        })