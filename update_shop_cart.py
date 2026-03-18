import re

# -------------
# Update shop.html
# -------------
with open('shop.html', 'r', encoding='utf-8') as f:
    shop_content = f.read()

# Replace massive pro-container with an empty one with id="all-products"
shop_content = re.sub(
    r'<div class="pro-container">.*?</div>\s*</section>',
    r'<div class="pro-container" id="all-products">\n        </div>\n    </section>',
    shop_content,
    flags=re.DOTALL
)

# Add products.js
if '<script src="products.js"></script>' not in shop_content:
    shop_content = shop_content.replace('<script src="script.js"></script>', '<script src="products.js"></script>\n    <script src="script.js"></script>')

with open('shop.html', 'w', encoding='utf-8') as f:
    f.write(shop_content)

# -------------
# Update cart.html
# -------------
with open('cart.html', 'r', encoding='utf-8') as f:
    cart_content = f.read()

# Make the table body empty and add an ID so JS can populate it
cart_content = re.sub(
    r'<table.*?>.*?</table>',
    r'''<table width="100%">
        <thead>
            <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
            </tr>
        </thead>
        <tbody id="cart-table-body">
            <!-- Dynamic Cart Items -->
        </tbody>
    </table>''',
    cart_content,
    flags=re.DOTALL,
    count=1 # Only replace the first table (the items table)
)

# Update the cart totals table
cart_content = re.sub(
    r'<div class="total-price">.*?</div>',
    r'''<div class="total-price" id="cart-totals">
        <!-- Dynamic Totals -->
      </div>''',
    cart_content,
    flags=re.DOTALL
)

# Add products.js and cart.js
if '<script src="products.js"></script>' not in cart_content:
    cart_content = cart_content.replace('<script src="script.js"></script>', '<script src="products.js"></script>\n    <script src="script.js"></script>')

with open('cart.html', 'w', encoding='utf-8') as f:
    f.write(cart_content)

print("Updated shop.html and cart.html")
