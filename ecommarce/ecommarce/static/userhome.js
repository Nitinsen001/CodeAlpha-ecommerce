
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Wishlist functionality
            const wishlistBtns = document.querySelectorAll('.wishlist-btn');
            wishlistBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        this.style.color = '#ff6b6b';
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        this.style.color = '#333';
                    }
                });
            });

            // Add to cart functionality
            const cartBtns = document.querySelectorAll('.btn-cart');
            cartBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Added!';
                    this.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                    }, 2000);
                    
                    // Update cart badge
                    const cartBadge = document.querySelector('.cart-badge');
                    let count = parseInt(cartBadge.textContent);
                    cartBadge.textContent = count + 1;
                });
            });

            // Search functionality
            const searchBar = document.querySelector('.search-bar');
            searchBar.addEventListener('focus', function() {
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
            });

            searchBar.addEventListener('blur', function() {
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            });
        });
    