addEventListener("DOMContentLoaded", function() {
    const hlImage = document.querySelector('.container404');
    const turbulence = document.querySelector('#water-effect feTurbulence');

    if (!hlImage || !turbulence) {
        console.error('Элементы не найдены!');
        return;
    }

    hlImage.addEventListener('mousemove', (e) => {
        const rect = hlImage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        turbulence.setAttribute('baseFrequency', `${x * 0.05} ${y * 0.05}`);
    });

    hlImage.addEventListener('mouseleave', () => {
        turbulence.setAttribute('baseFrequency', '0.01 0.01');
    });



} )