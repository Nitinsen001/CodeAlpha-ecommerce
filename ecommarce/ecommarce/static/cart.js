userhome.js

document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    updateCartTotals();
});

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById('cartItemsContainer');
    const cartWithItems = document.getElementById('cart-with-items');
    const emptyCart = document.getElementById('empty-cart');
    let totalItems = 0;

    if (cart.length === 0) {
        cartWithItems.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    } else {
        cartWithItems.style.display = '';
        emptyCart.style.display = 'none';
    }

    container.innerHTML = '';
    cart.forEach((item, idx) => {
        totalItems += item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.price = item.price;
        div.dataset.id = item.id;
        div.innerHTML = `
            <img src="${item.image && item.image.startsWith('http') ? item.image : ''}" alt="${item.name}" style="width:120px;height:150px;object-fit:cover;border-radius:8px;">
            <div class="item-details">
                <div class="item-category">${item.category || ''}</div>
                <h3>${item.name}</h3>
                <div class="item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(this, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button onclick="updateQuantity(this, 1)">+</button>
                </div>
                <div class="item-actions">
                    <span class="remove-item" onclick="removeItem(this)">Remove</span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    document.getElementById('cartItemCount').textContent = totalItems;
}

function updateQuantity(btn, change) {
    const cartItemDiv = btn.closest('.cart-item');
    const id = parseInt(cartItemDiv.dataset.id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === id);
    if (!item) return;
    let newQty = item.quantity + change;
    if (newQty < 1) return;
    item.quantity = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartTotals();
}

function removeItem(btn) {
    const cartItemDiv = btn.closest('.cart-item');
    const id = parseInt(cartItemDiv.dataset.id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartTotals();
}

function updateCartTotals() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    let totalItems = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        totalItems += item.quantity;
    });
    let tax = subtotal * 0.08;
    let discount = 0;
    let shipping = 0;
    let total = subtotal + tax + shipping - discount;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString(undefined, {minimumFractionDigits:2})}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString(undefined, {minimumFractionDigits:2})}`;
    document.getElementById('discount').textContent = `-₹${discount.toLocaleString(undefined, {minimumFractionDigits:2})}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString(undefined, {minimumFractionDigits:2})}`;
    document.getElementById('cartItemCount').textContent = totalItems;
}

function applyPromo() {
    alert('Promo code feature coming soon!');
}

function proceedToCheckout() {
    alert('Proceeding to checkout...');
}
