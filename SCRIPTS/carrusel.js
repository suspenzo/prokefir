document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".cardcarousel"));
    const carousel = document.querySelector(".carousel");
    const container = document.querySelector(".carousel-container");

    if (!cards.length || !carousel || !container) return;

    let index = 0; // índice actual (0-based)

    function updateClasses() {
        const total = cards.length;
        // índices circulares
        const prev = (index - 1 + total) % total;
        const next = (index + 1) % total;

        // Limpiar clases
        cards.forEach(c => {
            c.classList.remove("active", "side");
            // dejar visibles por clase; no usamos display:none para mantener layout
        });

        // Aplicar clases a prev/active/next
        cards[index].classList.add("active");
        cards[prev].classList.add("side");
        cards[next].classList.add("side");
    }

    function centerActive() {
        // centramos la card active dentro del contenedor visible
        const activeCard = cards[index];
        if (!activeCard) return;

        const cardRect = activeCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // offset relativo dentro del .carousel: posición de la card respecto al izquierdo del carousel
        // usamos offsetLeft del elemento relativo al offsetParent (la .carousel), que funciona porque
        // todas las cards están en el flujo (no display:none).
        const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
        const containerCenter = container.clientWidth / 2;

        const translateX = containerCenter - cardCenter;

        carousel.style.transform = `translateX(${translateX}px)`;
    }

    function updateAll() {
        updateClasses();
        // forzamos reflow antes de centrar para transiciones más suaves
        requestAnimationFrame(centerActive);
    }

    // Click handler: solo responde si clicueas prev o next (las otras cards podrían estar ocultas visualmente)
    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            const total = cards.length;
            const prev = (index - 1 + total) % total;
            const next = (index + 1) % total;

            if (i === prev) {
                index = prev;
            } else if (i === next) {
                index = next;
            } else {
                // Si hacen click en otra card (por ejemplo por accesibilidad), podemos llevarla al centro:
                // index = i;
                return; // ignoramos clicks fuera de prev/next para mantener la UX solicitada
            }
            updateAll();
        });
    });

    // Re-centrar en resize para mantener correcto el centrado
    window.addEventListener("resize", () => {
        // opcional: debounce si quieres optimizar
        centerActive();
    });

    // Inicializar
    updateAll();
});
