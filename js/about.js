addEventListener("DOMContentLoaded", () => {

//     about
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');

    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            carousel.classList.add('paused');

            const wrapper = document.querySelector('.carousel-wrapper');
            const wrapperRect = wrapper.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            const offset = (imgRect.left + imgRect.width / 2) - (wrapperRect.left + wrapperRect.width / 2);

            carousel.style.transform = `translateX(calc(${getComputedStyle(carousel).transform.split(',')[4]}px - ${offset}px))`;
        });

        img.addEventListener('mouseleave', () => {
            carousel.classList.remove('paused');
            carousel.style.transform = '';
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

    const card = document.querySelector('.pixelated-image-card');
    const pixelGrid = card.querySelector('.pixelated-image-card__pixels');
    const activeImage = card.querySelector('.pixelated-image-card__active');

    const gridSize = 30;
    const pixelSize = 100 / gridSize;
    const animationStepDuration = 0.3;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixelated-image-card__pixel';
            pixel.style.width = `${pixelSize}%`;
            pixel.style.height = `${pixelSize}%`;
            pixel.style.left = `${col * pixelSize}%`;
            pixel.style.top = `${row * pixelSize}%`;
            pixelGrid.appendChild(pixel);
        }
    }

    const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    let delayedCall;

    function animatePixels(show) {
        gsap.killTweensOf(pixels);
        if (delayedCall) delayedCall.kill();

        gsap.set(pixels, { display: 'none' });

        gsap.to(pixels, {
            display: 'block',
            duration: 0,
            stagger: { each: staggerDuration, from: 'random' }
        });

        delayedCall = gsap.delayedCall(animationStepDuration, () => {
            activeImage.style.display = show ? 'block' : 'none';
        });

        gsap.to(pixels, {
            display: 'none',
            duration: 0,
            delay: animationStepDuration,
            stagger: { each: staggerDuration, from: 'random' }
        });
    }

    card.addEventListener('mouseenter', () => animatePixels(true));
    card.addEventListener('mouseleave', () => animatePixels(false));
















































})