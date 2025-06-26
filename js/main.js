document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-container');
    const panels = Array.from(document.querySelectorAll('.panel')).reverse();
    // ДОБАВЛЕНО: Выбираем все навигационные ссылки
    const navLinks = document.querySelectorAll('.main-nav .links a');
    const numPanels = panels.length;
    let currentPanelIndex = 0;
    let isScrolling = false;

    const peekWidth = 40;

    function setPanelPositions() {
        panels.forEach((panel, i) => {
            let transformValue = '';
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

    // --- НОВЫЙ БЛОК: Обработка кликов по навигации ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Если идет анимация, ничего не делаем
            if (isScrolling) return;

            // Получаем целевой индекс из атрибута data-target
            const targetIndex = parseInt(e.target.dataset.target, 10);

            // Если это не текущая панель и индекс валиден
            if (targetIndex !== currentPanelIndex && targetIndex < numPanels) {
                currentPanelIndex = targetIndex;
                setPanelPositions(); // Запускаем анимацию

                // Блокируем скролл на время анимации
                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 1200);
            }
        });
    });

    // --- Существующий блок: Обработка скролла колесиком мыши ---
    window.addEventListener('wheel', event => {
        if (isScrolling) return;

        const delta = event.deltaY;

        if (delta > 0 && currentPanelIndex < numPanels - 1) {
            currentPanelIndex++;
        } else if (delta < 0 && currentPanelIndex > 0) {
            currentPanelIndex--;
        } else {
            return;
        }

        setPanelPositions();

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1200);

    }, { passive: true });

    // --- Инициализация ---
    setPanelPositions();
    container.style.visibility = 'visible';


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







});