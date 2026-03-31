// Cart array to store items
let cart = [];

// Add to cart function
function addToCart(productName, price) {
    const item = {
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1
    };

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    updateCartCount();
    showNotification(`${productName} adicionado ao carrinho!`);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>🛒 Seu carrinho está vazio</p>
                <p>Adicione produtos para começar!</p>
            </div>
        `;
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    displayCart();
    updateCartCount();
}

// Open cart modal
function openCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('hidden');
    modal.classList.add('show');
    displayCart();
}

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('hidden');
    modal.classList.remove('show');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Generate order summary
    let orderSummary = 'RESUMO DO PEDIDO\\n\\n';
    orderSummary += '='.repeat(40) + '\n';
    orderSummary += '🎨 MUNDO LORAJO LOJA\n';
    orderSummary += '='.repeat(40) + '\n\\n';
    
    cart.forEach(item => {
        orderSummary += `${item.name}\\n`;
        orderSummary += `  Quantidade: ${item.quantity}\\n`;
        orderSummary += `  Preço unitário: R$ ${item.price.toFixed(2)}\\n`;
        orderSummary += `  Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\\n\\n`;
    });
    
    orderSummary += '='.repeat(40) + '\n';
    orderSummary += `TOTAL: R$ ${total.toFixed(2)}\n`;
    orderSummary += '='.repeat(40) + '\n\\n';
    orderSummary += 'Obrigado pela compra!\\n';
    orderSummary += 'Entre em contato para detalhes de pagamento.\\n';
    orderSummary += 'Email: artuzinholuiz01@gmail.com';

    alert(orderSummary);
    
    // Reset cart
    cart = [];
    updateCartCount();
    displayCart();
    closeCart();
    
    showNotification('Pedido realizado com sucesso! 🎉');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10B981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', openCart);

    // Close modal when clicking outside
    const modal = document.getElementById('cart-modal');
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeCart();
        }
    });
});