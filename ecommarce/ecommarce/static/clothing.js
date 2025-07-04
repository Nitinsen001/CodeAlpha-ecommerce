

            // Updated JavaScript
            const filterBtns = document.querySelectorAll('.filter-btn');
            const products = document.querySelectorAll('.product');
            const navLinks = document.querySelectorAll('nav a');

            // Function to filter products
            function filterProducts(category) {
                products.forEach(product => {
                    const productCategory = product.dataset.category;
                    
                    if (category === 'all' || 
                        (category === 'men' && productCategory === 'men') ||
                        (category === 'women' && productCategory === 'women') ||
                        (category === 'kids' && productCategory === 'kids') ||
                        (category === 'shoes' && (productCategory === 'shoes' || productCategory === 'unisex')) ||
                        (category === 'accessories' && productCategory === 'other')) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }

            // Initialize product categories
            function categorizeProducts() {
                products.forEach(product => {
                    const categoryText = product.querySelector('.category').textContent.toLowerCase();
                    if (categoryText.includes("men's")) {
                        product.dataset.category = "men";
                    } else if (categoryText.includes("women's")) {
                        product.dataset.category = "women";
                    } else if (categoryText.includes("kids")) {
                        product.dataset.category = "kids";
                    } else if (categoryText.includes("shoes") || categoryText.includes("boots")) {
                        product.dataset.category = "shoes";
                    } else if (categoryText.includes("unisex")) {
                        product.dataset.category = "unisex";
                    } else {
                        product.dataset.category = "other";
                    }
                });
            }

            // Only prevent default for filtering links, allow Home to work normally
            navLinks.forEach(link => {
                // Skip Home link
                if (link.textContent.trim() !== 'Home') {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        // Update active class
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        
                        // Filter products
                        const filterText = link.textContent.trim();
                        if (filterText === 'All Clothing') filterProducts('all');
                        else if (filterText === "Men's") filterProducts('men');
                        else if (filterText === "Women's") filterProducts('women');
                        else if (filterText === "Kids") filterProducts('kids');
                        else if (filterText === "Shoes") filterProducts('shoes');
                        else if (filterText === "Accessories") filterProducts('accessories');
                    });
                }
            });

            // Initialize
            categorizeProducts();

            // Rest of the JavaScript (filter buttons and cart functionality) remains the same
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const filter = btn.textContent;
                    
                    products.forEach(product => {
                        const category = product.querySelector('.category').textContent;
                        
                        if (filter === 'All Items' || 
                            (filter === 'T-Shirts' && (category.includes('T-Shirt') || category.includes('Tee'))) ||
                            (filter === 'Jeans' && category.includes('Jeans')) ||
                            (filter === 'Dresses' && category.includes('Dress')) ||
                            (filter === 'Jackets' && (category.includes('Jacket') || category.includes('Blazer'))) ||
                            (filter === 'Shoes' && (category.includes('Shoes') || category.includes('Boots')))) {
                            if (product.style.display !== 'none') {
                                product.style.display = 'block';
                            }
                        } else {
                            product.style.display = 'none';
                        }
                    });
                });
            });

            // Add to cart functionality with login check
            const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
            let cartCount = 0;

            // Use Django template variable to check login
            var isLoggedIn = "{{ request.session.sunm|yesno:'true','false'|default:'false' }}" === "true";

            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    if (!isLoggedIn) {
                        if (confirm('You must be logged in to add items to cart. Login or Register now?')) {
                            window.location.href = '/login/';
                        }
                        return;
                    }
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
        