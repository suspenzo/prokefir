
let desplazamiento = 0;
const anchoTarjeta = 265; // incluyendo separación
const visible = 4;

function actualizarCarrusel() {
    document.getElementById("testimonios-slide").style.transform =
        `translateX(-${desplazamiento}px)`;
}

function siguienteTestimonios() {
    const total = document.querySelectorAll(".testimonio-card").length;
    const maxDesplazamiento = (total - visible) * anchoTarjeta;

    if (desplazamiento < maxDesplazamiento) {
        desplazamiento += anchoTarjeta;
    }

    actualizarCarrusel();
}

function anteriorTestimonios() {
    if (desplazamiento > 0) {
        desplazamiento -= anchoTarjeta;
    }

    actualizarCarrusel();
}

