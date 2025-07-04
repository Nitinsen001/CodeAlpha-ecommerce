
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('electronics/', views.electronics, name='electronics'),
    path('clothing/', views.clothing, name='clothing'),
    path('cart/', views.cart, name='cart'),
    path('cpuser/', views.cpuser, name='cpuser'),
    path('books/', views.books, name='books'),
    path('accesories/', views.accesories, name='accesories'),
    path('profile/', views.profile, name='profile'),
    path('editprofile/', views.editprofile, name='editprofile'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('userhome/', views.userhome, name='userhome'),
    
    path('home_electronics/', views.home_electronics, name='home_electronics'),
    path('verify/', views.verify, name='verify'),
    path('automotive/', views.automotive, name='automotive'),
    path('home_clothing/', views.home_clothing, name='home_clothing'),
    path('home_books/', views.home_books, name='home_books'),
    path('home_automotive/', views.home_automotive, name='home_automotive'),
    path('home_games/', views.home_games, name='home_games'),
    path('home_sports/', views.home_sports, name='home_sports'),
    path('add_to_cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('view_cart/', views.view_cart, name='view_cart'),
    path('remove_from_cart/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('cart_count/', views.cart_count, name='cart_count'),
  path('search/', views.search_view, name='search'),
   path('product/<int:id>/', views.product_detail, name='product_detail'),
    path('checkout/', views.checkout, name='checkout'),
    path('fundes/', views.fundes, name='fundes' ),
    path('payment/', views.payment,name='payment'),
    path('success/', views.success,name='suscess'),
    path('cancel/', views.cancel, name='cancel'),
 path('verify', views.verify),  # without slash
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
