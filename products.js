const products = [
    { id: 1, brand: 'Adidas', name: 'Astronaut T-Shirts', price: 78, image: 'img/products/f1.jpg', featured: true },
    { id: 2, brand: 'Adidas', name: 'Hawaiian Floral Shirts', price: 65, image: 'img/products/f2.jpg', featured: true },
    { id: 3, brand: 'Adidas', name: 'Vintage Washed Shirts', price: 82, image: 'img/products/f3.jpg', featured: true },
    { id: 4, brand: 'Adidas', name: 'Pink Floral Dresses', price: 95, image: 'img/products/f4.jpg', featured: true },
    { id: 5, brand: 'Adidas', name: 'Purple Night Shirts', price: 78, image: 'img/products/f5.jpg', featured: true },
    { id: 6, brand: 'Adidas', name: 'Double Layered Shirts', price: 88, image: 'img/products/f6.jpg', featured: true },
    { id: 7, brand: 'Adidas', name: 'Comfortable Cargo Pants', price: 110, image: 'img/products/f7.jpg', featured: true },
    { id: 8, brand: 'Adidas', name: 'Women\'s Top Shirts', price: 55, image: 'img/products/f8.jpg', featured: true },

    { id: 9, brand: 'Zara', name: 'Blue Denim Shirts', price: 120, image: 'img/products/n1.jpg', new_arrival: true },
    { id: 10, brand: 'Zara', name: 'Checked Casual Shirts', price: 75, image: 'img/products/n2.jpg', new_arrival: true },
    { id: 11, brand: 'Zara', name: 'White Formal Shirts', price: 90, image: 'img/products/n3.jpg', new_arrival: true },
    { id: 12, brand: 'Zara', name: 'Printed T-Shirts', price: 45, image: 'img/products/n4.jpg', new_arrival: true },
    { id: 13, brand: 'Zara', name: 'Blue Denim Jackets', price: 150, image: 'img/products/n5.jpg', new_arrival: true },
    { id: 14, brand: 'Zara', name: 'Grey Cargo Shorts', price: 60, image: 'img/products/n6.jpg', new_arrival: true },
    { id: 15, brand: 'Zara', name: 'Khaki Shirts Collection', price: 80, image: 'img/products/n7.jpg', new_arrival: true },
    { id: 16, brand: 'Zara', name: 'Black Formal Trousers', price: 95, image: 'img/products/n8.jpg', new_arrival: true },
];

// Setup global cart
let cart = JSON.parse(localStorage.getItem('swoshop_cart')) || [];

function updateCartCount() {
    const mobileBag = document.querySelector('#mobile a[href="cart.html"]');
    const lgBag = document.querySelector('#lg-bag a');
    
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Add badge elements if they don't exist
    [mobileBag, lgBag].forEach(bag => {
        if (!bag) return;
        let badge = bag.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            bag.appendChild(badge);
        }
        badge.textContent = count > 0 ? count : '';
        badge.style.display = count > 0 ? 'inline-block' : 'none';
        
        // Basic style for absolute positioning if not in CSS
        badge.style.position = 'absolute';
        badge.style.top = '-5px';
        badge.style.right = '-8px';
        badge.style.backgroundColor = '#088178';
        badge.style.color = '#fff';
        badge.style.borderRadius = '50%';
        badge.style.padding = '2px 6px';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = '700';
    });
}

function addToCart(event, productId) {
    event.preventDefault();
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Default values
    let qtyToAdd = 1;
    let selectedSize = '';

    // Check if added from the single product detail page
    const detailSection = event.currentTarget.closest('.single-pro-details');
    if (detailSection) {
        const qtyInput = detailSection.querySelector('input[type="number"]');
        if (qtyInput) {
            qtyToAdd = parseInt(qtyInput.value, 10) || 1;
        }
        
        const sizeSelect = detailSection.querySelector('select');
        if (sizeSelect && sizeSelect.value === '' && sizeSelect.options.length > 1) {
            alert('Please select a size first.');
            sizeSelect.focus();
            return;
        }
        if (sizeSelect && sizeSelect.value !== '') {
            selectedSize = sizeSelect.value;
        }
    }

    // Create a unique cart ID so different sizes of the same product don't merge
    const cartItemId = selectedSize ? `${productId}-${selectedSize}` : `${productId}`;
    
    const existingItem = cart.find(item => item.cartItemId === cartItemId || (item.id === productId && !item.cartItemId && !selectedSize));
    
    if (existingItem) {
        existingItem.quantity += qtyToAdd;
    } else {
        cart.push({ ...product, quantity: qtyToAdd, size: selectedSize, cartItemId: cartItemId });
    }
    
    localStorage.setItem('swoshop_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Visual Notification
    const btn = event.currentTarget;
    const ogHtml = btn.innerHTML;
    
    // Check if it's the large button or small icon
    if (btn.classList.contains('normal')) {
        btn.innerHTML = '<i class="ph ph-check-circle" style="font-size:20px;"></i> Added to Cart';
        btn.style.background = 'var(--accent-dark)';
    } else {
        btn.innerHTML = '<i class="ph ph-check-circle"></i>';
        btn.style.color = 'var(--accent)';
    }
    
    setTimeout(() => {
        btn.innerHTML = ogHtml;
        if (btn.classList.contains('normal')) btn.style.background = '';
        else btn.style.color = '';
    }, 1500);
}

function createProductHTML(product) {
    return `
        <div class="pro" onclick="window.location.href='sproduct.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>रू ${product.price}</h4>
            </div>
            <a href="#" class="cart" onclick="addToCart(event, ${product.id})" title="Add to Cart">
                <i class="ph ph-shopping-cart-simple"></i>
            </a>
        </div>
    `;
}

function renderCart() {
    const tbody = document.getElementById('cart-table-body');
    const totalsDiv = document.getElementById('cart-totals');
    if (!tbody || !totalsDiv) return;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:60px 20px;color:var(--text-3);">
                    <i class="ph ph-shopping-bag" style="font-size:48px;display:block;margin:0 auto 12px;color:var(--border);"></i>
                    Your cart is empty. <a href="shop.html" style="color:var(--primary);font-weight:600;">Browse products →</a>
                </td>
            </tr>`;
        totalsDiv.innerHTML = '';
        return;
    }

    tbody.innerHTML = cart.map(item => `
        <tr>
            <td>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
                    <i class="ph ph-x-circle"></i>
                </button>
            </td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td style="font-weight:600;color:var(--text-1);">${item.name}</td>
            <td style="color:var(--primary);font-weight:600;">रू ${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" max="99"
                    onchange="updateQty(${item.id}, this.value)"
                    style="width:60px;height:38px;border:1.5px solid var(--border);border-radius:8px;text-align:center;font-family:inherit;font-size:14px;font-weight:600;outline:none;">
            </td>
            <td style="font-weight:700;color:var(--text-1);">रू ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    const subtotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const total = subtotal + shipping;

    totalsDiv.innerHTML = `
        <table>
            <thead><tr><td colspan="2">Order Summary</td></tr></thead>
            <tbody>
                <tr><td>Subtotal</td><td>रू ${subtotal.toFixed(2)}</td></tr>
                <tr><td>Shipping</td><td>${shipping === 0 ? 'Free' : 'रू ' + shipping.toFixed(2)}</td></tr>
                <tr><td>Total</td><td>रू ${total.toFixed(2)}</td></tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">
                        <button onclick="alert('Checkout coming soon!')">
                            <i class="ph ph-lock-key"></i> Proceed to Checkout
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('swoshop_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateQty(productId, newQty) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQty) || 1);
        localStorage.setItem('swoshop_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

// Render Products when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-products');
    const newArrivalsContainer = document.getElementById('new-arrivals');
    const allProductsContainer = document.getElementById('all-products'); // For shop.html
    
    if (featuredContainer) {
        featuredContainer.innerHTML = products.filter(p => p.featured).map(createProductHTML).join('');
    }
    
    if (newArrivalsContainer) {
        newArrivalsContainer.innerHTML = products.filter(p => p.new_arrival).map(createProductHTML).join('');
    }
    
    if (allProductsContainer) {
        allProductsContainer.innerHTML = products.map(createProductHTML).join('');
    }
    
    // Ensure lgBag is positioned relatively to hold badge
    const lgBag = document.getElementById('lg-bag');
    if (lgBag) lgBag.style.position = 'relative';
    const mobileBagContainer = document.querySelector('#mobile');
    if (mobileBagContainer && mobileBagContainer.querySelector('a')) {
        mobileBagContainer.querySelector('a').style.position = 'relative';
    }

    updateCartCount();
    renderCart();
});
