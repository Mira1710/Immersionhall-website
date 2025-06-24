addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();


            const card = this.closest('.product-card');
            const productId = card.dataset.id;

            this.classList.toggle('active');

            const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
            favorites[productId] = this.classList.contains('active');
            localStorage.setItem('favorites', JSON.stringify(favorites));

            console.log(`Товар ${productId} ${favorites[productId] ? 'добавлен в' : 'удален из'} избранное`);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.id;
            const favoriteBtn = card.querySelector('.favorite-btn');

            if (favorites[productId]) {
                favoriteBtn.classList.add('active');
            }
        });
    });

    const wrapper = document.querySelector('.footer_about');
    const note = document.querySelector('.music_about');

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












})