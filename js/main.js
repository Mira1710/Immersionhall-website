document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-container');
    const panels = Array.from(document.querySelectorAll('.panel')).reverse();
    const navLinks = document.querySelectorAll('.main-nav .links a');
    const numPanels = panels.length;
    let currentPanelIndex = 0;
    let isAnimating = false;
    const animationDuration = 1200;
    const peekWidth = 40;

    function setPanelPositions() {
        panels.forEach((panel, i) => {
            let transformValue;
            if (i < currentPanelIndex) {
                transformValue = 'translateX(-100vw)';
            } else if (i === currentPanelIndex) {
                transformValue = 'translateX(0)';
            } else {
                const peekOffset = (numPanels - i) * peekWidth;
                transformValue = `translateX(calc(100vw - ${peekOffset}px))`;
            }
            panel.style.transform = transformValue;
        });
    }

    function navigateTo(targetIndex) {

        if (isAnimating || targetIndex === currentPanelIndex || targetIndex < 0 || targetIndex >= numPanels) {
            return;
        }
        isAnimating = true;
        currentPanelIndex = targetIndex;
        setPanelPositions();

        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.dataset.target, 10);
            navigateTo(targetIndex);
        });
    });


    window.addEventListener('wheel', event => {
        const delta = event.deltaY;
        let targetIndex = currentPanelIndex;

        if (delta > 0) {
            targetIndex++;
        } else {
            targetIndex--;
        }
        navigateTo(targetIndex);
    }, { passive: true });

    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        let targetIndex = currentPanelIndex;
        // Проверяем, что свайп был достаточно длинным
        if (Math.abs(touchEndX - touchStartX) < 50) return;

        if (touchEndX < touchStartX) { // Свайп влево
            targetIndex++;
        } else { // Свайп вправо
            targetIndex--;
        }
        navigateTo(targetIndex);
    }

    setPanelPositions();
    container.style.visibility = 'visible';

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        window.addEventListener('wheel', event => {
            const delta = event.deltaY;
            let targetIndex = currentPanelIndex;

            if (delta > 0) {
                targetIndex++;
            } else {
                targetIndex--;
            }
            navigateTo(targetIndex);
        }, { passive: true });

        container.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    const wrapper = document.querySelector('.fifth-content');
    const note = document.querySelector('.music_index');
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

// здесь заканчивается нужное


//     const container = document.querySelector('.main-container');
//     const panels = Array.from(document.querySelectorAll('.panel')).reverse();
//     const navLinks = document.querySelectorAll('.main-nav .links a');
//     const numPanels = panels.length;
//     let currentPanelIndex = 0;
//     let isAnimating = false;
//     const animationDuration = 1200;
//     const peekWidth = 40;
//     const isMobile = window.innerWidth <= 768;
//
// // Desktop navigation and animation
//     if (!isMobile) {
//         function setPanelPositions() {
//             panels.forEach((panel, i) => {
//                 let transformValue;
//                 if (i < currentPanelIndex) {
//                     transformValue = 'translateX(-100vw)';
//                 } else if (i === currentPanelIndex) {
//                     transformValue = 'translateX(0)';
//                 } else {
//                     const peekOffset = (numPanels - i) * peekWidth;
//                     transformValue = `translateX(calc(100vw - ${peekOffset}px))`;
//                 }
//                 panel.style.transform = transformValue;
//             });
//         }
//
//         function navigateTo(targetIndex) {
//             if (isAnimating ||
//                 targetIndex === currentPanelIndex ||
//                 targetIndex < 0 ||
//                 targetIndex >= numPanels) {
//                 return;
//             }
//
//             isAnimating = true;
//             currentPanelIndex = targetIndex;
//             setPanelPositions();
//
//             setTimeout(() => {
//                 isAnimating = false;
//             }, animationDuration);
//         }
//
//         navLinks.forEach(link => {
//             link.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const targetIndex = parseInt(e.target.dataset.target, 10);
//                 navigateTo(targetIndex);
//             });
//         });
//
//         window.addEventListener('wheel', event => {
//             if (isAnimating) return;
//
//             const delta = event.deltaY;
//             let targetIndex = currentPanelIndex;
//
//             if (delta > 0) {
//                 targetIndex++;
//             } else {
//                 targetIndex--;
//             }
//
//             if (targetIndex >= 0 && targetIndex < numPanels) {
//                 navigateTo(targetIndex);
//             }
//         }, { passive: true });
//
//         let touchStartX = 0;
//         let touchEndX = 0;
//
//         container.addEventListener('touchstart', (event) => {
//             touchStartX = event.changedTouches[0].screenX;
//         }, { passive: true });
//
//         container.addEventListener('touchend', (event) => {
//             touchEndX = event.changedTouches[0].screenX;
//             handleSwipe();
//         }, { passive: true });
//
//         function handleSwipe() {
//             if (isAnimating) return;
//
//             let targetIndex = currentPanelIndex;
//             if (Math.abs(touchEndX - touchStartX) < 50) return;
//
//             if (touchEndX < touchStartX) {
//                 targetIndex++;
//             } else {
//                 targetIndex--;
//             }
//
//             if (targetIndex >= 0 && targetIndex < numPanels) {
//                 navigateTo(targetIndex);
//             }
//         }
//
//         setPanelPositions();
//     }
// // Mobile navigation
//     else {
//         // Enable native horizontal scrolling
//         container.style.overflowX = 'auto';
//         container.style.overflowY = 'hidden';
//         container.style.scrollSnapType = 'x mandatory';
//         container.style.display = 'flex';
//         container.style.flexDirection = 'row';
//
//         // Setup each panel for mobile
//         panels.forEach(panel => {
//             panel.style.flex = '0 0 100vw';
//             panel.style.scrollSnapAlign = 'start';
//             panel.style.transform = 'none';
//         });
//
//         // Link navigation for mobile
//         navLinks.forEach(link => {
//             link.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const targetIndex = parseInt(link.dataset.target, 10);
//                 const targetPanel = document.querySelector(`.panel[data-panel-number="${targetIndex}"]`);
//
//                 if (targetPanel) {
//                     targetPanel.scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'nearest',
//                         inline: 'start'
//                     });
//                 }
//             });
//         });
//
//         // Disable vertical scroll on mobile
//         document.body.style.overflowY = 'hidden';
//         document.body.style.touchAction = 'pan-x';
//     }
//
// // Note animation for both desktop and mobile
//     const wrapper = document.querySelector('.fifth-content');
//     if (wrapper) {
//         const note = document.querySelector('.music_index');
//         let targetX = 0;
//         let currentX = 0;
//         const speed = 0.1;
//
//         if (!isMobile) {
//             // Desktop mouse movement
//             window.addEventListener('mousemove', (e) => {
//                 if (!note) return;
//
//                 const wrapperRect = wrapper.getBoundingClientRect();
//                 const noteWidth = note.offsetWidth;
//                 const percent = e.clientX / window.innerWidth;
//                 let x = percent * wrapperRect.width;
//                 const halfNote = noteWidth / 2;
//                 x = Math.max(halfNote, Math.min(x, wrapperRect.width - halfNote));
//                 targetX = x;
//             });
//         } else {
//             // Mobile touch movement
//             window.addEventListener('touchmove', (e) => {
//                 if (!note) return;
//
//                 const touch = e.touches[0];
//                 const wrapperRect = wrapper.getBoundingClientRect();
//                 const noteWidth = note.offsetWidth;
//                 const percent = touch.clientX / window.innerWidth;
//                 let x = percent * wrapperRect.width;
//                 const halfNote = noteWidth / 2;
//                 x = Math.max(halfNote, Math.min(x, wrapperRect.width - halfNote));
//                 targetX = x;
//             }, { passive: true });
//         }
//
//         function animateNote() {
//             currentX += (targetX - currentX) * speed;
//             if (note) note.style.left = `${currentX}px`;
//             requestAnimationFrame(animateNote);
//         }
//
//         animateNote();
//     }
//
// // Make container visible after initialization
//     container.style.visibility = 'visible';





});