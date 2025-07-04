
        // Cart functionality
        let cartCount = 3;
        
        function addToCart(button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="loading"></span> Adding...';
            button.disabled = true;
            
            setTimeout(() => {
                cartCount++;
                document.querySelector('.cart-count').textContent = cartCount;
                button.innerHTML = '✓ Added!';
                button.style.background = '#2ecc71';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        }

        function navigateToCategory(category) {
            // Here you would typically navigate to your clothing page with the category filter
            alert(`Navigating to ${category} category...`);
            // Example: window.location.href = `clothing.html?category=${category}`;
        }

        function subscribeNewsletter(event) {
            event.preventDefault();
            const email = event.target.querySelector('.newsletter-input').value;
            const button = event.target.querySelector('.newsletter-btn');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span class="loading"></span> Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for subscribing with email: ${email}`);
                button.innerHTML = '✓ Subscribed!';
                button.style.background = '#2ecc71';
                event.target.reset();
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 2000);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Search functionality
        document.querySelector('.search-box').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                if (searchTerm.trim()) {
                    alert(`Searching for: ${searchTerm}`);
                    // Here you would implement actual search functionality
                }
            }
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.category-card, .product-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    