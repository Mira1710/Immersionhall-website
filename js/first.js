addEventListener("DOMContentLoaded", () => {
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