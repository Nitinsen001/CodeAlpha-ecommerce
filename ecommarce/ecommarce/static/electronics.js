// // Sample product data
// const products = [
//     { id: 1, name: "iPhone 15 Pro", price: 79999, category: "smartphones", rating: 4.8, image: "📱", description: "Latest iPhone with A17 Pro chip" },
//     { id: 2, name: "MacBook Pro M3", price: 129999, category: "laptops", rating: 4.9, image: "💻", description: "Powerful laptop for professionals" },
//     { id: 3, name: "iPad Air", price: 54999, category: "tablets", rating: 4.7, image: "📱", description: "Versatile tablet for work and play" },
//     { id: 4, name: "Sony WH-1000XM5", price: 24999, category: "headphones", rating: 4.6, image: "🎧", description: "Premium noise-cancelling headphones" },
//     { id: 5, name: "Canon EOS R6", price: 189999, category: "cameras", rating: 4.8, image: "📷", description: "Professional mirrorless camera" },
//     { id: 6, name: "PlayStation 5", price: 49999, category: "gaming", rating: 4.9, image: "🎮", description: "Next-gen gaming console" },
//     { id: 7, name: "Samsung Galaxy S24", price: 69999, category: "smartphones", rating: 4.5, image: "📱", description: "Flagship Android smartphone" },
//     { id: 8, name: "Dell XPS 13", price: 89999, category: "laptops", rating: 4.4, image: "💻", description: "Ultra-portable laptop" },
//     { id: 9, name: "AirPods Pro", price: 19999, category: "headphones", rating: 4.7, image: "🎧", description: "Wireless earbuds with ANC" },
//     { id: 10, name: "Xiaomi Mi 13", price: 54999, category: "smartphones", rating: 4.3, image: "📱", description: "Feature-rich Android phone" },
//     { id: 11, name: "HP Pavilion Gaming", price: 65999, category: "laptops", rating: 4.2, image: "💻", description: "Gaming laptop with RTX graphics" },
//     { id: 12, name: "Nintendo Switch", price: 29999, category: "gaming", rating: 4.6, image: "🎮", description: "Portable gaming console" }
// ];

// let filteredProducts = [...products];

// // Initialize page
// document.addEventListener('DOMContentLoaded', function () {
//     displayProducts(products);
//     updateCartCount();
// });

// // Display products
// function displayProducts(productsToShow) {
//     const grid = document.getElementById('productsGrid');
//     grid.innerHTML = '';

//     productsToShow.forEach((product) => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product';

//         productCard.innerHTML = `
//             <div class="product-image">${product.image}</div>
//             <h3>${product.name}</h3>
//             <div class="product-price">₹${product.price.toLocaleString()}</div>
//             <div class="product-rating">
//                 <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
//                 <span>(${product.rating})</span>
//             </div>
//             <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">${product.description}</p>
//             <button onclick="addToCart(${product.id}, event)">Add to Cart</button>
//         `;

//         grid.appendChild(productCard);
//     });
// }

// // Add to cart
// function addToCart(productId, event) {
//     const product = products.find(p => p.id === productId);
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const existingItem = cart.find(item => item.id === productId);

//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();

//     // Visual feedback
//     const button = event.target;
//     const originalText = button.textContent;
//     button.textContent = 'Added!';
//     button.style.background = '#27ae60';

//     setTimeout(() => {
//         button.textContent = originalText;
//         button.style.background = '';
//     }, 1000);
// }

// // Update cart count
// function updateCartCount() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     const countElem = document.getElementById('cartCount');
//     if (countElem) countElem.textContent = totalItems;
// }

// // Filter products
// function filterProducts() {
//     const category = document.getElementById('categoryFilter').value;
//     const priceRange = document.getElementById('priceFilter').value;
//     const sortBy = document.getElementById('sortFilter').value;

//     let filtered = [...products];

//     if (category !== 'all') {
//         filtered = filtered.filter(product => product.category === category);
//     }

//     if (priceRange !== 'all') {
//         const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
//         filtered = filtered.filter(product => {
//             if (priceRange.includes('+')) {
//                 return product.price >= parseInt(min);
//             } else {
//                 return product.price >= parseInt(min) && product.price <= parseInt(max);
//             }
//         });
//     }

//     switch (sortBy) {
//         case 'price-low':
//             filtered.sort((a, b) => a.price - b.price);
//             break;
//         case 'price-high':
//             filtered.sort((a, b) => b.price - a.price);
//             break;
//         case 'rating':
//             filtered.sort((a, b) => b.rating - a.rating);
//             break;
//         case 'newest':
//             filtered.sort((a, b) => b.id - a.id);
//             break;
//     }

//     filteredProducts = filtered;
//     displayProducts(filtered);
// }

// // Filter by category
// function filterByCategory(category) {
//     document.querySelectorAll('.categories a').forEach(a => a.classList.remove('active'));
//     event.target.classList.add('active');

//     document.getElementById('categoryFilter').value = category;
//     filterProducts();
// }

// // Search products
// function searchProducts() {
//     const searchTerm = document.getElementById('searchInput').value.toLowerCase();
//     const filtered = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm) ||
//         product.description.toLowerCase().includes(searchTerm) ||
//         product.category.toLowerCase().includes(searchTerm)
//     );
//     displayProducts(filtered);
// }

// // Search events
// document.getElementById('searchInput').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         searchProducts();
//     }
// });

// document.getElementById('searchInput').addEventListener('input', function () {
//     if (this.value.length > 2 || this.value.length === 0) {
//         searchProducts();
//     }
// });


function addToCart(productId) {
  fetch(`/add-to-cart/${productId}/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': '{{ csrf_token }}',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert(data.message);
      updateCartCount();  // Call this to update cart count live
    } else {
      alert("Failed to add to cart.");
    }
  });
}

function updateCartCount() {
  fetch('/cart-count/')
    .then(response => response.json())
    .then(data => {
      document.getElementById("cart-count").textContent = data.count;
    });
}

  function addToCart(productId) {
        fetch(`/add_to_cart/${productId}/`)
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                alert("Added to cart!");
            }
        });
    }

function addToCartDjango(productId, btn) {
    fetch(`/add_to_cart/${productId}/`, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            btn.textContent = 'Added!';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.disabled = false;
            }, 1000);
            updateCartCountDjango();
        } else {
            alert('Failed to add to cart');
        }
    });
}

function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

function updateCartCountDjango() {
    fetch('/cart_count/')
        .then(response => response.json())
        .then(data => {
            let countElem = document.getElementById('cartCount');
            if (countElem) countElem.textContent = data.count;
        });
}