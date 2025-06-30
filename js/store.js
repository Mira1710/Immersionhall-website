document.addEventListener("DOMContentLoaded", () => {
    
    let cart = [];
    const saveData = (key, data) => {
    };

    const updateCounters = () => {
        const cartCountEl = document.querySelector('.cart-count');


       
        const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (cartCountEl) cartCountEl.textContent = totalCartItems;
        
    };

   

    const productContainer = document.querySelector('.store-content');

   
    const updateProductButtonsState = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.id;
            const addToCartBtn = card.querySelector('.add-to-cart');
            

          
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

           
            if (event.target.closest('.add-to-cart')) {
                let itemInCart = cart.find(item => item.id === productId);
                if (itemInCart) {
                    itemInCart.quantity++; 
                } else {
                  
                    const product = {
                        id: productId,
                        name: card.querySelector('.product-info p:first-child').textContent,
                        price: card.querySelector('.product-info p:last-child').textContent,
                        image: card.querySelector('img').src,
                        quantity: 1, 
                    };
                    cart.push(product);
                }
                saveData('cart', cart); 
                updateCounters();
                updateProductButtonsState(); 
            }
            
        });
    }

    

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

            saveData('cart', cart); 
            renderCart();
            updateCounters();
        });

        document.getElementById('clear-cart').addEventListener('click', () => {
            if (confirm('Очистить всю корзину?')) {
                cart = [];
                saveData('cart', cart); 
                renderCart();
                updateCounters();
            }
        });

       
        renderCart();
    }

    

   
    const wrapper = document.querySelector('.footer_about');
    const note = document.querySelector('.music_about');

    
    if (wrapper && note) {
        let targetX = 0;
        let currentX = 0;
        const speed = 0.1;

        window.addEventListener('mousemove', (e) => {
            const wrapperRect = wrapper.getBoundingClientRect();
            const noteRect = note.getBoundingClientRect(); 
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


    
    updateCounters();
    if (productContainer) {
        updateProductButtonsState();
    }
});


