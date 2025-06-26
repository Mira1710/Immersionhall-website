addEventListener("DOMContentLoaded", () => {
document.querySelectorAll('.event_stroke').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const imagePath = this.getAttribute('data-image');
        const eventImage = document.querySelector('.event_img');


        eventImage.style.opacity = 0;
        setTimeout(() => {
            eventImage.src = imagePath;
            eventImage.style.opacity = 1;
        }, 300);
    });
})

  const carouselTrack = document.getElementById('carouselTrack');
        const images = [
            'poster1Small.jpg',
            'poster2.png',
            'poster3.jpg',
            'poster4.jpg',
            'poster5.jpg',
            'poster6.jpg',
            'poster8.jpg',
            'poster9.jpg',
            'poster10.jpg'
        ];

        function createCarouselItems() {
            images.forEach(img => {
                const item = document.createElement('div');
                item.className = 'slider-item';
                item.style.backgroundImage = `url(img/${img})`;
                carouselTrack.appendChild(item);
            });

            images.forEach(img => {
                const item = document.createElement('div');
                item.className = 'slider-item';
                item.style.backgroundImage = `url(img/${img})`;
                carouselTrack.appendChild(item.cloneNode(true));
            });
        }


        createCarouselItems();


        carouselTrack.addEventListener('animationiteration', () => {

            const items = carouselTrack.querySelectorAll('.slider-item');
            const firstHalf = items.length / 2;

            for (let i = 0; i < firstHalf; i++) {
                if (items[i]) items[i].remove();
            }


            const newItems = [];
            for (let i = 0; i < firstHalf; i++) {
                const clone = items[i % firstHalf].cloneNode(true);
                newItems.push(clone);
            }

            newItems.forEach(item => carouselTrack.appendChild(item));
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