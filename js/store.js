document.addEventListener("DOMContentLoaded", () => {
    // Cart will no longer be stored in localStorage, it resets on page refresh.
    // Initialize cart as an empty array directly.
    let cart = [];

    // Removed the 'favorites' variable and related logic.

    // Function to save data is no longer needed for cart, as it won't persist.
    // However, keeping a dummy saveData function for consistency if other parts of code still call it.
    const saveData = (key, data) => {
        // If you absolutely needed to save something temporarily *before* a full page refresh,
        // you could use sessionStorage, but for a "reset on refresh" cart, this is effectively a no-op.
        // localStorage.setItem(key, JSON.stringify(data)); // REMOVED for resetting cart
    };

    const updateCounters = () => {
        const cartCountEl = document.querySelector('.cart-count');
        // Removed favoritesCountEl and related logic.

        // Calculate total quantity of items in the cart
        const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (cartCountEl) cartCountEl.textContent = totalCartItems;
        // Removed favorites counter update.
    };

    // --- LOGIC FOR PRODUCT PAGES (e.g., index.html) ---

    const productContainer = document.querySelector('.store-content');

    // Updates the state of ALL "Add to Cart" buttons on the page
    const updateProductButtonsState = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.id;
            const addToCartBtn = card.querySelector('.add-to-cart');
            // Removed favoriteBtn and related logic.

            // Update cart button state
            const itemInCart = cart.find(item => item.id === productId);
            if (itemInCart) {
                addToCartBtn.textContent = `Кол-во (${itemInCart.quantity})`;
                addToCartBtn.classList.add('in-cart');
            } else {
                addToCartBtn.textContent = 'В корзину';
                addToCartBtn.classList.remove('in-cart');
            }
        });
    };

    if (productContainer) {
        productContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            if (!card) return;
            const productId = card.dataset.id;

            // Click on "Add to Cart"
            if (event.target.closest('.add-to-cart')) {
                let itemInCart = cart.find(item => item.id === productId);
                if (itemInCart) {
                    itemInCart.quantity++; // Increase quantity
                } else {
                    // Add new product
                    const product = {
                        id: productId,
                        name: card.querySelector('.product-info p:first-child').textContent,
                        price: card.querySelector('.product-info p:last-child').textContent,
                        image: card.querySelector('img').src,
                        quantity: 1, // Initial quantity
                    };
                    cart.push(product);
                }
                saveData('cart', cart); // This call is now effectively a no-op for persistence
                updateCounters();
                updateProductButtonsState(); // Update button states
            }
            // Removed "Favorite" click logic.
        });
    }

    // --- LOGIC FOR CART PAGE (e.g., card.html) ---

    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        const renderCart = () => {
            cartContainer.innerHTML = '';
            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
                document.getElementById('clear-cart').style.display = 'none';
                document.getElementById('cart-total').innerHTML = '';
                return;
            }

            let total = 0;
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                const itemPrice = parseFloat(item.price.replace('₽', '').replace(' ', ''));
                total += itemPrice * item.quantity;

                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <p class="name">${item.name}</p>
                        <p class="price">${item.price}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-button" data-id="${item.id}">Удалить</button>
                    </div>
                `;
                cartContainer.appendChild(itemEl);
            });

            document.getElementById('cart-total').innerHTML = `<strong>Итого: ${total.toFixed(0)}₽</strong>`;
            document.getElementById('clear-cart').style.display = 'block';
        };

        cartContainer.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (!id) return;

            const item = cart.find(item => item.id === id);

            if (e.target.classList.contains('plus')) {
                item.quantity++;
            }
            if (e.target.classList.contains('minus')) {
                item.quantity--;
                if (item.quantity === 0) {
                    cart = cart.filter(item => item.id !== id);
                }
            }
            if (e.target.classList.contains('remove-button')) {
                cart = cart.filter(item => item.id !== id);
            }

            saveData('cart', cart); // This call is now effectively a no-op for persistence
            renderCart();
            updateCounters();
        });

        document.getElementById('clear-cart').addEventListener('click', () => {
            if (confirm('Очистить всю корзину?')) {
                cart = [];
                saveData('cart', cart); // This call is now effectively a no-op for persistence
                renderCart();
                updateCounters();
            }
        });

        // Initial render of the cart on the cart page
        renderCart();
    }

    // --- REMOVED: Favorite button initialization and logic ---
    // The previous code had a redundant DOMContentLoaded listener for favorites here.
    // All favorites-related event listeners and initializations are removed.

    // --- ANIMATION LOGIC (unrelated to cart/favorites, so it remains) ---
    const wrapper = document.querySelector('.footer_about');
    const note = document.querySelector('.music_about');

    // Ensure these elements exist before trying to use them
    if (wrapper && note) {
        let targetX = 0;
        let currentX = 0;
        const speed = 0.1;

        window.addEventListener('mousemove', (e) => {
            const wrapperRect = wrapper.getBoundingClientRect();
            const noteRect = note.getBoundingClientRect(); // not used, but kept from original
            const noteWidth = note.offsetWidth;
            const percent = e.clientX / window.innerWidth;

            let x = percent * wrapperRect.width;

            const halfNote = noteWidth / 2;
            x = Math.max(halfNote, Math.min(x, wrapperRect.width - halfNote));

            targetX = x;
        });

        function animate() {
            currentX += (targetX - currentX) * speed;
            note.style.left = `${currentX}px`;
            requestAnimationFrame(animate);
        }

        animate();
    } else {
        console.warn('Animation elements (.footer_about or .music_about) not found. Animation will not run.');
    }


    // Initialization when any page loads
    updateCounters();
    if (productContainer) {
        updateProductButtonsState();
    }
});