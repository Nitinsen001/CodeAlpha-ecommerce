
        // Category Filtering Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('nav a');
            const products = document.querySelectorAll('.product');
            
            // Add data-category attributes to products based on their position
            function categorizeProducts() {
                const categories = [
                    'fiction', 'fiction', 'fiction', 'fiction', // First 4 fiction books
                    'non-fiction', 'non-fiction', 'non-fiction', 'non-fiction', // Next 4 non-fiction
                    'science', 'science', 'science', 'science', // Next 4 science
                    'technology', 'technology', 'technology', 'technology', // Next 4 technology
                    'biography', 'biography', 'biography', 'biography' // Last 4 biography
                ];
                
                products.forEach((product, index) => {
                    // Skip first 5 products (they are featured and don't belong to main categories)
                    if(index >= 5) {
                        const categoryIndex = index - 5;
                        if(categoryIndex < categories.length) {
                            product.dataset.category = categories[categoryIndex];
                        }
                    }
                });
            }
            
            // Initialize product categories
            categorizeProducts();
            
            // Navigation filtering
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                  
                    
                    // Remove active class from all nav links
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    
                    // Filter products
                    products.forEach(product => {
                        if(filter === 'all') {
                            product.style.display = 'block';
                        } else {
                            if(product.dataset.category === filter) {
                                product.style.display = 'block';
                            } else {
                                product.style.display = 'none';
                            }
                        }
                    });
                });
            });
            
            // Add to cart functionality remains the same
            const addToCartBtns = document.querySelectorAll('.product button');
            let cartCount = 0;

            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const product = e.target.closest('.product');
                    const productName = product.querySelector('h3').textContent;
                    
                    cartCount++;
                    document.querySelector('.cart-preview a').textContent = `Cart (${cartCount})`;
                    
                    btn.textContent = 'Added!';
                    btn.style.background = '#27ae60';
                    
                    setTimeout(() => {
                        btn.textContent = 'Add to Cart';
                        btn.style.background = '#ff6b35';
                    }, 1500);
                    
                    setTimeout(() => {
                        alert(`${productName} added to cart!`);
                    }, 100);
                });
            });
        });
        
        function handleAddToCart() {
            "var isLoggedIn = {{ request.session.sunm|yesno:'true,false'|default:'false' }};"
            if (!isLoggedIn) {
                if (confirm('You must be logged in to add items to cart. Login or Register now?')) {
                    window.location.href = '/login/';
                }
                return;
            }
            // ...existing add to cart logic...
        }
    