addEventListener("DOMContentLoaded", () => {
document.querySelectorAll('.event_stroke').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const imagePath = this.getAttribute('data-image');
        const eventImage = document.querySelector('.event_img');

        // Плавная смена изображения
        eventImage.style.opacity = 0;
        setTimeout(() => {
            eventImage.src = imagePath;
            eventImage.style.opacity = 1;
        }, 300);
    });
})
    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //         const images = document.querySelector('.event_images');
    //         if (entry.isIntersecting) {
    //             images.classList.remove('sticky-disabled');
    //         } else {
    //             images.classList.add('sticky-disabled');
    //         }
    //     });
    // }, {threshold: 1});
    //
    // observer.observe(document.querySelector('.other-content'));



})